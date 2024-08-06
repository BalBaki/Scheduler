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
import type { FeedbackFilterForm } from '@/types';

type FeedbackFiltersProps = {
    validatedFilters: FeedbackFilterForm;
};

export default function FeedbackFilters({
    validatedFilters,
}: FeedbackFiltersProps) {
    const pathname = usePathname();
    const { replace } = useRouter();
    const form = useForm<FeedbackFilterForm>({
        mode: 'all',
        resolver: zodResolver(feedbackFilterSchema),
        defaultValues: {
            query: validatedFilters.query,
        },
    });

    const onSubmit: SubmitHandler<FeedbackFilterForm> = (data) => {
        replace(`${pathname}?${new URLSearchParams(data).toString()}`);
    };

    return (
        <div className="w-full sm:max-w-md">
            <Form {...form}>
                <form
                    className="flex items-end gap-x-1 max-sm:block"
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
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mb-2 flex items-center max-sm:mt-1">
                        <Button
                            type="submit"
                            disabled={!form.formState.isValid}
                            className="w-20"
                        >
                            Search
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
