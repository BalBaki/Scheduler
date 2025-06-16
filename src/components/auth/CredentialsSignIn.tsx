'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { credentialsSignIn } from '@/actions/auth.action';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Status } from '@/enums';
import { triggerClientSessionUpdate } from '@/lib/trigger-client-session-update';
import { credentialsSignInSchema } from '@/schemas';
import FormValidationError from '../FormValidationError';
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { SubmitHandler } from 'react-hook-form';
import type { CredentialsSignInForm } from '@/types';

export default function CredentialsSignIn() {
    const router = useRouter();
    const form = useForm<CredentialsSignInForm>({
        mode: 'all',
        resolver: zodResolver(credentialsSignInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const {
        mutate,
        isPending,
        data: result,
    } = useMutation({
        mutationFn: credentialsSignIn,
        async onSuccess({ status }) {
            if (status === Status.Ok) {
                await triggerClientSessionUpdate();

                router.replace('/');
            } else {
                form.resetField('password');
            }
        },
    });
    const isFailure = result && result.status === Status.Err;

    const onSubmit: SubmitHandler<CredentialsSignInForm> = (data) =>
        mutate(data);

    return (
        <div className="flex h-full justify-center">
            <div className="bg-login flex-1 bg-cover max-md:hidden"></div>
            <div className="my-auto flex w-1/2 max-w-140 flex-col items-center px-14 py-2 max-md:w-full max-md:max-w-full max-md:px-[10%]">
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
                                    <FormDescription />
                                    <FormMessage />
                                    {isFailure && result.err.email && (
                                        <FormValidationError
                                            errors={result.err.email}
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
                                    <FormDescription />
                                    <FormMessage />
                                    {isFailure && result.err.password && (
                                        <FormValidationError
                                            errors={result.err.password}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="bg-purple hover:bg-purple/60 mt-4 h-12 w-full rounded-md border-black text-xs tracking-widest uppercase"
                            disabled={isPending || !form.formState.isValid}
                            aria-label={isPending ? 'Logging in' : 'Login'}
                        >
                            {isPending ? <LoadingSpinner /> : 'Login'}
                        </Button>
                    </form>
                </Form>
                {isFailure && result.err._form && (
                    <FormValidationError
                        className="mt-3"
                        errors={result.err._form}
                    />
                )}
                <div className="mt-3 text-center">
                    Dont have an account?
                    <Link
                        href="/register"
                        className="ml-1 text-[#2D3DD2]"
                        aria-label="Sign up for a new account"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
