import { z } from 'zod/v4';

export const feedbackFilterSchema = z.object({
    query: z.string().transform((val) => val.toLowerCase()),
});
