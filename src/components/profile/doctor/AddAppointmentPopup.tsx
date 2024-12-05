'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format as formatDate } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { addAppointment } from '@/actions/add-appointment';
import FormValidationError from '@/components/FormValidationError';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLocale } from '@/hooks/use-locale';
import { addAppointmentClientSchema } from '@/schemas';
import type { Dispatch, SetStateAction } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { AddAppointmentClientForm } from '@/types';

type AddAppointmentPopupProps = {
    date?: Date;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
};

export default function AddAppointmentPopup({
    date,
    show,
    setShow,
}: AddAppointmentPopupProps) {
    const locale = useLocale();
    const form = useForm<AddAppointmentClientForm>({
        mode: 'all',
        resolver: zodResolver(addAppointmentClientSchema),
        defaultValues: {
            title: '',
            start: '',
            end: '',
        },
    });

    const queryClient = useQueryClient();

    const {
        mutate,
        isPending,
        data: result,
    } = useMutation({
        mutationFn: addAppointment,
        onSuccess: ({ add }) => {
            if (add) {
                queryClient.invalidateQueries({ queryKey: ['appointments'] });

                setShow(false);
            }

            toast(add ? 'Successfully Added' : 'Added Failed', {
                type: add ? 'success' : 'error',
            });
        },
    });
    const onSubmit: SubmitHandler<AddAppointmentClientForm> = (data) => {
        const formattedDate = formatDate(date || '', 'yyyy-MM-dd');
        const start = new Date(`${formattedDate} ${data.start}`).toISOString();
        const end = new Date(`${formattedDate} ${data.end}`).toISOString();

        mutate(Object.assign(data, { start, end }));
    };

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogTrigger className="absolute inset-0"></DialogTrigger>
            <DialogContent
                className="max-w-[425px]"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="uppercase">
                        Add Appointment
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Add new appointment
                    </DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-1">
                                <div>Date</div>
                                <div className="rounded-md border-2 p-2 text-sm">
                                    {date?.toLocaleDateString(locale, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="title"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        {result?.errors?.title && (
                                            <FormValidationError
                                                errors={result.errors.title}
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="start"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Hour</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        {result?.errors?.start && (
                                            <FormValidationError
                                                errors={result.errors.start}
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="end"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Hour</FormLabel>
                                        <FormControl>
                                            <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        {result?.errors?.end && (
                                            <FormValidationError
                                                errors={result.errors.end}
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="mt-3 flex flex-row justify-end space-x-2">
                                <Button
                                    className="h-10 w-20 rounded-md border-2"
                                    disabled={
                                        isPending || !form.formState.isValid
                                    }
                                >
                                    {isPending ? <LoadingSpinner /> : 'Save'}
                                </Button>
                            </DialogFooter>
                            {result?.errors?._form && (
                                <FormValidationError
                                    errors={result.errors._form}
                                />
                            )}
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
