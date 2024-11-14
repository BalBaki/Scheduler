'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { hash } from 'bcryptjs';
import { signIn } from '@/auth';
import db from '@/db';
import { signUpSchema } from '@/schemas';
import type { FormState, SignUpForm } from '@/types';

export const signUp = async (
    formData: SignUpForm,
): Promise<FormState<'register', SignUpForm>> => {
    const validatedForm = signUpSchema.safeParse(formData);

    if (!validatedForm.success)
        return {
            register: false,
            errors: validatedForm.error.flatten().fieldErrors,
        };

    try {
        const user = await db.user.findFirst({
            where: { email: validatedForm.data.email },
        });

        if (user)
            return {
                register: false,
                errors: { _form: 'This email is exists...!' },
            };

        const hashedPassword = await hash(validatedForm.data.password, 15);
        const { confirmPassword, ...formWithoutConfirm } = validatedForm.data;

        const { password, ...rest } = await db.user.create({
            data: { ...formWithoutConfirm, password: hashedPassword },
        });

        await signIn('credentials', rest);

        revalidatePath('/dashboard/approve');

        return { register: true };
    } catch (error) {
        if (isRedirectError(error)) {
            return { register: true };
        }

        return {
            register: false,
            errors: {
                _form:
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong',
            },
        };
    }
};
