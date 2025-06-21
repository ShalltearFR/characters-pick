import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth.session";
import { prisma } from "@/lib/prisma";
import { sendEventToUser } from "@/lib/sse";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { getUserIP } from "@/lib/ip";

const rateLimiter = new RateLimiterMemory({ points: 3, duration: 5, });

export async function GET(req: NextRequest) {
    const userIP = await getUserIP();
    try {
        await rateLimiter.consume(userIP, 1);
    } catch {
        return NextResponse.json({ message: "Too Many Request" }, { status: 429 });
    }

    let uid = req.nextUrl.searchParams.get("uid");
    if (!uid) {
        const user = await getUser();
        if (!user?.id) return NextResponse.json({ error: "Missing UID" }, { status: 400 });

        uid = user.id;
    }

    const user = await prisma.hSRData.findUnique({
        where: { userId: uid },
    });

    const data = {
        data: user?.data,
        options: user?.options,
    }

    const response = NextResponse.json(data);
    response.headers.set("Cache-Control", "public, max-age=5");

    return response;
}

export async function PATCH(req: NextRequest) {
    const userIP = await getUserIP();
    try {
        await rateLimiter.consume(userIP, 1);
    } catch {
        return NextResponse.json({ message: "Too Many Request" }, { status: 429 });
    }

    const session = await getUser();
    if (!session?.id) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await req.json();
    const newHSRList: string[] = body.newHSRList;

    if (!Array.isArray(newHSRList)) {
        return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    try {
        await prisma.hSRData.upsert({
            where: { userId: session.id },
            create: {
                userId: session.id,
                data: newHSRList,
                options: {},
            },
            update: {
                data: newHSRList,
            },
        });

        sendEventToUser(session.id, {
            type: 'updateHSRPick',
            timestamp: new Date(),
        });

        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error('Erreur update-hsr:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }


}