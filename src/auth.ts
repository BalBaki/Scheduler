import { encode as encodeParam } from '@auth/core/jwt';
import Credentials from '@auth/core/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { v4 as randomUUID } from 'uuid';
import db from './db';
import { prismaExclude } from './lib/prisma-exclude';
import type { Adapter, AdapterSession, AdapterUser } from '@auth/core/adapters';
import type { PrismaClient } from '@prisma/client';

const PASSWORD_SECRET = process.env.PASSWORD_SECRET;
export const MAX_TOKEN_AGE = 3 * 24 * 60 * 60;

if (!PASSWORD_SECRET) throw new Error('Missing Password Outh Credentials!');

const CustomPrismaAdapter = (
    prisma: PrismaClient | ReturnType<PrismaClient['$extends']>,
): Adapter => {
    const p = prisma as PrismaClient;

    return {
        ...PrismaAdapter(p),
        async getSessionAndUser(sessionToken: string) {
            const userAndSession = await p.session.findUnique({
                where: { sessionToken },
                include: {
                    user: {
                        select: prismaExclude('User', [
                            'password',
                            'createdAt',
                            'updatedAt',
                        ]),
                    },
                },
            });

            if (!userAndSession) return null;

            const { user, ...session } = userAndSession;

            // @ts-expect-errors
            return { user, session } as {
                user: AdapterUser;
                session: AdapterSession;
            };
        },
    };
};

export const {
    signIn,
    signOut,
    auth,
    handlers: { GET, POST },
} = NextAuth({
    adapter: CustomPrismaAdapter(db),
    providers: [
        Credentials({
            async authorize(credentials) {
                return credentials;
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            const { sessionToken, ...sessionWithoutToken } = session;

            return sessionWithoutToken;
        },
        async jwt({ token, user, account }) {
            if (account?.provider !== 'credentials') return token;

            if (user.id) {
                const currentSession = await db.session.findFirst({
                    where: {
                        userId: user.id,
                    },
                });
                const newSessionData = {
                    sessionToken: randomUUID(),
                    userId: user.id,
                    expires: new Date(Date.now() + MAX_TOKEN_AGE * 1000),
                };
                const session = currentSession
                    ? await db.session.update({
                          where: {
                              userId: currentSession.userId,
                              sessionToken: currentSession.sessionToken,
                          },
                          data: newSessionData,
                      })
                    : await db.session.create({
                          data: newSessionData,
                      });

                token.sessionId = session.sessionToken;
            }

            return token;
        },
    },
    jwt: {
        async encode(params) {
            return (params.token?.sessionId as string) ?? encodeParam(params);
        },
    },
    session: {
        maxAge: MAX_TOKEN_AGE,
    },
    trustHost: true,
});
