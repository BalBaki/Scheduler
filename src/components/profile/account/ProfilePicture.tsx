'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { CgProfile } from 'react-icons/cg';
import { toast } from 'react-toastify';
import ImageCrop from './ImageCrop';
import { updateProfilePicture } from '@/actions/user-profile.action';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Status } from '@/enums';
import { cn } from '@/lib/utils';
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
        onSuccess(result) {
            const isSuccess = result.status === Status.Ok;

            if (isSuccess) {
                updateSession().then(() => {
                    setImage(null);
                });
            }

            toast(isSuccess ? 'Profile picture was changed' : result.err, {
                type: isSuccess ? 'success' : 'error',
            });
        },
    });
    const handlePictureChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!event.target.files || event.target.files.length < 1) return;

        setImage(event.target.files[0]);
    };
    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setImage(null);
    };

    useEffect(() => {
        setCroppedImage(null);
    }, [image]);

    return (
        <div
            className={cn('relative z-10 flex w-fit items-center gap-x-3', {
                '-mt-18 ml-2': session?.user.role !== 'PATIENT',
            })}
        >
            <div className="flex flex-col">
                <label htmlFor={isPending ? '' : 'profilePicture'}>
                    <div className="border-profile relative size-36 overflow-hidden rounded-full border-12">
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
                            <CgProfile className="bg-profile size-full" />
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
        </div>
    );
}
