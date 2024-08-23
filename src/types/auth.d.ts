import NextAuth from 'next-auth';
import type { DefaultSession } from 'next-auth';
import type { UserWithoutPassword } from '.';

declare module 'next-auth' {
    interface Session {
        user: Omit<UserWithoutPassword, 'createdAt' | 'updatedAt'> &
            DefaultSession['user'];
    }
}
