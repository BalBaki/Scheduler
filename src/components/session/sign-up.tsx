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
        <div className="w-full max-w-96 rounded-xl border-2 px-3 py-6 border-black my-4 mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
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
                                {result?.errors?.password && <FormValidationError errors={result.errors.password} />}
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
                                    <SelectContent>
                                        <SelectItem value="PATIENT">Patient</SelectItem>
                                        <SelectItem value="DOCTOR">Doctor</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                {result?.errors?.role && <FormValidationError errors={result.errors.role} />}
                            </FormItem>
                        )}
                    />
                    <div className="grid place-content-center mt-3">
                        <Button
                            className="flex justify-center items-center border-2 w-20 h-9 rounded-md border-black"
                            disabled={isPending || !form.formState.isValid}
                        >
                            {isPending ? <ImSpinner6 className="size-6 animate-spin" /> : 'Register'}
                        </Button>
                    </div>
                </form>
            </Form>
            {result?.errors?._form && <FormValidationError className="mt-1" errors={result.errors._form} />}
        </div>
    );
}
