'use client';

import { useRouter } from 'next/navigation';
import { approveAllUsers } from '@/actions/approve-all-users';
import { ImSpinner6 } from 'react-icons/im';
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
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function ApproveAll() {
    const router = useRouter();
    const { mutate: approveAll, isPending } = useMutation({
        mutationFn: approveAllUsers,
        onSuccess({ approve, error }) {
            toast(approve ? 'Successfully approved all waiting users.' : error, {
                type: approve ? 'success' : 'error',
            });

            approve && router.replace('/dashboard/approve');
        },
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="w-28 h-10 border border-black rounded-md text-sm max-sm:w-full max-sm:mt-1"
                disabled={isPending}
                aria-label="Approve all waiting users"
            >
                {isPending ? <ImSpinner6 className="size-full animate-spin py-2" /> : 'Approve All'}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to approve all users?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending} aria-label="Cancel approve">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => approveAll()} disabled={isPending} aria-label="Confirm approve">
                        Approve
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
