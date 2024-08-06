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
                                            className="w-36"
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
