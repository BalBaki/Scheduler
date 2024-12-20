'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import db from '@/db';
import { hasPermission } from '@/lib/permissions';
import type { ResultWithError } from '@/types';

export const approveAllUsers = async (): Promise<
    ResultWithError<'approve'>
> => {
    try {
        const session = await auth();

        if (!session || !hasPermission(session.user, 'user', 'changeStatus'))
            return { approve: false, error: 'You have no authorization..!' };

        await db.user.updateMany({
            data: {
                status: 'APPROVED',
            },
            where: {
                status: 'WAITING',
            },
        });

        revalidatePath('/dashboard/approve');
        revalidatePath('/doctor');

        return { approve: true };
    } catch (error) {
        return { approve: false, error: 'Someting went wrong..!' };
    }
};
