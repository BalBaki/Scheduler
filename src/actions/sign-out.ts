'use server';

import { signOut } from '@/auth';
import type { SignOut } from '@/types';

export const signout = async (): Promise<SignOut> => {
    try {
        await signOut();
    } finally {
        return { logout: true };
    }
};
