import 'server-only';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { z } from 'zod/v4';
import { cloudinaryService } from './cloudinary.service';
import { auth } from '@/auth';
import { Status } from '@/enums';
import { extractImagePublicId } from '@/lib/extract-image-public-id';
import { hasPermission } from '@/lib/permissions';
import { profilePictureSchema, userDetailSchema } from '@/schemas';
import db from '@/services/db.service';
import type {
    UpdateProfilePictureResult,
    UpdateUserDetailResult,
    UserDetailForm,
} from '@/types';

// TODO add try catch to all
export class UserService {
    static async getUserByEmail(email: string) {
        return await db.user.findFirst({
            where: { email },
        });
    }

    static getDoctorWithValidAppointmentsById = cache(async (id: string) => {
        return await db.user.findUnique({
            omit: {
                password: true,
            },
            where: {
                id,
            },
            include: {
                doctorAppointments: {
                    where: {
                        start: { gte: new Date() },
                    },
                    orderBy: {
                        start: 'asc',
                    },
                },
            },
        });
    });

    static getApprovedDoctors = async () => {
        return db.user.findMany({
            where: {
                AND: [{ role: 'DOCTOR', status: 'APPROVED' }],
            },
        });
    };

    static async updateUserDetail(
        formData: UserDetailForm,
    ): UpdateUserDetailResult {
        try {
            const session = await auth();

            if (!session || !hasPermission(session.user, 'user', 'update')) {
                return {
                    status: Status.Err,
                    err: { _form: 'You have no authorization..!' },
                };
            }

            const validatedForm = userDetailSchema.safeParse(formData);

            if (!validatedForm.success) {
                return {
                    status: Status.Err,
                    err: z.flattenError(validatedForm.error).fieldErrors,
                };
            }

            await db.user.update({
                where: { id: session.user.id },
                data: validatedForm.data,
            });

            if (session.user.role === 'DOCTOR') {
                revalidatePath('/doctor');
                revalidatePath(`/doctor/${session.user.id}`);
            }

            return { status: Status.Ok, data: {} };
        } catch (error) {
            return {
                status: Status.Err,
                err: { _form: 'Something went wrong...!' },
            };
        }
    }

    static async updateProfilePicture(
        formData: FormData,
    ): UpdateProfilePictureResult {
        try {
            const session = await auth();

            if (!session || !hasPermission(session.user, 'user', 'update')) {
                return {
                    status: Status.Err,
                    err: 'You have no authorization..!',
                };
            }

            const validatedPicture = profilePictureSchema.safeParse(
                formData.get('profilePicture'),
            );

            if (!validatedPicture.success) {
                return {
                    status: Status.Err,
                    err: z
                        .flattenError(validatedPicture.error)
                        .formErrors.join(' '),
                };
            }

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

            if (!uploadImageResponse.upload) {
                return {
                    status: Status.Err,
                    err: uploadImageResponse.error,
                };
            }

            await db.user.update({
                where: {
                    id: session.user.id,
                },
                data: {
                    imageUrl: uploadImageResponse.data.secure_url,
                },
            });

            // TODO: will delete after doctor page new design
            if (session.user.role === 'DOCTOR') revalidatePath('/doctor');

            return { status: Status.Ok, data: {} };
        } catch (error) {
            return { status: Status.Err, err: 'Something went wrong..!' };
        }
    }
}
