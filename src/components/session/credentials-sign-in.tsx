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
        <div className="max-w-96 rounded-xl border-2 px-3 py-6 border-black my-4 mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <div className="grid place-content-center mt-3">
                        <Button
                            className="flex justify-center items-center border-2 w-16 h-9 rounded-md border-black"
                            disabled={isPending || !form.formState.isValid}
                        >
                            {isPending ? <ImSpinner6 className="size-6 animate-spin" /> : 'Login'}
                        </Button>
                    </div>
                </form>
            </Form>
            {loginResult?.errors?._form && <FormValidationError className="mt-1" errors={loginResult.errors._form} />}
        </div>
    );
}
