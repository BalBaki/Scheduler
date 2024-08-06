import * as z from 'zod';

export const userFilterSchema = z.object({
    query: z.string().transform((val) => val.toLowerCase()),
    status: z
        .enum(['WAITING', 'APPROVED', 'DECLINED', 'ALL'])
        .default('WAITING'),
});
