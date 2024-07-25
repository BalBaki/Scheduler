'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner6 } from 'react-icons/im';
import { signUp } from '@/actions/sign-up';
import type { SignUpForm } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schemas';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormValidationError from '../form-validation-error';
import Link from 'next/link';

export default function SignUp() {
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
        onSuccess({ register }) {
            register && location.replace('/');
        },
    });

    const onSubmit: SubmitHandler<SignUpForm> = (data) => mutate(data);
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        formChange: (...event: any[]) => void
    ) => {
        const {
            formState: {
                dirtyFields: { confirmPassword: isConfirmPasswordDirty },
                errors: { confirmPassword: confirmPasswordError },
            },
            setError,
            clearErrors,
        } = form;

        if (isConfirmPasswordDirty && (!confirmPasswordError || confirmPasswordError?.type === 'custom')) {
            if (event.target.value !== form.getValues('confirmPassword')) {
                setError('confirmPassword', { type: 'custom', message: "Passwords don't match" });
            } else {
                clearErrors('confirmPassword');
            }
        }

        formChange(event.target.value);
    };

    return (
        <div className="flex justify-center h-full">
            <div className="flex-1 bg-register bg-cover max-md:hidden"></div>
            <div className="flex flex-col items-center w-1/2 max-w-[35rem] my-auto px-14 py-2 max-md:w-full max-md:px-[10%] max-md:max-w-full">
                <h1 id="signUpForm" className="text-3xl mb-6">
                    Sign Up to continue
                </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} aria-labelledby="signUpForm" className="w-full">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    {result?.errors?.email && <FormValidationError errors={result.errors.email} />}
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
                                            onChange={(e) => handlePasswordChange(e, field.onChange)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {result?.errors?.password && (
                                        <FormValidationError errors={result.errors.password} />
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
                                    <FormMessage />
                                    {result?.errors?.confirmPassword && (
                                        <FormValidationError errors={result.errors.confirmPassword} />
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
                                    <FormMessage />
                                    {result?.errors?.name && <FormValidationError errors={result.errors.name} />}
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
                                    <FormMessage />
                                    {result?.errors?.surname && <FormValidationError errors={result.errors.surname} />}
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
                                    <FormMessage />
                                    {result?.errors?.phoneNumber && (
                                        <FormValidationError errors={result.errors.phoneNumber} />
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
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-36">
                                                <SelectValue placeholder="Role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent
                                            ref={(ref) => {
                                                if (!ref) return;

                                                ref.ontouchstart = (e) => e.preventDefault();
                                            }}
                                        >
                                            <SelectItem value="PATIENT">Patient</SelectItem>
                                            <SelectItem value="DOCTOR">Doctor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    {result?.errors?.role && <FormValidationError errors={result.errors.role} />}
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full h-12 rounded-md border-black mt-4 bg-[#6675df] uppercase text-xs tracking-widest"
                            disabled={isPending || !form.formState.isValid}
                        >
                            {isPending ? <ImSpinner6 className="size-6 animate-spin" /> : 'Register'}
                        </Button>
                    </form>
                </Form>
                {result?.errors?._form && <FormValidationError className="mt-3" errors={result.errors._form} />}
                <div className="mt-3 text-center">
                    Do you have an account?
                    <Link href="/login" className="text-[#6675df] ml-1">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
