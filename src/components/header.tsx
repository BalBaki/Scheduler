'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SignOut from './session/sign-out';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export default function Header() {
    const session = useSession();
    const pathname = usePathname();

    if (pathname.startsWith('/login') || pathname.startsWith('/register')) return null;
    if (session.status === 'loading') return <div className="mt-2 h-10">Loading...</div>;

    if (!session.data)
        return (
            <div className="flex flex-row-reverse mt-2 gap-x-2">
                <Link href="/login">
                    <Button variant="outline" className="w-20 border-black">
                        Sign In
                    </Button>
                </Link>
                <Link href="/register">
                    <Button variant="outline" className="w-20 border-black">
                        Register
                    </Button>
                </Link>
            </div>
        );

    return (
        <div className="mt-2 h-10">
            <div className="flex items-center gap-x-2">
                <div className="mr-auto capitalize truncate">{`${session.data.user.name} ${session.data.user.surname}`}</div>
                {session.data.user.role === 'ADMIN' && (
                    <Link href="/dashboard/approve">
                        <Button variant="outline" className="w-20 border-black">
                            Approve
                        </Button>
                    </Link>
                )}
                <Link href="/profile">
                    <Button variant="outline" className="w-20 border-black">
                        Profile
                    </Button>
                </Link>
                <SignOut />
            </div>
            {session.data.user.status === 'WAITING' && (
                <div className="bg-red-500 mt-1">
                    The account has not yet been approved. Wait for the administrator to approve it.
                </div>
            )}
        </div>
    );
}
