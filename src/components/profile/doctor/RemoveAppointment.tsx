'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { removeAppointment } from '@/actions/appointment.action';
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
import { Status } from '@/enums';

type RemoveAppointmentProps = {
    appointmentId: string;
};

export default function RemoveAppointment({
    appointmentId,
}: RemoveAppointmentProps) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: removeAppointment,
        onSuccess: (result) => {
            const isSuccess = result.status === Status.Ok;

            if (isSuccess) {
                queryClient.invalidateQueries({ queryKey: ['appointments'] });
            }

            toast(isSuccess ? 'Successfully Removed' : result.err, {
                type: isSuccess ? 'success' : 'error',
            });
        },
    });

    const handleContinueClick = () => {
        mutate(appointmentId);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="flex h-10 w-20 items-center justify-center rounded-md bg-red-500 px-8 text-white hover:bg-red-500/60 disabled:cursor-not-allowed disabled:opacity-50"
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
                        className="bg-red-500 hover:bg-red-500/60"
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
