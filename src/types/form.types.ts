import * as z from 'zod';
import { addAppointmentSchema } from '@/schemas';
import { signInSchema } from '@/schemas';
import { signUpSchema } from '@/schemas';

export type AddAppointmentForm = z.infer<typeof addAppointmentSchema>;
export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
