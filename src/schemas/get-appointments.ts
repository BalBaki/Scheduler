import * as z from 'zod';

export const getAppointmentsSchema = z.object({
    userId: z.string(),
    userRole: z.enum(['DOCTOR', 'PATIENT', 'ADMIN']),
});
