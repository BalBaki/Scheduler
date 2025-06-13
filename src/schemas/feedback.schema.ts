import { z } from 'zod/v4';

export const contactUsFormSchema = z.object({
    email: z.email(),
    message: z.string().min(1).max(250),
});

export const feedbackFilterSchema = z.object({
    query: z.string().transform((val) => val.toLowerCase()),
});

export const feedbackSearchParamsSchema = z.object({
    query: z
        .string()
        .default('')
        .transform((val) => val.toLowerCase()),
    limit: z.coerce.number().optional(),
    page: z.coerce.number().default(1),
});
