'use client';

import { ImSpinner6 } from 'react-icons/im';
import { Input } from '@/components/ui/input';
import { searchUser } from '@/actions/search-user';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { UserSearchForm } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSearchSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import FormValidationError from '@/components/form-validation-error';

type SearchUserhProps = {
    term: string | string[] | undefined;
};

export default function SearchUser({ term }: SearchUserhProps) {
    const form = useForm<UserSearchForm>({
        mode: 'all',
        resolver: zodResolver(userSearchSchema),
        defaultValues: {
            term: term?.toString() || '',
        },
    });
    const {
        mutate,
        isPending,
        data: result,
    } = useMutation({
        mutationFn: searchUser,
    });
    const onSubmit: SubmitHandler<UserSearchForm> = (data) => mutate(data);

    return (
        <div className="w-full sm:max-w-md">
            <Form {...form}>
                <form className="flex items-start gap-x-1 max-sm:block" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="term"
                        render={({ field }) => (
                            <FormItem>
                                <Input {...field} className="w-full sm:w-80" placeholder="Search By Email..." />
                                {result?.errors?.term && <FormValidationError errors={result.errors.term} />}
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center items-center max-sm:mt-1">
                        <Button type="submit" disabled={isPending || !form.formState.isValid} className="w-20">
                            {isPending ? <ImSpinner6 className="size-full animate-spin" /> : 'Search'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
