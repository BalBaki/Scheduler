'use client';

import Tabs from '@/components/profile/tabs';
import WaitForApprove from '@/components/wait-for-approve';
import { useSession } from 'next-auth/react';

type ProfileLayoutProps = {
    children: React.ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const { data: session } = useSession();

    return (
        <div className="flex gap-x-2 mt-1 max-sm:flex-col max-sm:gap-y-2">
            <Tabs />
            {session?.user.status !== 'APPROVED' ? <WaitForApprove /> : children}
        </div>
    );
}
