'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { approveAllUsers } from '@/actions/approve-all-users';
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

export default function ApproveAll() {
    const router = useRouter();
    const { mutate: approveAll, isPending } = useMutation({
        mutationFn: approveAllUsers,
        onSuccess({ approve, error }) {
            toast(
                approve ? 'Successfully approved all waiting users.' : error,
                {
                    type: approve ? 'success' : 'error',
                },
            );

            approve && router.replace('/dashboard/approve');
        },
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="flex h-10 w-28 items-center justify-center rounded-md border border-black text-sm max-sm:w-full"
                disabled={isPending}
                aria-label="Approve all waiting users"
            >
                {isPending ? (
                    <LoadingSpinner className="mx-auto py-2" />
                ) : (
                    'Approve All'
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure to approve all users?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Are you sure to approve
                        all users waiting for approval?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isPending}
                        aria-label="Cancel approve"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => approveAll()}
                        disabled={isPending}
                        aria-label="Confirm approve"
                    >
                        Approve
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
