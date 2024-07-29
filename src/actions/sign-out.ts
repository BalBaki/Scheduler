'use server';

import { signOut } from '@/auth';
import type { SignOutState } from '@/types';

export const signout = async (): Promise<SignOutState> => {
    try {
        await signOut();
    } finally {
        return { logout: true };
    }
};
