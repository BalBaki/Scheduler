'use server';

import { auth } from '@/auth';
import db from '@/db';
import type { FormState, UserDetailForm } from '@/types';
import { userDetail } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const updateUserDetail = async (formData: UserDetailForm): Promise<FormState<'update', UserDetailForm>> => {
    const session = await auth();

    if (!session?.user) return { update: false, errors: { _form: 'You have no authorization..!' } };

    const validatedForm = userDetail.safeParse(formData);

    if (!validatedForm.success) return { update: false, errors: validatedForm.error.flatten().fieldErrors };

    await db.user.update({
        where: { id: session.user.id },
        data: validatedForm.data,
    });

    if (session.user.role === 'DOCTOR') revalidatePath(`/doctor/${session.user.id}`);

    return { update: true };
};
