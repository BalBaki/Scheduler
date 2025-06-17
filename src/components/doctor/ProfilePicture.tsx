import Image from 'next/image';
import { IoPersonCircle } from 'react-icons/io5';
import type { User } from '@prisma/client';

type ProfilePictureProps = {
    data: Pick<User, 'name' | 'surname' | 'imageUrl'>;
};

export default function ProfilePicture({
    data: { imageUrl, name, surname },
}: ProfilePictureProps) {
    return (
        <div className="-mt-20 min-w-52 max-md:mx-auto">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={`${name} ${surname}'s profile photo`}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="size-52 rounded-full bg-[#f9f9f9] object-cover p-5"
                    priority={true}
                />
            ) : (
                <IoPersonCircle className="size-48 -translate-y-5 rounded-full bg-[#f9f9f9]" />
            )}
        </div>
    );
}
