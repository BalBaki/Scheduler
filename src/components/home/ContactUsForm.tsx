'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FcCheckmark } from 'react-icons/fc';
import { createFeedBack } from '@/actions/feedback.action';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Status } from '@/enums';
import { feedbackFormSchema } from '@/schemas';
import FormValidationError from '../FormValidationError';
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import type { FeedbackForm } from '@/types';

const STORAGE_KEY = 'feedback-form-submit-date';
const STORAGE_MAX_AGE = 3 * 24 * 60 * 60 * 1000;

export default function ContactUsForm() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const form = useForm<FeedbackForm>({
        mode: 'all',
        resolver: zodResolver(feedbackFormSchema),
        defaultValues: {
            email: '',
            message: '',
        },
    });
    const {
        mutate,
        isPending,
        data: result,
    } = useMutation({
        mutationFn: createFeedBack,
        onSuccess({ status }) {
            if (status === Status.Ok) {
                localStorage.setItem(
                    STORAGE_KEY,
                    Math.floor(new Date().getTime() / 1000).toString(),
                );

                setIsFormSubmitted(true);
            }
        },
    });
    const isFailure = result && result.status === Status.Err;

    const onSubmit: SubmitHandler<FeedbackForm> = (data) => mutate(data);

    useEffect(() => {
        const formSubmitDate = localStorage.getItem(STORAGE_KEY);

        formSubmitDate &&
        parseInt(formSubmitDate) &&
        parseInt(formSubmitDate) * 1000 + STORAGE_MAX_AGE > new Date().getTime()
            ? setIsFormSubmitted(true)
            : localStorage.removeItem(STORAGE_KEY);
    }, []);

    return (
        <div className="rounded-3xl bg-white p-8">
            {isFormSubmitted ? (
                <div className="flex items-center gap-x-2">
                    <FcCheckmark className="h-12 min-w-12" /> Your feedback
                    sended...
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="h-25">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="test@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                        {isFailure && result.err.email && (
                                            <FormValidationError
                                                errors={result.err.email}
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className="h-48">
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="test message"
                                                className="h-32 resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                        {isFailure && result.err.message && (
                                            <FormValidationError
                                                errors={result.err.message}
                                            />
                                        )}
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={!form.formState.isValid || isPending}
                                aria-label={isPending ? 'Submitting' : 'Submit'}
                                className="text-md mt-1 w-24 bg-[#cf471f] text-white"
                            >
                                {isPending ? <LoadingSpinner /> : 'Submit'}
                            </Button>
                        </form>
                    </Form>
                    {isFailure && result.err._form && (
                        <FormValidationError
                            className="mt-3"
                            errors={result.err._form}
                        />
                    )}
                </>
            )}
        </div>
    );
}
