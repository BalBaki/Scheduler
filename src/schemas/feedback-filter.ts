import * as z from 'zod';

export const feedbackFilterSchema = z.object({
    query: z.string().transform((val) => val.toLowerCase()),
});
