'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { CgProfile } from 'react-icons/cg';
import { toast } from 'react-toastify';
import ImageCrop from './image-crop';
import { updateProfilePicture } from '@/actions/update-profile-picture';
import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '../../ui/button';

export default function ProfilePicture() {
    const { data: session, update: updateSession } = useSession();
    const [image, setImage] = useState<File | null>(null);
    const [croppedImage, setCroppedImage] = useState<File | null>(null);
    const imageUrl = useMemo(() => {
        return image ? URL.createObjectURL(image as Blob) : '';
    }, [image]);

    const { mutate: uploadPicture, isPending } = useMutation({
        mutationFn: updateProfilePicture,
        onSuccess({ update, error }) {
            if (update) {
                updateSession().then(() => {
                    setImage(null);
                });
            }

            toast(update ? 'Profile picture was changed' : error, {
                type: update ? 'success' : 'error',
            });
        },
    });
    const handlePictureChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!event.target.files || event.target.files.length < 1) return;

        setImage(event.target.files[0]);
    };
    const handleCancelClick = () => {
        setImage(null);
    };

    useEffect(() => {
        setCroppedImage(null);
    }, [image]);

    return (
        <div className="flex gap-x-3 rounded-lg bg-white px-3 py-3 shadow-md max-sm:flex-col max-sm:items-center">
            <div className="flex max-w-56 flex-col items-center justify-center">
                <label htmlFor={isPending ? '' : 'profilePicture'}>
                    <div className="relative size-28 overflow-hidden">
                        {image || session?.user.imageUrl ? (
                            <Image
                                src={
                                    image || croppedImage
                                        ? URL.createObjectURL(
                                              (croppedImage || image) as Blob,
                                          )
                                        : session?.user.imageUrl || ''
                                }
                                alt="profile picture"
                                fill
                                sizes="10rem, 10rem"
                                className="aspect-square rounded-full"
                                priority
                            />
                        ) : (
                            <CgProfile className="h-full w-full" />
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
                {image && (
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
                        <ImageCrop
                            imageUrl={imageUrl}
                            setCroppedImage={setCroppedImage}
                            disabled={isPending}
                        />
                        <Button
                            disabled={isPending}
                            className="w-16"
                            aria-label="Save Profile Picture"
                            onClick={() => {
                                if (!image) return;

                                const formData = new FormData();

                                formData.append(
                                    'profilePicture',
                                    croppedImage || image,
                                );

                                uploadPicture(formData);
                            }}
                        >
                            {isPending ? (
                                <LoadingSpinner className="size-full" />
                            ) : (
                                'Save'
                            )}
                        </Button>
                        <Button
                            disabled={isPending}
                            className="w-16"
                            aria-label="Cancel Editing Profile Photo"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
            <div>
                <p className="text-md font-semibold capitalize">{`${session?.user.name} ${session?.user.surname}`}</p>
                <p className="text-md">{`${session?.user.email}`}</p>
            </div>
        </div>
    );
}
