
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma"
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),

    providers: [Google],
    pages: {
        signIn: "/login",
    },
    // callbacks: {
    //     async session({ session, user }) {
    //         // Include extra fields in the session object
    //         session.user.id = user.id;
    //         session.user.freePlanUsed = user.freePlanUsed;
    //         session.user.balance = user.balance;
    //         session.user.balanceUsed = user.balanceUsed;
    //         session.user.totalBalanceUsed = user.totalBalanceUsed;
    //         session.user.createdAt = user.createdAt;
    //         session.user.updatedAt = user.updatedAt;
    //         return session;
    //     },
    // },



})