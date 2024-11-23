'use client';

import { useTransition } from 'react';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { updateUserStatus } from '@/actions/update-user-status';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { UserWithoutPassword } from '@/types';

type StatusButtonsProps = {
    user: UserWithoutPassword;
};

export default function StatusButtons({ user }: StatusButtonsProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <>
            {user.status !== 'APPROVED' && (
                <button
                    className="size-6"
                    onClick={() =>
                        startTransition(() => {
                            updateUserStatus({
                                id: user.id,
                                status: 'APPROVED',
                            });
                        })
                    }
                    disabled={isPending}
                    aria-label="Approve user"
                >
                    {isPending ? (
                        <LoadingSpinner className="size-full" />
                    ) : (
                        <FcApproval className="size-full" />
                    )}
                </button>
            )}
            {user.status !== 'DECLINED' && (
                <button
                    className="size-6"
                    onClick={() =>
                        startTransition(() => {
                            updateUserStatus({
                                id: user.id,
                                status: 'DECLINED',
                            });
                        })
                    }
                    disabled={isPending}
                    aria-label="Decline user"
                >
                    {isPending ? (
                        <LoadingSpinner className="size-full" />
                    ) : (
                        <FcCancel className="size-full" />
                    )}
                </button>
            )}
        </>
    );
}
