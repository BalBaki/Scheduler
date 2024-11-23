'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AuthRoute({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session } = useSession();

    if (session) return redirect('/');

    return children;
}
