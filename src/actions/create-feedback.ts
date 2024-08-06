'use server';

import { revalidatePath } from 'next/cache';
import db from '@/db';
import { contactUsFormSchema } from '@/schemas';
import type { ContactUsForm, FormState } from '@/types';

export const createFeedBack = async (
    form: ContactUsForm,
): Promise<FormState<'submit', ContactUsForm>> => {
    try {
        const validatedForm = contactUsFormSchema.safeParse(form);

        if (!validatedForm.success)
            return {
                submit: false,
                errors: validatedForm.error.flatten().fieldErrors,
            };

        await db.feedback.create({
            data: validatedForm.data,
        });

        revalidatePath('/dashboard/feedback');

        return { submit: true };
    } catch (error) {
        return { submit: false, errors: { _form: 'Something went wrong..!' } };
    }
};
