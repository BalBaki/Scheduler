'use client';

import { useSession } from 'next-auth/react';
import Details from './details';
import ProfilePicture from './profile-picture';

export default function Account() {
    const { data: session } = useSession();

    if (!session) return null;

    const renderedUser = Object.entries(session.user).map(([key, value]) => {
        return (
            <div key={key} className="grid grid-cols-[1fr,2fr] text-wrap px-1">
                <div className="capitalize">{key}</div>
                <div className="truncate border-l-2 border-l-black pl-1">
                    {value}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="flex items-center gap-x-2 max-md:flex-col">
                <div className="max-w-96 divide-y-2 divide-black border-2 border-black">
                    {renderedUser}
                </div>
                <ProfilePicture />
            </div>
            {session.user.role === 'DOCTOR' && (
                <div className="max-w-md">
                    <Details />
                </div>
            )}
        </div>
    );
}
