'use client';

import { useSession } from 'next-auth/react';
import Appointments from './appointments';
import { Skeleton } from '../ui/skeleton';
import WaitForApprove from '../wait-for-approve';

export default function Profile() {
    const { data: session, status } = useSession();

    if (status === 'loading')
        return (
            <div className="space-y-2 mx-2">
                {Array.from({ length: 9 }, (_, index) => (
                    <Skeleton key={index} className="h-8 w-96" />
                ))}
            </div>
        );
    if (!session) return null;

    const renderedUser = Object.entries(session.user).map(([key, value]) => {
        return (
            <div key={key} className="grid grid-cols-[1fr,2fr] text-wrap px-1">
                <div className="capitalize">{key}</div>
                <div className="border-l-2 border-l-black pl-1 truncate">{value}</div>
            </div>
        );
    });

    return (
        <div className="m-2">
            <div className="max-w-96 border-2 border-black divide-y-2 divide-black">{renderedUser}</div>
            {session.user.status === 'APPROVED' ? <Appointments user={session.user} /> : <WaitForApprove />}
        </div>
    );
}
