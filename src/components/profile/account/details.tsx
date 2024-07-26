'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Languages from './languages';
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
import { userDetail } from '@/schemas';
import { UserDetailForm } from '@/types';
import EditableText from '../../editable-text';
import { Textarea } from '../../ui/textarea';

export default function Details() {
    const { data: session, update: updateSession } = useSession();

    const form = useForm<UserDetailForm>({
        resolver: zodResolver(userDetail),
        mode: 'all',
        values: {
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <EditableText
                                    text={{
                                        main: form.getValues('description'),
                                    }}
                                    schema={{ text: 'px-3 py-2 text-sm' }}
                                    cancel={() =>
                                        form.resetField('description')
                                    }
                                >
                                    <Textarea
                                        {...field}
                                        className="h-full resize-none"
                                        autoFocus
                                        name="description"
                                        id="description"
                                    />
                                    <FormMessage />
                                </EditableText>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Languages />
                <Button
                    type="submit"
                    className="bg-green-500"
                    disabled={
                        isPending ||
                        !form.formState.isValid ||
                        !form.formState.isDirty
                    }
                    aria-label="Save user details"
                >
                    {isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                </Button>
            </form>
        </Form>
    );
}
