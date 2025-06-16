'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { approveAllWaitingUsers } from '@/actions/user-status.action';
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

export default function ApproveAll() {
    const router = useRouter();
    const { mutate: approveAll, isPending } = useMutation({
        mutationFn: approveAllWaitingUsers,
        onSuccess(result) {
            const isSuccess = result.status === Status.Ok;

            toast(
                isSuccess
                    ? 'Successfully approved all waiting users.'
                    : result.err,
                {
                    type: isSuccess ? 'success' : 'error',
                },
            );

            isSuccess && router.replace('/dashboard/users');
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
