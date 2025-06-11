import { z } from 'zod/v4';
import { envSchema } from '@/schemas';

export type Env = z.infer<typeof envSchema>;
