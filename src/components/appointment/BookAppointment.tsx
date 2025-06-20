'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { bookAppointment } from '@/actions/appointment.action';
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
import { Status } from '@/enums';
import { ReactQueryService } from '@/services/react-query.service';
import LoadingSpinner from '../LoadingSpinner';
import { Button } from '../ui/button';

type BookAppoinmentProps = {
    id: string;
};

export default function BookAppoinment({ id }: BookAppoinmentProps) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: bookAppointment,
        async onSuccess(result) {
            const isSuccess = result.status === Status.Ok;

            if (isSuccess) {
                await ReactQueryService.multipleInvalidateQueries(queryClient, [
                    'appointments',
                    'doctor-appointments',
                ]);
            }

            toast(isSuccess ? 'Successfully Booked' : result.err, {
                type: isSuccess ? 'success' : 'error',
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
                    className="flex h-10 w-20 items-center justify-center rounded-md bg-green-500 text-white hover:bg-green-500/60"
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
                        className="bg-green-500 hover:bg-green-500/60"
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
