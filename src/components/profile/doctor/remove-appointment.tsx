'use client';

import { ImSpinner6 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { removeAppointment } from '@/actions/remove-appointment';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';

type RemoveAppointmentProps = {
    appointmentId: string;
};

export default function RemoveAppointment({ appointmentId }: RemoveAppointmentProps) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: removeAppointment,
        onSuccess: ({ remove, error }) => {
            remove && queryClient.invalidateQueries({ queryKey: ['appointments'] });

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
                className="flex justify-center items-center w-20 h-10 bg-red-500 rounded-md text-white"
                disabled={isPending}
                aria-label="Confirmation of delete appointment"
            >
                {isPending ? <ImSpinner6 className="size-6 animate-spin" /> : 'Delete'}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your appointment.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel aria-label="Cancel remove appointment">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleContinueClick}
                        disabled={isPending}
                        aria-label="Confirm remove appointment"
                    >
                        {isPending ? <ImSpinner6 className="size-6 animate-spin" /> : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
