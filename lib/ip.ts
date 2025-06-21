import { headers } from "next/headers";

export const getUserIP = async () => {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || headersList.get("x-real-ip") || "127.0.0.1";
    if (ip === "::ffff:127.0.0.1") return "127.0.0.1";
    return ip;
};