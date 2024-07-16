'use server';

import { cookies, headers } from 'next/headers';
import { hash } from 'bcryptjs';
import { v4 as randomUUID } from 'uuid';
import type { FormState, SignUpForm } from '@/types';
import { signUpSchema } from '@/schemas';
import db from '@/db';
import { MAX_TOKEN_AGE } from '@/auth';
import { revalidatePath } from 'next/cache';

export const signUp = async (formData: SignUpForm): Promise<FormState<'register', SignUpForm>> => {
    const cookieStore = cookies();
    const url = headers().get('Referer');
    const validatedForm = signUpSchema.safeParse(formData);

    if (!validatedForm.success) return { register: false, errors: validatedForm.error.flatten().fieldErrors };

    try {
        const user = await db.user.findFirst({
            where: { email: validatedForm.data.email },
        });

        if (user) return { register: false, errors: { _form: 'This email is exists...!' } };

        const hashedPassword = await hash(validatedForm.data.password, 15);
        const { confirmPassword, ...formWithoutConfirm } = validatedForm.data;

        const newUser = await db.user.create({
            data: { ...formWithoutConfirm, password: hashedPassword },
        });

        const token = randomUUID();
        const expireDate = new Date(Date.now() + MAX_TOKEN_AGE * 1000);

        await db.session.create({
            data: {
                sessionToken: token,
                userId: newUser.id,
                expires: expireDate,
            },
        });

        cookieStore.set({
            name: 'authjs.session-token',
            value: token,
            httpOnly: true,
            expires: expireDate,
            path: '/',
            sameSite: 'lax',
        });

        if (url) {
            cookieStore.set({
                name: 'authjs.callback-url',
                value: url,
                httpOnly: true,
                path: '/',
                sameSite: 'lax',
            });
        }

        revalidatePath('/dashboard/approve');

        return { register: true };
    } catch (error) {
        return { register: false, errors: { _form: error instanceof Error ? error.message : 'Something went wrong' } };
    }
};
