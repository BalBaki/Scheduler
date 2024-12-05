import * as z from 'zod';
import {
    addAppointmentClientSchema,
    addAppointmentServerSchema,
    contactUsFormSchema,
    feedbackFilterSchema,
    signInSchema,
    signUpSchema,
    userDetailSchema,
    userFilterSchema,
} from '@/schemas';

export type AddAppointmentServerForm = z.infer<
    typeof addAppointmentServerSchema
>;
export type AddAppointmentClientForm = z.infer<
    typeof addAppointmentClientSchema
>;
export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
export type UserDetailForm = z.infer<typeof userDetailSchema>;
export type ContactUsForm = z.infer<typeof contactUsFormSchema>;
export type UserFilterForm = z.infer<typeof userFilterSchema>;
export type FeedbackFilterForm = z.infer<typeof feedbackFilterSchema>;
