import 'server-only';
import { revalidatePath } from 'next/cache';
import { z } from 'zod/v4';
import db from './db.service';
import { auth } from '@/auth';
import { Status } from '@/enums';
import { hasPermission } from '@/lib/permissions';
import {
    createAppointmentServerSchema,
    removeAppointmentSchema,
} from '@/schemas';
import type {
    AppointmentOverlap,
    BookAppointmentPayload,
    BookAppointmentResult,
    CancelAppointmentPayload,
    CancelAppointmentResult,
    CreateAppointmentResult,
    CreateAppointmentServerForm,
    GetAppointmentsResult,
    RemoveAppointmentPayload,
    RemoveAppointmentResult,
} from '@/types';

export class AppointmentService {
    static async create(
        form: CreateAppointmentServerForm,
    ): CreateAppointmentResult {
        try {
            const session = await auth();

            if (
                !session ||
                !hasPermission(session.user, 'appointment', 'create')
            ) {
                return {
                    status: Status.Err,
                    err: { _form: 'You have no authorization..!' },
                };
            }

            const validatedForm = createAppointmentServerSchema.safeParse(form);
            if (!validatedForm.success) {
                return {
                    status: Status.Err,
                    err: z.flattenError(validatedForm.error).fieldErrors,
                };
            }

            const start = new Date(validatedForm.data.start);
            const end = new Date(validatedForm.data.end);

            if (start >= end) {
                return {
                    status: Status.Err,
                    err: { _form: 'Start Hour cant bigger than end hour..!' },
                };
            }

            if (start < new Date()) {
                return {
                    status: Status.Err,
                    err: { _form: 'Start Time is Past..!' },
                };
            }

            const isOverlap = await this.checkAppointmentOverlap({
                userId: session.user.id,
                userRole: session.user.role,
                startDate: start,
                endDate: end,
            });

            if (isOverlap) {
                return {
                    status: Status.Err,
                    err: {
                        _form: 'This event hours are overlaping another event..!',
                    },
                };
            }

            await db.appointment.create({
                data: {
                    title: validatedForm.data.title,
                    start,
                    end,
                    doctorId: session.user.id,
                },
            });

            revalidatePath(`/doctor/${session.user.id}`);

            return { status: Status.Ok, data: {} };
        } catch (error) {
            return {
                status: Status.Err,
                err: {
                    _form:
                        error instanceof Error
                            ? error.message
                            : 'Something went wrong...!',
                },
            };
        }
    }

    static async remove(
        appointmentId: RemoveAppointmentPayload,
    ): RemoveAppointmentResult {
        try {
            const validatedId =
                removeAppointmentSchema.safeParse(appointmentId);

            if (!validatedId.success) {
                return {
                    status: Status.Err,
                    err: z.flattenError(validatedId.error).fieldErrors,
                };
            }

            const session = await auth();
            const appointment = await db.appointment.findFirst({
                where: { id: validatedId.data, doctorId: session?.user.id },
            });

            if (!appointment)
                return { status: Status.Err, err: 'Not exists appointment..!' };

            if (
                !session ||
                !hasPermission(session.user, 'appointment', 'delete') ||
                appointment.doctorId !== session.user.id
            ) {
                return {
                    status: Status.Err,
                    err: 'You have no authorization..!',
                };
            }

            if (appointment.patientId) {
                return {
                    status: Status.Err,
                    err: 'You cannot remove this event. It booked by a patient..!',
                };
            }

            if (new Date(appointment.start) <= new Date()) {
                return {
                    status: Status.Err,
                    err: 'You cannot remove pasted event.',
                };
            }

            await db.appointment.delete({
                where: {
                    id: appointment.id,
                    doctorId: session.user.id,
                },
            });

            revalidatePath(`/doctor/${session.user.id}`);

            return { status: Status.Ok, data: {} };
        } catch {
            return { status: Status.Err, err: 'Something went wrong..!' };
        }
    }

