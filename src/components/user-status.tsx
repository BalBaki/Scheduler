'use client';

import { useSession } from 'next-auth/react';
import LoadingSpinner from './loading-spinner';
import WaitForApprove from './wait-for-approve';

type UserStatusProps = {
    children: React.ReactNode;
};

export default function UserStatus({ children }: UserStatusProps) {
    const { data: session, status } = useSession();

    if (!session && status === 'loading') return <LoadingSpinner page />;

    if (session && session.user.status === 'DECLINED')
        return (
            <div className="flex items-center justify-center text-5xl text-red-500">
                This Account is Declined..!
            </div>
        );

    return (
        <>
            {session && session.user.status === 'WAITING' && <WaitForApprove />}
            {children}
        </>
    );
}
