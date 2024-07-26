'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GiCancel } from 'react-icons/gi';
import { ImSpinner6 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { cancelAppointment } from '@/actions/cancel-appointment';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
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
                    <ImSpinner6 className="size-6 animate-spin" />
                ) : (
                    <GiCancel className="size-6" color="red" />
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to cancel the appointment?
                    </AlertDialogTitle>
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
                        {isPending ? (
                            <ImSpinner6 className="size-6 animate-spin" />
                        ) : (
                            'Continue'
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
