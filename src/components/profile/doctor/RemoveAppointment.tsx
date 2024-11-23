'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { removeAppointment } from '@/actions/remove-appointment';
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

type RemoveAppointmentProps = {
    appointmentId: string;
};

export default function RemoveAppointment({
    appointmentId,
}: RemoveAppointmentProps) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: removeAppointment,
        onSuccess: ({ remove, error }) => {
            remove &&
                queryClient.invalidateQueries({ queryKey: ['appointments'] });

            toast(remove ? 'Successfully Removed' : error, {
                type: remove ? 'success' : 'error',
            });
        },
    });

    const handleContinueClick = () => {
        mutate(appointmentId);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="flex h-10 w-20 items-center justify-center rounded-md bg-red-500 text-white"
                disabled={isPending}
                aria-label="Confirmation of delete appointment"
            >
                {isPending ? <LoadingSpinner /> : 'Delete'}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your appointment.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel aria-label="Cancel remove appointment">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleContinueClick}
                        disabled={isPending}
                        aria-label="Confirm remove appointment"
                    >
                        {isPending ? <LoadingSpinner /> : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
