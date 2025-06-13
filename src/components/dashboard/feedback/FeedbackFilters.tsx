'use client';

import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { feedbackFilterSchema } from '@/schemas';
import type { FeedbackFilterForm, FeedbackSearchParams } from '@/types';

type FeedbackFiltersProps = {
    filters: FeedbackFilterForm;
    params: FeedbackSearchParams;
};

export default function FeedbackFilters({
    filters: validatedFilters,
    params,
}: FeedbackFiltersProps) {
    const pathname = usePathname();
    const { replace } = useRouter();
    const form = useForm<FeedbackFilterForm>({
        mode: 'all',
        resolver: zodResolver(feedbackFilterSchema),
        defaultValues: validatedFilters,
    });

    const onSubmit: SubmitHandler<FeedbackFilterForm> = (data) => {
        replace(
            `${pathname}?${new URLSearchParams(Object.assign({ ...params, ...data })).toString()}`,
        );
    };

    return (
        <div className="max-sm:w-full">
            <Form {...form}>
                <form
                    className="flex gap-2 max-sm:flex-col sm:items-end"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="query"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="w-full sm:w-80"
                                        placeholder="Search By Email..."
                                    />
                                </FormControl>
                                <FormDescription className="sr-only">
                                    Email to search
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={!form.formState.isValid}
                        className="w-full sm:w-20"
                    >
                        Search
                    </Button>
                </form>
            </Form>
        </div>
    );
}
