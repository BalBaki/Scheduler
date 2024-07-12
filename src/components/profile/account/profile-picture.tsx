'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CgProfile } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { updateProfilePicture } from '@/actions/update-profile-picture';
import { useSession } from 'next-auth/react';
import { ImSpinner6 } from 'react-icons/im';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../ui/button';

export default function ProfilePicture() {
    const { data: session, update: updateSession } = useSession();
    const [picture, setPicture] = useState<File | null>(null);
    const {
        mutate,
        isPending,
        data: result,
    } = useMutation({
        mutationFn: updateProfilePicture,
    });

    const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length < 1) return;

        setPicture(event.target.files[0]);
    };

    useEffect(() => {
        result?.update && updateSession();

        toast(result?.update ? 'Successfully Changed' : result?.error, {
            type: result?.update ? 'success' : 'error',
        });
    }, [result]);

    return (
        <div className="max-w-96 h-full ">
            <form action={mutate} className="flex flex-col items-center justify-center">
                <label htmlFor={isPending ? '' : 'profilePicture'}>
                    <div className="relative size-40 overflow-hidden">
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
                                priority={true}
                                className="object-cover rounded-full"
                            />
                        ) : (
                            <CgProfile className="w-full h-full" />
                        )}
                    </div>
                </label>
                <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handlePictureChange}
                    className="hidden"
                />
                {picture && (
                    <Button disabled={isPending} className="mt-2">
                        {isPending ? <ImSpinner6 className="w-full h-full animate-spin" /> : 'Save'}
                    </Button>
                )}
            </form>
        </div>
    );
}
