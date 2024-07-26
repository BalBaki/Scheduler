import * as z from 'zod';

export const signUpSchema = z
    .object({
        name: z.string().min(1, 'Name required'),
        surname: z.string().min(1, 'Surname required'),
        email: z.string().email('Enter valid email'),
        password: z
            .string()
            .min(8, 'Password must contain at least 8 character(s)'),
        confirmPassword: z
            .string()
            .min(8, 'Confirm Password must contain at least 8 character(s)'),
        phoneNumber: z
            .string()
            .regex(
                new RegExp(
                    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
                ),
                'Enter valid phone number',
            ),
        role: z.enum(['DOCTOR', 'PATIENT']),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });
