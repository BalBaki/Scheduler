'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { CgProfile } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { updateProfilePicture } from '@/actions/update-profile-picture';
import { useSession } from 'next-auth/react';
import SubmitButton from '../submit-button';
import { ImSpinner6 } from 'react-icons/im';

export default function ProfilePicture() {
    const { data: session, update } = useSession();
    const [result, dispatch] = useFormState(updateProfilePicture, { update: false });
    const [picture, setPicture] = useState<File | null>(null);

    const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length < 1) return;

        setPicture(event.target.files[0]);
    };

    useEffect(() => {
        if (result.update) {
            update();

            setPicture(null);
        }

        toast(result.update ? 'Successfully Changed' : result.error, {
            type: result.update ? 'success' : 'error',
        });
    }, [result]);

    return (
        <div className="max-w-96 h-full ">
            <form action={dispatch} className="flex flex-col items-center justify-center">
                <label htmlFor="profilPicture">
                    <div className="relative size-40">
                        {picture ? (
                            <Image
                                src={URL.createObjectURL(picture as Blob)}
                                alt="profile picture"
                                fill
                                className="object-cover rounded-full"
                            />
                        ) : session?.user.imageUrl ? (
                            <Image
                                src={session.user.imageUrl}
                                alt="profile picture"
                                fill
                                className="object-cover rounded-full"
                            />
                        ) : (
                            <CgProfile className="w-full h-full" />
                        )}
                    </div>
                </label>
                <input
                    type="file"
                    id="profilPicture"
                    name="profilPicture"
                    accept="image/*"
                    onChange={handlePictureChange}
                    className="hidden"
                />
                {picture && (
                    <SubmitButton
                        className="w-20 h-8 border-2 mt-1 border-black rounded-lg"
                        pendingText={<ImSpinner6 className="w-full h-full animate-spin" />}
                    >
                        Save
                    </SubmitButton>
                )}
            </form>
        </div>
    );
}
