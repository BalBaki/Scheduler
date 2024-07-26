'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import db from '@/db';
import { userDetail } from '@/schemas';
import type { FormState, UserDetailForm } from '@/types';

export const updateUserDetail = async (
    formData: UserDetailForm,
): Promise<FormState<'update', UserDetailForm>> => {
    try {
        const session = await auth();

        if (!session || session.user.status !== 'APPROVED')
            return {
                update: false,
                errors: { _form: 'You have no authorization..!' },
            };

        const validatedForm = userDetail.safeParse(formData);

        if (!validatedForm.success)
            return {
                update: false,
                errors: validatedForm.error.flatten().fieldErrors,
            };

        await db.user.update({
            where: { id: session.user.id },
            data: validatedForm.data,
        });

        if (session.user.role === 'DOCTOR')
            revalidatePath(`/doctor/${session.user.id}`);

        return { update: true };
    } catch (error) {
        return {
            update: false,
            errors: { _form: 'Something went wrong...!' },
        };
    }
};
