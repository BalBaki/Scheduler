import * as z from 'zod';

export const addAppointmentSchema = z.object({
    title: z.string().min(1, 'Title Required'),
    date: z.string().date(),
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
