'use client';

import Tabs from '@/components/profile/tabs';
import WaitForApprove from '@/components/wait-for-approve';
import { useSession } from 'next-auth/react';

type ProfileLayoutProps = {
    children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const { data: session } = useSession();

    if (!session) return null;
    if (session && session.user.status !== 'APPROVED') return <WaitForApprove />;

    return (
        <div className="flex gap-x-2 mt-1 max-sm:flex-col max-sm:gap-y-2">
            <Tabs />
            {children}
        </div>
    );
}
