'use client';

import { ImSpinner6 } from 'react-icons/im';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { credentialsSignIn } from '@/actions/credentials-sign-in';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/schemas';
import type { SignInForm } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormValidationError from '../form-validation-error';
import Link from 'next/link';

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
        <div className="flex justify-center h-full">
            <div className="flex-1 bg-login bg-cover max-md:hidden"></div>
            <div className="flex flex-col items-center w-1/2 max-w-[35rem] my-auto px-14 py-2 max-md:w-full max-md:px-[10%] max-md:max-w-full">
                <h1 id="loginForm" className="text-3xl mb-6">
                    Sign In to continue
                </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} aria-labelledby="loginForm" className="w-full">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@email.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    {loginResult?.errors?.email && (
                                        <FormValidationError errors={loginResult.errors.email} />
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
                                        <FormValidationError errors={loginResult.errors.password} />
                                    )}
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full h-12 rounded-md border-black mt-4 bg-[#6675df] uppercase text-xs tracking-widest"
                            disabled={isPending || !form.formState.isValid}
                        >
                            {isPending ? <ImSpinner6 className="size-6 animate-spin" /> : 'Login'}
                        </Button>
                    </form>
                </Form>
                {loginResult?.errors?._form && (
                    <FormValidationError className="mt-3" errors={loginResult.errors._form} />
                )}
                <div className="mt-3 text-center">
                    Don't have an account?
                    <Link href="/register" className="text-[#6675df] ml-1" aria-label="Sign up for a new account">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
