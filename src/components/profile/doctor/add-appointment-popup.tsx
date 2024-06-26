'use client';

import { type Dispatch, type SetStateAction } from 'react';
import moment from 'moment';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormValidationError from '@/components/form-validation-error';
import { ImSpinner6 } from 'react-icons/im';
import { addAppointment } from '@/actions/add-appointment';
import { addAppointmentSchema } from '@/schemas';
import type { AddAppointmentForm } from '@/types';

type AddAppointmentPopupProps = {
    date?: Date;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
};

export default function AddAppointmentPopup({ date, show, setShow }: AddAppointmentPopupProps) {
    const form = useForm<AddAppointmentForm>({
        mode: 'all',
        resolver: zodResolver(addAppointmentSchema),
        defaultValues: {
            title: '',
            start: '',
            end: '',
            date: moment(date).format('YYYY-MM-DD'),
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
            <DialogContent className="max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogTitle className="uppercase">Create Appointment</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-1">
                            <Label htmlFor="startstr">Date</Label>
                            <div className="border-2 rounded-md p-2 text-sm">{moment(date).format('LL')}</div>
                        </div>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    {result?.errors?.title && <FormValidationError errors={result.errors?.title} />}
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
                                    {result?.errors?.start && <FormValidationError errors={result.errors?.start} />}
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
                                    {result?.errors?.end && <FormValidationError errors={result.errors?.end} />}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input type="hidden" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="flex flex-row justify-end mt-3 space-x-2">
                            <Button
                                className="border-2 w-20 h-10 rounded-md"
                                disabled={isPending || !form.formState.isValid}
                            >
                                {isPending ? <ImSpinner6 className="size-6 animate-spin" /> : 'Save'}
                            </Button>
                        </DialogFooter>
                        {result?.errors?._form && <FormValidationError errors={result.errors?._form} />}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
