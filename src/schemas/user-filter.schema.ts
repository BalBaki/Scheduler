import { z } from 'zod/v4';

export const userFilterSchema = z.object({
    query: z.string().transform((val) => val.toLowerCase()),
    status: z.enum(['WAITING', 'APPROVED', 'DECLINED', 'ALL']),
});
