'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ImSpinner6 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { approveAllUsers } from '@/actions/approve-all-users';
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
                className="h-10 w-28 rounded-md border border-black text-sm max-sm:mt-1 max-sm:w-full"
                disabled={isPending}
                aria-label="Approve all waiting users"
            >
                {isPending ? (
                    <ImSpinner6 className="size-full animate-spin py-2" />
                ) : (
                    'Approve All'
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure to approve all users?
                    </AlertDialogTitle>
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
