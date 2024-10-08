'use client';

import { useSession } from 'next-auth/react';

export default function ApprovedUserCheck({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session, status } = useSession();

    if (
        (!session && status === 'loading') ||
        (session && session.user.status !== 'APPROVED')
    )
        return null;

    return children;
}
