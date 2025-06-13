import { z } from 'zod/v4';

export const usersSearchParamsSchema = z.object({
    query: z
        .string()
        .default('')
        .transform((val) => val.toLowerCase()),
    limit: z.coerce.number().optional(),
    page: z.coerce.number().default(1),
    status: z
        .enum(['WAITING', 'APPROVED', 'DECLINED', 'ALL'])
        .default('WAITING'),
});

export const userFilterSchema = z.object({
    query: z.string().transform((val) => val.toLowerCase()),
    status: z.enum(['WAITING', 'APPROVED', 'DECLINED', 'ALL']),
});

export const changeUserStatusSchema = z.object({
    id: z.string().min(1),
    status: z.enum(['WAITING', 'APPROVED', 'DECLINED']),
});
