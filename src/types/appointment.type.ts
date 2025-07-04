import { z } from 'zod/v4';
import {
    bookAppointmentSchema,
    cancelAppointmentSchema,
    createAppointmentClientSchema,
    createAppointmentServerSchema,
    removeAppointmentSchema,
} from '@/schemas';
import type { Appointment, Roles } from '@prisma/client';
import type { AsyncResult, BaseError, FormState } from './common.type';
import type { UserWithoutPassword } from './user-without-password';

type CreateAppointment = {};
type CreateAppointmentError = FormState<CreateAppointmentServerForm>;

type RemoveAppointment = {};
type RemoveAppointmentError = BaseError;

type CancelAppointment = {};
type CancelAppointmentError = BaseError;

type BookAppointment = {};
type BookAppointmentError = BaseError;

type GetAppointments = {
    appointments: (Appointment & {
        patient?: UserWithoutPassword;
        doctor?: UserWithoutPassword;
    })[];
};
type GetAppointmentsError = BaseError;

type GetValidDoctorAppointmentsById = Appointment[];
type GetValidDoctorAppointmentsByIdError = string;

export type CreateAppointmentResult = AsyncResult<
    CreateAppointment,
    CreateAppointmentError
>;
export type RemoveAppointmentResult = AsyncResult<
    RemoveAppointment,
    RemoveAppointmentError
>;
export type CancelAppointmentResult = AsyncResult<
    CancelAppointment,
    CancelAppointmentError
>;
export type BookAppointmentResult = AsyncResult<
    BookAppointment,
    BookAppointmentError
>;
export type GetAppointmentsResult = AsyncResult<
    GetAppointments,
    GetAppointmentsError
>;
export type GetValidDoctorAppointmentsByIdResult = AsyncResult<
    GetValidDoctorAppointmentsById,
    GetValidDoctorAppointmentsByIdError
>;

export interface AppointmentOverlap {
    userId: string;
    userRole: Roles;
    startDate: Date;
    endDate: Date;
}

export type CreateAppointmentServerForm = z.infer<
    typeof createAppointmentServerSchema
>;
export type CreateAppointmentClientForm = z.infer<
    typeof createAppointmentClientSchema
>;
export type RemoveAppointmentPayload = z.infer<typeof removeAppointmentSchema>;
export type CancelAppointmentPayload = z.infer<typeof cancelAppointmentSchema>;
export type BookAppointmentPayload = z.infer<typeof bookAppointmentSchema>;
