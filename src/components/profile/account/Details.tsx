'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import DescriptionEditor from './DescriptionEditor';
import Languages from './Languages';
import { updateUserDetail } from '@/actions/update-user-detail';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { hasPermission } from '@/lib/permissions';
import { userDetailSchema } from '@/schemas';
import { UserDetailForm } from '@/types';

export default function Details() {
    const { data: session, update: updateSession } = useSession();

    const form = useForm<UserDetailForm>({
        resolver: zodResolver(userDetailSchema),
        mode: 'all',
        values: {
            name: session?.user.name || '',
            surname: session?.user.surname || '',
            phoneNumber: session?.user.phoneNumber || '',
            description: session?.user.description || '',
            languages: session?.user.languages || [],
        },
    });
    const { mutate, isPending } = useMutation({
        mutationFn: updateUserDetail,
        onSuccess({ update }) {
            update && updateSession();
        },
    });
    const onSubmit: SubmitHandler<UserDetailForm> = (data) => mutate(data);

    const handleCancelClick = () => form.reset();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mt-2 grid grid-cols-1 items-center gap-x-3 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
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
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
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
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {session &&
                        hasPermission(session.user, 'user', 'moreDetail') && (
                            <>
                                <Languages />
                                <DescriptionEditor />
                            </>
                        )}
                </div>
                <div className="mt-2 flex flex-row-reverse items-center gap-x-2">
                    <Button
                        type="submit"
                        className="w-16 bg-green-500 text-center"
                        disabled={
                            isPending ||
                            !form.formState.isValid ||
                            !form.formState.isDirty
                        }
                        aria-label={isPending ? 'Saving' : 'Save user details'}
                    >
                        {isPending ? (
                            <Loader2 className="size-6 animate-spin" />
                        ) : (
                            'Save'
                        )}
                    </Button>
                    {form.formState.isDirty && (
                        <Button
                            className="w-16 bg-red-500"
                            disabled={isPending}
                            aria-label="Cancel changes"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
