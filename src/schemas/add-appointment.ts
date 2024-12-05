import * as z from 'zod';

export const addAppointmentClientSchema = z.object({
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

export const addAppointmentServerSchema = z.object({
    title: z.string().min(1, 'Title Required'),
    start: z.string().datetime(),
    end: z.string().datetime(),
});
