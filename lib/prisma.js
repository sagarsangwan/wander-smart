import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    let instance;
    return () => {
        if (!instance) {
            instance = new PrismaClient();
        }
        return instance;
    };
};

const globalThis = { prismaGlobal: undefined };

const prisma = globalThis.prismaGlobal || prismaClientSingleton()();

module.exports = prisma;

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
