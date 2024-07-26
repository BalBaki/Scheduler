'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ImSpinner6 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { addAppointment } from '@/actions/add-appointment';
import FormValidationError from '@/components/form-validation-error';
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
import { Label } from '@/components/ui/label';
import { useLocale } from '@/hooks/use-locale';
import { addAppointmentSchema } from '@/schemas';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import type { Dispatch, SetStateAction } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { AddAppointmentForm } from '@/types';

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
    const form = useForm<AddAppointmentForm>({
        mode: 'all',
        resolver: zodResolver(addAppointmentSchema),
        defaultValues: {
            title: '',
            start: '',
            end: '',
            date: date?.toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
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
    const onSubmit: SubmitHandler<AddAppointmentForm> = (data) => mutate(data);

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
                    <VisuallyHidden.Root>
                        <DialogDescription>Add Appointment</DialogDescription>
                    </VisuallyHidden.Root>
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
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="hidden" {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                    {isPending ? (
                                        <ImSpinner6 className="size-6 animate-spin" />
                                    ) : (
                                        'Save'
                                    )}
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
