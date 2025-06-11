import 'server-only';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { compare, hash } from 'bcryptjs';
import { AuthError } from 'next-auth';
import { z } from 'zod/v4';
import db from './db.service';
import { UserService } from './user.service';
import { signIn, signOut } from '@/auth';
import { Status } from '@/enums';
import { signInSchema, signUpSchema } from '@/schemas';
import type {
    CredentialsSignInResult,
    SignInForm,
    SignOutResult,
    SignUpForm,
    SignUpResult,
} from '@/types';

export class AuthService {
    static async signUp(formData: SignUpForm): SignUpResult {
        const validatedForm = signUpSchema.safeParse(formData);

        if (!validatedForm.success) {
            return {
                status: Status.Err,
                err: z.flattenError(validatedForm.error).fieldErrors,
            };
        }

        try {
            const user = await db.user.findFirst({
                where: { email: validatedForm.data.email },
            });

            if (user) {
                return {
                    status: Status.Err,
                    err: { _form: 'This email is exists...!' },
                };
            }

            const hashedPassword = await hash(validatedForm.data.password, 15);
            const { confirmPassword, ...formWithoutConfirm } =
                validatedForm.data;

            const { password, ...rest } = await db.user.create({
                data: { ...formWithoutConfirm, password: hashedPassword },
            });

            await signIn('credentials', rest);

            revalidatePath('/dashboard/approve');

            return { status: Status.Ok, data: {} };
        } catch (error) {
            if (isRedirectError(error)) {
                return { status: Status.Ok, data: {} };
            }

            return {
                status: Status.Err,
                err: {
                    _form:
                        error instanceof Error
                            ? error.message
                            : 'Something went wrong',
                },
            };
        }
    }

    static async credentialsSignIn(
        formData: SignInForm,
    ): CredentialsSignInResult {
        try {
            const validatedFormData = signInSchema.safeParse(formData);

            if (!validatedFormData.success) {
                return {
                    status: Status.Err,
                    err: z.flattenError(validatedFormData.error).fieldErrors,
                };
            }

            const user = await UserService.getUserByEmail(
                validatedFormData.data.email,
            );

            if (!user) {
                return {
                    status: Status.Err,
                    err: { _form: 'Invalid email or password!' },
                };
            }

            const isPasswordMatch = await compare(
                validatedFormData.data.password,
                user.password,
            );

            if (!isPasswordMatch) {
                return {
                    status: Status.Err,
                    err: { _form: 'Invalid email or password!' },
                };
            }

            const { password, ...rest } = user;

            await signIn('credentials', rest);

            return { status: Status.Ok, data: {} };
        } catch (error) {
            if (isRedirectError(error)) {
                return { status: Status.Ok, data: {} };
            }

            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                    case 'CallbackRouteError':
                        return {
                            status: Status.Err,
                            err: { _form: 'Invalid email or password!' },
                        };
                    default:
                        return {
                            status: Status.Err,
                            err: {
                                _form: 'Something went wrong while logging in!',
                            },
                        };
                }
            }

            throw error;
        }
    }

    static async signOut(): SignOutResult {
        try {
            await signOut();
        } finally {
            return { status: Status.Ok, data: {} };
        }
    }
}
