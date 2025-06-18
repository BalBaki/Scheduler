import 'server-only';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { z } from 'zod/v4';
import { CloudinaryService } from './cloudinary.service';
import { auth } from '@/auth';
import { Status } from '@/enums';
import { extractImagePublicId } from '@/lib/extract-image-public-id';
import { hasPermission } from '@/lib/permissions';
import { profileImageSchema, userDetailSchema } from '@/schemas';
import db from '@/services/db.service';
import type {
    ApprovedDoctorsResult,
    DoctorWithValidAppointmentsResult,
    GetDoctorByIdResult,
    UpdateProfilePictureResult,
    UpdateUserDetailResult,
    UserDetailForm,
} from '@/types';

export class UserService {
    static getUserByEmail = async (email: string) => {
        return await db.user.findFirst({
            where: { email },
        });
    };

    static getDoctorById = async (id: string): GetDoctorByIdResult => {
        try {
            return {
                status: Status.Ok,
                data: await db.user.findUnique({
                    omit: { password: true },
                    where: { id },
                }),
            };
        } catch (error) {
            return {
                status: Status.Err,
                err: 'Something went wrong..!',
            };
        }
    };

    static getDoctorWithValidAppointmentsById = cache(
        async (id: string): DoctorWithValidAppointmentsResult => {
            try {
                return {
                    status: Status.Ok,
                    data: await db.user.findUnique({
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
                    }),
                };
            } catch (error) {
                return {
                    status: Status.Err,
                    err: 'Something went wrong..!',
                };
            }
        },
    );

    static getApprovedDoctors = async (): ApprovedDoctorsResult => {
        try {
            return {
                status: Status.Ok,
                data: await db.user.findMany({
                    omit: {
                        password: true,
                    },
                    where: {
                        AND: [{ role: 'DOCTOR', status: 'APPROVED' }],
                    },
                }),
            };
        } catch (error) {
            return {
                status: Status.Err,
                err: 'Something went wrong..!',
            };
        }
    };

    static updateDetail = async (
        formData: UserDetailForm,
    ): UpdateUserDetailResult => {
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
    };

    static updateProfilePicture = async (
        formData: FormData,
    ): UpdateProfilePictureResult => {
        try {
            const session = await auth();

            if (!session || !hasPermission(session.user, 'user', 'update')) {
                return {
                    status: Status.Err,
                    err: 'You have no authorization..!',
                };
            }

            const validatedPicture = profileImageSchema.safeParse(
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

            const uploadImageResult = await CloudinaryService.uploadFile(
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

            if (uploadImageResult.status === Status.Err) {
                return uploadImageResult;
            }

            await db.user.update({
                where: {
                    id: session.user.id,
                },
                data: {
                    imageUrl: uploadImageResult.data.secure_url,
                },
            });

            // TODO: will delete after doctor page new design
            if (session.user.role === 'DOCTOR') revalidatePath('/doctor');

            return { status: Status.Ok, data: {} };
        } catch (error) {
            return { status: Status.Err, err: 'Something went wrong..!' };
        }
    };

    static updateProfileBanner = async (
        formData: FormData,
    ): UpdateProfilePictureResult => {
        try {
            const session = await auth();

            if (
                !session ||
                !hasPermission(session.user, 'user', 'moreDetail')
            ) {
                return {
                    status: Status.Err,
                    err: 'You have no authorization..!',
                };
            }

            const validatedPicture = profileImageSchema.safeParse(
                formData.get('bannerPicture'),
            );

            if (!validatedPicture.success) {
                return {
                    status: Status.Err,
                    err: z
                        .flattenError(validatedPicture.error)
                        .formErrors.join(' '),
                };
            }

            const uploadImageResult = await CloudinaryService.uploadFile(
                validatedPicture.data,
                {
                    folder: 'banner',
                    resource_type: 'image',
                    filename_override: session.user.id,
                    use_filename: true,
                    ...(session.user.bannerUrl && {
                        overwrite: true,
                        public_id: extractImagePublicId(session.user.bannerUrl),
                    }),
                },
            );

            if (uploadImageResult.status === Status.Err) {
                return uploadImageResult;
            }

            await db.user.update({
                where: {
                    id: session.user.id,
                },
                data: {
                    bannerUrl: uploadImageResult.data.secure_url,
                },
            });

            revalidatePath(`/doctor/${session.user.id}`);

            return { status: Status.Ok, data: {} };
        } catch (error) {
            return { status: Status.Err, err: 'Something went wrong..!' };
        }
    };
}
