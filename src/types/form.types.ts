import * as z from 'zod';
import {
    addAppointmentSchema,
    contactUsFormSchema,
    feedbackFilterSchema,
    signInSchema,
    signUpSchema,
    userDetailSchema,
    userFilterSchema,
} from '@/schemas';

export type AddAppointmentForm = z.infer<typeof addAppointmentSchema>;
export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
export type UserDetailForm = z.infer<typeof userDetailSchema>;
export type ContactUsForm = z.infer<typeof contactUsFormSchema>;
export type UserFilterForm = z.infer<typeof userFilterSchema>;
export type FeedbackFilterForm = z.infer<typeof feedbackFilterSchema>;
