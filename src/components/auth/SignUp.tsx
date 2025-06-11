'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signUp } from '@/actions/sign-up';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { triggerClientSessionUpdate } from '@/lib/trigger-client-session-update';
import { signUpSchema } from '@/schemas';
import FormValidationError from '../FormValidationError';
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import type { SignUpForm } from '@/types';

export default function SignUp() {
    const router = useRouter();
    const form = useForm<SignUpForm>({
        mode: 'all',
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            role: 'PATIENT',
        },
    });
    const {
        mutate,
        isPending,
        data: result,
    } = useMutation({
        mutationFn: signUp,
        async onSuccess({ register }) {
            if (register) {
                await triggerClientSessionUpdate();

                router.push('/');
            } else {
                form.resetField('password');
                form.resetField('confirmPassword');
            }
        },
    });

    const onSubmit: SubmitHandler<SignUpForm> = (data) => mutate(data);
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        formChange: (...event: any[]) => void,
    ) => {
        const {
            formState: {
                dirtyFields: { confirmPassword: isConfirmPasswordDirty },
                errors: { confirmPassword: confirmPasswordError },
            },
            setError,
            clearErrors,
        } = form;

        if (
            isConfirmPasswordDirty &&
            (!confirmPasswordError || confirmPasswordError?.type === 'custom')
        ) {
            if (event.target.value !== form.getValues('confirmPassword')) {
                setError('confirmPassword', {
                    type: 'custom',
                    message: "Passwords don't match",
                });
            } else {
                clearErrors('confirmPassword');
            }
        }

        formChange(event.target.value);
    };

    return (
        <div className="flex h-full justify-center">
            <div className="flex-1 bg-register bg-cover max-md:hidden"></div>
            <div className="my-auto flex w-1/2 max-w-140 flex-col items-center px-14 py-2 max-md:w-full max-md:max-w-full max-md:px-[10%]">
                <h1 id="signUpForm" className="mb-6 text-3xl">
                    Sign Up to continue
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        aria-labelledby="signUpForm"
                        className="w-full"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                    {result?.errors?.email && (
                                        <FormValidationError
                                            errors={result.errors.email}
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
                                        <Input
                                            type="password"
                                            {...field}
                                            onChange={(e) =>
                                                handlePasswordChange(
                                                    e,
                                                    field.onChange,
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                    {result?.errors?.password && (
                                        <FormValidationError
                                            errors={result.errors.password}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                    {result?.errors?.confirmPassword && (
                                        <FormValidationError
                                            errors={
                                                result.errors.confirmPassword
                                            }
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                    {result?.errors?.name && (
                                        <FormValidationError
                                            errors={result.errors.name}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Surname</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                    {result?.errors?.surname && (
                                        <FormValidationError
                                            errors={result.errors.surname}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                    {result?.errors?.phoneNumber && (
                                        <FormValidationError
                                            errors={result.errors.phoneNumber}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className="w-36"
                                                {...field}
                                            >
                                                <SelectValue placeholder="Role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent
                                            ref={(ref) => {
                                                if (!ref) return;

                                                ref.ontouchstart = (e) =>
                                                    e.preventDefault();
                                            }}
                                        >
                                            <SelectItem value="PATIENT">
                                                Patient
                                            </SelectItem>
                                            <SelectItem value="DOCTOR">
                                                Doctor
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormDescription />
                                    <FormMessage />
                                    {result?.errors?.role && (
                                        <FormValidationError
                                            errors={result.errors.role}
                                        />
                                    )}
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="mt-4 h-12 w-full rounded-md border-black bg-[#622fcf] text-xs uppercase tracking-widest"
                            disabled={isPending || !form.formState.isValid}
                            aria-label={isPending ? 'Registering' : 'Register'}
                        >
                            {isPending ? <LoadingSpinner /> : 'Register'}
                        </Button>
                    </form>
                </Form>
                {result?.errors?._form && (
                    <FormValidationError
                        className="mt-3"
                        errors={result.errors._form}
                    />
                )}
                <div className="mt-3 text-center">
                    Do you have an account?
                    <Link href="/login" className="ml-1 text-[#2D3DD2]">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
