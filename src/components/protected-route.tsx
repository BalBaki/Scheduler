'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ProtectedRoute({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session } = useSession();

    if (!session || session.user.role !== 'ADMIN') return redirect('/');

    return children;
}
