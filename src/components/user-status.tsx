'use client';

type UserStatusProps = {
    children: React.ReactNode;
};

import { useSession } from 'next-auth/react';

export default function UserStatus({ children }: UserStatusProps) {
    const { data, status } = useSession();

    if (status === 'loading') return null;

    if (data?.user.status === 'DECLINED')
        return (
            <div className="h-screen flex justify-center items-center text-5xl text-red-500">
                This Account is Declined..!
            </div>
        );

    return children;
}
