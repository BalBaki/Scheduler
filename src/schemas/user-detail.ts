import * as z from 'zod';

const languages = ['tr', 'en', 'fr', 'esp'];

export const userDetail = z.object({
    description: z.string().max(250, 'Max character Count is 250..!').optional(),
    languages: z
        .string()
        .array()
        .refine((value) => value.some((lang) => languages.includes(lang)))
        .optional(),
    imageUrl: z.string().url('Enter exists url..!').optional(),
});
