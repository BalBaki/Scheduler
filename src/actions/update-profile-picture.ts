'use server';

import { auth } from '@/auth';
import db from '@/db';
import { extractImagePublicId } from '@/lib/extract-image-public-id';
import { profilePictureSchema } from '@/schemas';
import cloudinary from '@/services/picture-upload-service';
import { ResultWithError } from '@/types';
import type { UploadApiResponse } from 'cloudinary';
import { revalidatePath } from 'next/cache';

export const updateProfilePicture = async (formData: FormData): Promise<ResultWithError<'update'>> => {
    try {
        const session = await auth();

        if (!session) return { update: false, error: 'You have no authorization..!' };

        const validatedPicture = profilePictureSchema.safeParse(formData.get('profilePicture'));

        if (!validatedPicture.success)
            return { update: false, error: validatedPicture.error.flatten().formErrors.join(' ') };

        const imageArrayBuffer = await validatedPicture.data.arrayBuffer();
        const uploadImageResult: UploadApiResponse | undefined = await new Promise((resolve) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: 'profile',
                        resource_type: 'image',
                        filename_override: session.user.id,
                        use_filename: true,
                        ...(session.user.imageUrl && {
                            overwrite: true,
                            public_id: extractImagePublicId(session.user.imageUrl),
                        }),
                    },
                    (error, uploadResult) => {
                        if (error) return { update: false, error: error.message };

                        return resolve(uploadResult);
                    }
                )
                .end(Buffer.from(imageArrayBuffer));
        });

        if (uploadImageResult) {
            await db.user.update({
                where: {
                    id: session.user.id,
                },
                data: {
                    imageUrl: uploadImageResult.secure_url,
                },
            });
        }

        //TODO will delete after doctor page new design
        if (session.user.role === 'DOCTOR') revalidatePath('/doctor');

        return { update: true };
    } catch (error) {
        return { update: false, error: 'Something went wrong..!' };
    }
};
