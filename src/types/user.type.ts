import { z } from 'zod/v4';
import { userDetailSchema } from '@/schemas';
import type { Prisma } from '@prisma/client';
import type { AsyncResult, BaseError, FormState } from './common.type';

type UpdateUserDetail = {};
type UpdateUserDetailError = FormState<UserDetailForm>;

type UpdateProfilePicture = {};
type UpdateProfilePictureError = BaseError;

export type DoctorWithValidAppointments = Prisma.UserGetPayload<{
    omit: { password: true };
    include: { doctorAppointments: true };
}> | null;
type DoctorWithValidAppointmentsError = BaseError;

type ApprovedDoctors = Prisma.UserGetPayload<{ omit: { password: true } }>[];
type ApprovedDoctorsError = BaseError;

export type UpdateUserDetailResult = AsyncResult<
    UpdateUserDetail,
    UpdateUserDetailError
>;
export type UpdateProfilePictureResult = AsyncResult<
    UpdateProfilePicture,
    UpdateProfilePictureError
>;
export type DoctorWithValidAppointmentsResult = AsyncResult<
    DoctorWithValidAppointments,
    DoctorWithValidAppointmentsError
>;
export type ApprovedDoctorsResult = AsyncResult<
    ApprovedDoctors,
    ApprovedDoctorsError
>;
export type UserDetailForm = z.infer<typeof userDetailSchema>;
