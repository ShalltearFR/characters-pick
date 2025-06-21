import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/* async function main() {
    await prisma.user.create({
        data: {
            email: 'test@test.fr',
            HSR: {
                create: {
                    char_id: '123456789'
                }
            },
        }
    })
} */

export { prisma };