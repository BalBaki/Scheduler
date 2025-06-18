import { z } from 'zod/v4';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
import languages from '@/languages.json';

export const profileImageSchema = z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Max image size is 5 MB')
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        `Only supported ${ACCEPTED_IMAGE_TYPES.map((type) => type.split('/')[1] || '').join(', ')}`,
    );

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
