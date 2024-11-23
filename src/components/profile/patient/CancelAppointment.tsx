'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GiCancel } from 'react-icons/gi';
import { toast } from 'react-toastify';
import { cancelAppointment } from '@/actions/cancel-appointment';
import LoadingSpinner from '@/components/LoadingSpinner';
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

type CancelAppointmentProps = {
    appointmentId: string;
};

export default function CancelAppointment({
    appointmentId,
}: CancelAppointmentProps) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: cancelAppointment,
        onSuccess: ({ cancel, error }) => {
            cancel &&
                queryClient.invalidateQueries({ queryKey: ['appointments'] });

            toast(cancel ? 'Successfully Cancelled' : error, {
                type: cancel ? 'success' : 'error',
            });
        },
    });

    const handleContinueClick = () => {
        mutate(appointmentId);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                disabled={isPending}
                aria-label="Cancel appointment"
            >
                {isPending ? (
                    <LoadingSpinner />
                ) : (
                    <GiCancel className="size-6" color="red" />
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to cancel the appointment?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        cancel your appointment.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel aria-label="Cancel process">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        aria-label="Confrim cancel appointment"
                        disabled={isPending}
                        onClick={handleContinueClick}
                    >
                        {isPending ? <LoadingSpinner /> : 'Continue'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
