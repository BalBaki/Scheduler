'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { signInSchema } from '@/schemas';
import type { FormState, SignInForm } from '@/types';
import { compare } from 'bcryptjs';
import { getUserByEmail } from '@/db/queries/user';

export const credentialsSignIn = async (formData: SignInForm): Promise<FormState<'login', SignInForm>> => {
    try {
        const validatedFormData = signInSchema.safeParse(formData);

        if (!validatedFormData.success) return { login: false, errors: validatedFormData.error.flatten().fieldErrors };

        const user = await getUserByEmail(validatedFormData.data.email);

        if (!user) return { login: false, errors: { _form: 'Invalid email or password!' } };

        const isPasswordMatch = await compare(validatedFormData.data.password, user.password);

        if (!isPasswordMatch) return { login: false, errors: { _form: 'Invalid email or password!' } };

        const { password, ...rest } = user;

        await signIn('credentials', rest);

        return { login: true };
    } catch (error) {
        if (isRedirectError(error)) {
            return { login: true };
        }

        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                case 'CallbackRouteError':
                    return { login: false, errors: { _form: 'Invalid email or password!' } };
                default:
                    return { login: false, errors: { _form: 'Something went wrong while logging in!' } };
            }
        }

        throw error;
    }
};
