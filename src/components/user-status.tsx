'use client';

import { useSession } from 'next-auth/react';

type UserStatusProps = {
    children: React.ReactNode;
};

export default function UserStatus({ children }: UserStatusProps) {
    const { data } = useSession();

    if (data?.user.status === 'DECLINED')
        return (
            <div className="flex h-screen items-center justify-center text-5xl text-red-500">
                This Account is Declined..!
            </div>
        );

    return children;
}
