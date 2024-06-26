'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { bookAppointment } from '@/actions/book-appointment';
import { ImSpinner6 } from 'react-icons/im';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type BookAppoinmentProps = {
    appointment: {
        id: string;
        startDate: Date | null;
        endDate: Date | null;
    };
};

export default function BookAppoinment({ appointment: { id, startDate, endDate } }: BookAppoinmentProps) {
    const { mutate, isPending } = useMutation({
        mutationFn: bookAppointment,
        onSuccess({ book, error }) {
            toast(book ? 'Successfully Booked' : error, {
                type: book ? 'success' : 'error',
            });
        },
    });

    const handleContinueClick = () => {
        mutate({ id, startDate, endDate });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger disabled={isPending}>
                <div className="flex justify-center items-center w-20 h-10 bg-green-500 rounded-md text-white">
                    {isPending ? <ImSpinner6 className="size-6 animate-spin" /> : 'Book'}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>Book Appointment...</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleContinueClick} disabled={isPending}>
                        {isPending ? <ImSpinner6 className="size-6 animate-spin" /> : 'Continue'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
