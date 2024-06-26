'use server';

import db from '@/db';
import { UserWithoutPassword } from '@/types';
import { revalidatePath } from 'next/cache';

export const userApprove = async (user: UserWithoutPassword) => {
    await db.user.update({
        data: {
            status: 'APPROVED',
        },
        where: {
            id: user.id,
        },
    });

    revalidatePath('/dashboard/approve');

    if (user.role === 'DOCTOR') revalidatePath('/doctor');
};
