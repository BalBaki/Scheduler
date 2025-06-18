import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { updateBannerPicture } from '@/actions/user-profile.action';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UserProfileBanner from '@/components/UserProfileBanner';
import { Status } from '@/enums';

export default function Banner() {
    const { data: session, update: updateSession } = useSession();
    const [image, setImage] = useState<File | null>(null);
    const { mutate: uploadBanner, isPending } = useMutation({
        mutationFn: updateBannerPicture,
        async onSuccess(result) {
            const isSuccess = result.status === Status.Ok;

            if (isSuccess) {
                await updateSession();

                setImage(null);
            }

            toast(isSuccess ? 'Banner picture was changed' : result.err, {
                type: isSuccess ? 'success' : 'error',
            });
        },
    });
    const imageUrl = useMemo(() => {
        return (
            (image
                ? URL.createObjectURL(image as Blob)
                : session?.user.bannerUrl) || '/assets/doctor-banner.jpg'
        );
    }, [image, session?.user.bannerUrl]);

    if (session?.user.role === 'PATIENT') return null;

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length < 1) return;

        setImage(event.target.files[0]);
    };
    const handleSaveClick = () => {
        if (!image) return;

        const formData = new FormData();

        formData.append('bannerPicture', image);

        uploadBanner(formData);
    };
    const handleCancelClick = () => {
        setImage(null);
    };

    return (
        <div className="relative h-40 rounded-lg bg-transparent p-3 shadow-md max-sm:flex-col">
            <Label
                htmlFor={isPending ? '' : 'banner'}
                className="absolute inset-0"
            >
                <UserProfileBanner url={imageUrl} className="h-40" />
            </Label>
            <Input
                type="file"
                className="hidden"
                id="banner"
                tabIndex={-1}
                onChange={handleImageChange}
            />
            {image && (
                <div className="absolute right-0 -bottom-12 z-50 ml-auto flex space-x-2">
                    <Button
                        className="min-w-20"
                        disabled={isPending}
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="min-w-20 bg-green-500 hover:bg-green-500/60"
                        disabled={isPending}
                        onClick={handleSaveClick}
                        aria-label={isPending ? 'Saving' : 'Save'}
                    >
                        {isPending ? <LoadingSpinner /> : 'Save'}
                    </Button>
                </div>
            )}
        </div>
    );
}
