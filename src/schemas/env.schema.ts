import { z } from 'zod/v4';
import { DEFAULT_LOCAL_URL } from '@/constants';

export const envSchema = z
    .object({
        DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
        DIRECT_DATABASE_URL: z
            .string()
            .min(1, 'DIRECT_DATABASE_URL is required'),
        AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),
        PASSWORD_SECRET: z.string().min(1, 'PASSWORD_SECRET is required'),
        CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
        CLOUDINARY_API_SECRET: z
            .string()
            .min(1, 'CLOUDINARY_API_SECRET is required'),
        NODE_ENV: z
            .enum(['production', 'development', 'test'])
            .default('development'),
        SITE_URL: z
            .url()
            .optional()
            .default(DEFAULT_LOCAL_URL)
            .transform((value) => (value.endsWith('/') ? value : `${value}/`)),
    })
    .refine(
        ({ NODE_ENV, SITE_URL }) => {
            if (NODE_ENV === 'production')
                return SITE_URL !== DEFAULT_LOCAL_URL;

            return true;
        },
        {
            message:
                'A valid SITE_URL must be provided in production environment',
            path: ['SITE_URL'],
        },
    );