    static async cancel(
        appointmentId: CancelAppointmentPayload,
    ): CancelAppointmentResult {
        try {
            const validatedId =
                removeAppointmentSchema.safeParse(appointmentId);

            if (!validatedId.success) {
                return {
                    status: Status.Err,
                    err: z.flattenError(validatedId.error).fieldErrors,
                };
            }

            const session = await auth();
            const appointment = await db.appointment.findFirst({
                where: { id: validatedId.data, patientId: session?.user.id },
            });

            if (!appointment)
                return { status: Status.Err, err: 'Not exists appointment..!' };

            if (
                !session ||
                !hasPermission(session.user, 'appointment', 'cancel') ||
                appointment.patientId !== session.user.id
            ) {
                return {
                    status: Status.Err,
                    err: 'You have no authorization..!',
                };
            }

            await db.appointment.update({
                where: {
                    id: appointment.id,
                    patientId: session.user.id,
                },
                data: {
                    patientId: null,
                },
            });

            revalidatePath(`/doctor/${appointment.doctorId}`);

            return { status: Status.Ok, data: {} };
        } catch {
            return { status: Status.Err, err: 'Something went wrong..!' };
        }
    }

    static async book(
        appointmentId: BookAppointmentPayload,
    ): BookAppointmentResult {
        try {
            const validatedId =
                removeAppointmentSchema.safeParse(appointmentId);

            if (!validatedId.success) {
                return {
                    status: Status.Err,
                    err: z.flattenError(validatedId.error).fieldErrors,
                };
            }

            const session = await auth();

            if (
                !session ||
                !hasPermission(session.user, 'appointment', 'book')
            ) {
                return {
                    status: Status.Err,
                    err: 'You have no authorization..!',
                };
            }

            const appointment = await db.appointment.findFirst({
                where: { id: validatedId.data },
            });

            if (!appointment)
                return { status: Status.Err, err: 'Not exists appointment..!' };

            if (appointment.patientId)
                return {
                    status: Status.Err,
                    err: 'This appointment has been bookmarked by another user..!',
                };

            if (appointment.start < new Date())
                return { status: Status.Err, err: 'Outdated appointment..!' };

            const isOverlap = await this.checkAppointmentOverlap({
                userId: session.user.id,
                userRole: session.user.role,
                startDate: appointment.start,
                endDate: appointment.end,
            });

            if (isOverlap)
                return {
                    status: Status.Err,
                    err: 'This event hours are overlaping another event..!',
                };

            await db.appointment.update({
                where: { id: validatedId.data },
                data: { patientId: session.user.id },
            });

            revalidatePath(`/doctor/${appointment.doctorId}`);

            return { status: Status.Ok, data: {} };
        } catch {
            return { status: Status.Err, err: 'Something went wrong..!' };
        }
    }

    static async get(): GetAppointmentsResult {
        try {
            const session = await auth();

            if (!session)
                return {
                    status: Status.Err,
                    err: 'You have no authorization..!',
                };

            const appointments = await db.appointment.findMany({
                where: {
                    [session.user.role === 'DOCTOR' ? 'doctorId' : 'patientId']:
                        session.user.id,
                },
                include: {
                    [session.user.role === 'DOCTOR' ? 'patient' : 'doctor']: {
                        omit: {
                            password: true,
                        },
                    },
                },
            });

            return { status: Status.Ok, data: { appointments } };
        } catch (error) {
            return {
                status: Status.Err,
                err: 'Something went wrong..!',
            };
        }
    }

    static async checkAppointmentOverlap({
        userId,
        userRole,
        startDate,
        endDate,
    }: AppointmentOverlap): Promise<boolean> {
        return !!(await db.appointment.findFirst({
            where: {
                AND: {
                    [userRole === 'DOCTOR' ? 'doctorId' : 'patientId']: userId,
                    OR: [
                        {
                            AND: {
                                start: { lte: startDate },
                                end: { gt: startDate },
                            },
                        },
                        {
                            AND: {
                                start: { lt: endDate },
                                end: { gte: endDate },
                            },
                        },
                        {
                            AND: {
                                start: { gte: startDate },
                                end: { lte: endDate },
                            },
                        },
                        {
                            AND: {
                                start: { lt: startDate },
                                end: { gt: endDate },
                            },
                        },
                    ],
                },
            },
        }));
    }
}
