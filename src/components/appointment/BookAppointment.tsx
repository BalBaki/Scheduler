'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { bookAppointment } from '@/actions/book-appointment';
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
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '../ui/button';

type BookAppoinmentProps = {
    id: string;
};

export default function BookAppoinment({ id }: BookAppoinmentProps) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: bookAppointment,
        onSuccess({ book, error }) {
            book &&
                queryClient.invalidateQueries({ queryKey: ['appointments'] });

            toast(book ? 'Successfully Booked' : error, {
                type: book ? 'success' : 'error',
            });
        },
    });

    const handleContinueClick = () => {
        mutate(id);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className="flex h-10 w-20 items-center justify-center rounded-md bg-green-500 text-white"
                    disabled={isPending}
                    aria-label={
                        isPending
                            ? 'Booking'
                            : 'Confirmation of book appointment'
                    }
                >
                    {isPending ? <LoadingSpinner /> : 'Book'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Book Appointment...
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel aria-label="Cancel book appointment">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleContinueClick}
                        disabled={isPending}
                        aria-label="Confirm book appointment"
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
