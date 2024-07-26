'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ImSpinner6 } from 'react-icons/im';
import { credentialsSignIn } from '@/actions/credentials-sign-in';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { signInSchema } from '@/schemas';
import FormValidationError from '../form-validation-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { SubmitHandler } from 'react-hook-form';
import type { SignInForm } from '@/types';

export default function CredentialsSignIn() {
    const form = useForm<SignInForm>({
        mode: 'all',
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const {
        mutate,
        isPending,
        data: loginResult,
    } = useMutation({
        mutationFn: credentialsSignIn,
        onSuccess({ login }) {
            if (login) location.replace('/');
        },
    });

    const onSubmit: SubmitHandler<SignInForm> = (data) => mutate(data);

    return (
        <div className="flex h-full justify-center">
            <div className="flex-1 bg-login bg-cover max-md:hidden"></div>
            <div className="my-auto flex w-1/2 max-w-[35rem] flex-col items-center px-14 py-2 max-md:w-full max-md:max-w-full max-md:px-[10%]">
                <h1 id="loginForm" className="mb-6 text-3xl">
                    Sign In to continue
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        aria-labelledby="loginForm"
                        className="w-full"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="email@email.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {loginResult?.errors?.email && (
                                        <FormValidationError
                                            errors={loginResult.errors.email}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    {loginResult?.errors?.password && (
                                        <FormValidationError
                                            errors={loginResult.errors.password}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="mt-4 h-12 w-full rounded-md border-black bg-[#6675df] text-xs uppercase tracking-widest"
                            disabled={isPending || !form.formState.isValid}
                            aria-label={isPending ? 'Logging in' : 'Login'}
                        >
                            {isPending ? (
                                <ImSpinner6 className="size-6 animate-spin" />
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                </Form>
                {loginResult?.errors?._form && (
                    <FormValidationError
                        className="mt-3"
                        errors={loginResult.errors._form}
                    />
                )}
                <div className="mt-3 text-center">
                    Don't have an account?
                    <Link
                        href="/register"
                        className="ml-1 text-[#6675df]"
                        aria-label="Sign up for a new account"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
