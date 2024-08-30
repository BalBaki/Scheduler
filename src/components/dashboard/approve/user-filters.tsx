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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { userFilterSchema } from '@/schemas';
import type { UserFilterForm } from '@/types';

type UserFilters = {
    validatedfilters: UserFilterForm;
};

export default function UserFilters({ validatedfilters }: UserFilters) {
    const pathname = usePathname();
    const { replace } = useRouter();
    const form = useForm<UserFilterForm>({
        mode: 'all',
        resolver: zodResolver(userFilterSchema),
        defaultValues: {
            query: validatedfilters.query,
            status: validatedfilters.status,
        },
    });

    const onSubmit: SubmitHandler<UserFilterForm> = (data) => {
        replace(`${pathname}?${new URLSearchParams(data).toString()}`);
    };

    return (
        <div className="max-sm:w-full">
            <Form {...form}>
                <form
                    className="flex gap-2 max-sm:flex-col md:items-end"
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
                                        className="w-full sm:w-64"
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
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full sm:w-36"
                                            aria-label={field.value}
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
                                        <SelectItem value="ALL">ALL</SelectItem>
                                        <SelectItem value="WAITING">
                                            WAITING
                                        </SelectItem>
                                        <SelectItem value="APPROVED">
                                            APPROVED
                                        </SelectItem>
                                        <SelectItem value="DECLINED">
                                            DECLINED
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription className="sr-only">
                                    User status to search
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={!form.formState.isValid}
                        className="mt-auto w-full sm:w-20"
                    >
                        Search
                    </Button>
                </form>
            </Form>
        </div>
    );
}
