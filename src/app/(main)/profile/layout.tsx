'use client';

import { useSession } from 'next-auth/react';
import Tabs from '@/components/profile/tabs';
import WaitForApprove from '@/components/wait-for-approve';

type ProfileLayoutProps = {
    children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const { data: session } = useSession();

    if (!session) return null;
    if (session && session.user.status !== 'APPROVED')
        return <WaitForApprove />;

    return (
        <div className="mt-1 flex gap-x-2 max-sm:flex-col max-sm:gap-y-2">
            <Tabs />
            {children}
        </div>
    );
}
