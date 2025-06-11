import { z } from 'zod/v4';

export const changeUserStatusSchema = z.object({
    id: z.string().min(1),
    status: z.enum(['WAITING', 'APPROVED', 'DECLINED']),
});
