'use client';

import Banner from './Banner';
import Details from './Details';
import ProfilePicture from './ProfilePicture';

export default function Account() {
    return (
        <div className="size-full border-2">
            <h1 className="my-8 ml-5 text-3xl font-bold">Account Settings</h1>
            <div className="bg-profile border-t-2">
                <div className="mx-2 py-5">
                    <Banner />
                    <ProfilePicture />
                    <Details />
                </div>
            </div>
        </div>
    );
}
