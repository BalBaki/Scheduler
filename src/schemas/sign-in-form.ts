import * as z from 'zod';

export const signInSchema = z.object({
    email: z.string().email('Enter valid email'),
    password: z.string().min(8, 'Password must contain at least 8 character(s)'),
});
