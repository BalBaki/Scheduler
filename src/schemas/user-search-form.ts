import * as z from 'zod';

export const userSearchSchema = z.object({
    term: z.string().min(1),
});
