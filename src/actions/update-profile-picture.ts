'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import db from '@/db';
import { extractImagePublicId } from '@/lib/extract-image-public-id';
import { hasPermission } from '@/lib/permissions';
import { profilePictureSchema } from '@/schemas';
import { cloudinaryService } from '@/services/cloudinary.service';
import type { ResultWithError } from '@/types';

export const updateProfilePicture = async (
    formData: FormData,
): Promise<ResultWithError<'update'>> => {
    try {
        const session = await auth();

        if (!session || !hasPermission(session.user, 'user', 'update'))
            return { update: false, error: 'You have no authorization..!' };

        const validatedPicture = profilePictureSchema.safeParse(
            formData.get('profilePicture'),
        );

        if (!validatedPicture.success)
            return {
                update: false,
                error: validatedPicture.error.flatten().formErrors.join(' '),
            };

        const uploadImageResponse = await cloudinaryService.uploadFile(
            validatedPicture.data,
            {
                folder: 'profileee',
                resource_type: 'image',
                filename_override: session.user.id,
                use_filename: true,
                ...(session.user.imageUrl && {
                    overwrite: true,
                    public_id: extractImagePublicId(session.user.imageUrl),
                }),
            },
        );

        if (!uploadImageResponse.upload)
            return {
                update: false,
                error: uploadImageResponse.error,
            };

        await db.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                imageUrl: uploadImageResponse.data.secure_url,
            },
        });

        //TODO will delete after doctor page new design
        if (session.user.role === 'DOCTOR') revalidatePath('/doctor');

        return { update: true };
    } catch (error) {
        return { update: false, error: 'Something went wrong..!' };
    }
};
