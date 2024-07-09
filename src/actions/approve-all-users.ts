'use server';

import { auth } from '@/auth';
import db from '@/db';
import { revalidatePath } from 'next/cache';

export const approveAllUsers = async () => {
    const session = await auth();

    if (session?.user.role !== 'ADMIN') throw new Error('You are not admin..!');

    await db.user.updateMany({
        data: {
            status: 'APPROVED',
        },
        where: {
            status: 'WAITING',
        },
    });

    revalidatePath('/dashboard/approve');
};
