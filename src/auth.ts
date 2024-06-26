import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from './db';
import Credentials from '@auth/core/providers/credentials';
import { v4 as randomUUID } from 'uuid';
import { encode as encodeParam } from '@auth/core/jwt';
import type { UserWithoutPassword } from './types';

declare module 'next-auth' {
    interface Session {
        user: UserWithoutPassword & DefaultSession['user'];
    }
}

const PASSWORD_SECRET = process.env.PASSWORD_SECRET;
export const MAX_TOKEN_AGE = 3 * 24 * 60 * 60;

if (!PASSWORD_SECRET) throw new Error('Missing Password Outh Credentials!');

export const {
    signIn,
    signOut,
    auth,
    handlers: { GET, POST },
} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Credentials({
            async authorize(credentials) {
                return credentials;
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            // @ts-ignore:next-line
            delete session.user.password;

            return session;
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
