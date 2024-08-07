import * as z from 'zod';
import languages from '@/languages.json';

export const userDetailSchema = z
    .object({
        name: z
            .string()
            .min(1, 'Name required')
            .max(30, 'Max character Count is 30..!'),
        surname: z
            .string()
            .min(1, 'Surname required')
            .max(30, 'Max character Count is 30..!'),
        description: z.string(),
        phoneNumber: z
            .string()
            .regex(
                new RegExp(
                    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
                ),
                'Enter valid phone number',
            ),
        languages: z
            .string()
            .array()
            .refine((value) =>
                value.every((lang) =>
                    languages.find((data) => data.code === lang),
                ),
            ),
        imageUrl: z.string().url('Enter exists url..!'),
    })
    .partial();
