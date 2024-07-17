'use server';

import { auth } from '@/auth';
import db from '@/db';
import { prismaExclude } from '@/lib/prisma-exclude';
import { ResultWithError } from '@/types';
import type { UserStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const updateUserStatus = async ({
    id,
    status,
}: {
    id: string;
    status: UserStatus;
}): Promise<ResultWithError<'update'>> => {
    try {
        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') return { update: false, error: 'You have no authorization..!' };

        const user = await db.user.findFirst({
            where: {
                id,
            },
            select: prismaExclude('User', ['password']),
        });

        if (!user) return { update: false, error: 'Not exits User...' };

        const updatedUser = await db.user.update({
            data: {
                status,
            },
            where: {
                id: user.id,
            },
            select: prismaExclude('User', ['password']),
        });

        revalidatePath('/dashboard/approve');

        if (updatedUser.role === 'DOCTOR') revalidatePath('/doctor');

        return { update: true };
    } catch (error) {
        return { update: false, error: 'Someting went wrong..!' };
    }
};