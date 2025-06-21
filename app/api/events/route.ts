// app/api/events/route.ts
import { NextRequest } from 'next/server';
import { addClient, removeClient } from '@/lib/sse';

export async function GET(req: NextRequest) {

    const uid = req.nextUrl.searchParams.get('uid');
    if (!uid) return new Response('Missing UID', { status: 400 });

    const stream = new ReadableStream({
        start(controller) {
            addClient(uid, controller);

            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(`data: "Connexion établie"\n\n`));

            // Ping toutes les 15 secondes pour maintenir la connexion
            const ping = setInterval(() => {
                controller.enqueue(encoder.encode(`:\n\n`));
            }, 15000);

            req.signal.addEventListener('abort', () => {
                clearInterval(ping);
                removeClient(uid, controller);
                controller.close();
                console.log(`Client SSE déconnecté : ${uid}`);
            });
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

