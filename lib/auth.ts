import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        twitch: {
            clientId: process.env.TWITCH_CLIENT_ID as string,
            clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
            scope: ["channel:read:redemptions", "channel:manage:redemptions", "user:read:email"],
        }
    },
    plugins: [nextCookies()],
    secret: process.env.BETTER_AUTH_SECRET as string,
});