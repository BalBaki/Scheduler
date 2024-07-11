'use client';

import { useSession } from 'next-auth/react';
import ProfilePicture from './profile-picture';
import Details from './details';

export default function Account() {
    const { data: session } = useSession();

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
        <>
            <div className="flex items-center gap-x-2 max-md:flex-col">
                <div className="max-w-96 border-2 border-black divide-y-2 divide-black">{renderedUser}</div>
                <ProfilePicture />
            </div>
            {session.user.role === 'DOCTOR' && <Details />}
        </>
    );
}
