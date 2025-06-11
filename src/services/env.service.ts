import 'server-only';
import { z } from 'zod/v4';
import { DEFAULT_LOCAL_URL } from '@/constants';
import { envSchema } from '@/schemas';
import type { Env } from '@/types';

class EnvService {
    private static instance: EnvService;
    private env: Readonly<Env>;

    private constructor() {
        try {
            this.env = Object.freeze(envSchema.parse(process.env));
        } catch (error) {
            if (error instanceof z.ZodError) {
                const missingVars = error.issues.map((issue) =>
                    issue.path.join('.'),
                );

                throw new Error(
                    `Invalid environment variables: ${missingVars.join(', ')}\n` +
                        'Please check your .env file and make sure all required variables are set correctly.',
                );
            }

            throw error;
        }
    }

    static getInstance() {
        if (!EnvService.instance) EnvService.instance = new EnvService();

        return EnvService.instance;
    }

    get<T extends keyof Env>(key: T): Env[T] {
        return this.env[key];
    }

    get isDevelopment() {
        return this.get('NODE_ENV') === 'development';
    }

    get isProduction() {
        return this.get('NODE_ENV') === 'production';
    }

    get isTest() {
        return this.get('NODE_ENV') === 'test';
    }

    get siteURL() {
        return this.isProduction ? this.get('SITE_URL') : DEFAULT_LOCAL_URL;
    }

    get databaseUrl() {
        return this.get('DATABASE_URL');
    }

    get directDatabaseUrl() {
        return this.get('DIRECT_DATABASE_URL');
    }

    get authSecret() {
        return this.get('AUTH_SECRET');
    }

    get passwordSecret() {
        return this.get('PASSWORD_SECRET');
    }

    get cloudinaryApiKey() {
        return this.get('CLOUDINARY_API_KEY');
    }

    get cloudinaryApiSecret() {
        return this.get('CLOUDINARY_API_SECRET');
    }

    get nodeEnv() {
        return this.get('NODE_ENV');
    }
}

export const env = EnvService.getInstance();
