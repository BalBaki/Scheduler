import * as z from 'zod';
import languages from '@/languages.json';

export const userDetail = z.object({
    description: z.string().max(250, 'Max character Count is 250..!').optional(),
    languages: z
        .string()
        .array()
        .refine((value) => value.every((lang) => languages.find((data) => data.code === lang)))
        .optional(),
    imageUrl: z.string().url('Enter exists url..!').optional(),
});
