import { z } from 'zod/v4';

export const createAppointmentClientSchema = z.object({
    title: z.string().min(1, 'Title Required'),
    start: z
        .string()
        .regex(
            new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
            'Enter Valid Start Time',
        ),
    end: z
        .string()
        .regex(
            new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
            'Enter Valid End Time',
        ),
});

export const createAppointmentServerSchema = z.object({
    title: z.string().min(1, 'Title Required'),
    start: z.iso.datetime(),
    end: z.iso.datetime(),
});

export const removeAppointmentSchema = z.string().min(1);
export const cancelAppointmentSchema = z.string().min(1);
export const bookAppointmentSchema = z.string().min(1);
