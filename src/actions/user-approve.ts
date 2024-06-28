'use server';

import { auth } from '@/auth';
import db from '@/db';
import { UserWithoutPassword } from '@/types';
import type { UserStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const userApprove = async ({ user, status }: { user: UserWithoutPassword; status: UserStatus }) => {
    const session = await auth();

    if (session?.user.role !== 'ADMIN') throw new Error('You are not admin..!');

    await db.user.update({
        data: {
            status,
        },
        where: {
            id: user.id,
        },
    });

    revalidatePath('/dashboard/approve');

    if (user.role === 'DOCTOR') revalidatePath('/doctor');
};
