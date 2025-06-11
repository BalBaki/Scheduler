'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import db from '@/db';
import { hasPermission } from '@/lib/permissions';
import { ResultWithError } from '@/types';
import type { UserStatus } from '@prisma/client';

export const updateUserStatus = async ({
    id,
    status,
}: {
    id: string;
    status: UserStatus;
}): Promise<ResultWithError<'update'>> => {
    try {
        const session = await auth();
        const user = await db.user.findFirst({
            omit: {
                password: true
            },
            where: {
                id,
            },
        });

        if (!user) return { update: false, error: 'Not exits User...' };
        if (
            !session ||
            !hasPermission(session.user, 'user', 'changeStatus') ||
            user.role === 'ADMIN'
        )
            return { update: false, error: 'You have no authorization..!' };

        const updatedUser = await db.user.update({
             omit: {
                password: true
            },
            data: {
                status,
            },
            where: {
                id: user.id,
            },
        });

        revalidatePath('/dashboard/approve');

        if (updatedUser.role === 'DOCTOR') revalidatePath('/doctor');

        return { update: true };
    } catch (error) {
        return { update: false, error: 'Someting went wrong..!' };
    }
};
