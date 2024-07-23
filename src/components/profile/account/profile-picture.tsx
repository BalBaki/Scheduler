'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { CgProfile } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { updateProfilePicture } from '@/actions/update-profile-picture';
import { useSession } from 'next-auth/react';
import { ImSpinner6 } from 'react-icons/im';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../../ui/button';
import ImageCrop from './image-crop';

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

            toast(update ? 'Successfully Changed' : error, {
                type: update ? 'success' : 'error',
            });
        },
    });
    const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className="max-w-96 flex flex-col justify-center gap-y-1">
            <div className="flex flex-col items-center justify-center">
                <label htmlFor={isPending ? '' : 'profilePicture'}>
                    <div className="relative size-[200px]  overflow-hidden">
                        {image || session?.user.imageUrl ? (
                            <Image
                                src={
                                    image || croppedImage
                                        ? URL.createObjectURL((croppedImage || image) as Blob)
                                        : session?.user.imageUrl || ''
                                }
                                alt="profile picture"
                                fill
                                sizes="10rem, 10rem"
                                className="rounded-full aspect-square"
                                priority={true}
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
                {image && (
                    <div className="flex items-center gap-x-1 mt-2">
                        <ImageCrop imageUrl={imageUrl} setCroppedImage={setCroppedImage} disabled={isPending} />
                        <Button
                            disabled={isPending}
                            className="w-16"
                            onClick={() => {
                                if (!image) return;

                                const formData = new FormData();

                                formData.append('profilePicture', croppedImage || image);

                                uploadPicture(formData);
                            }}
                        >
                            {isPending ? <ImSpinner6 className="w-full h-full animate-spin" /> : 'Save'}
                        </Button>
                        <Button onClick={handleCancelClick} disabled={isPending}>
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
