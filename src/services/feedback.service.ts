import 'server-only';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { z } from 'zod/v4';
import db from './db.service';
import { Status } from '@/enums';
import { contactUsFormSchema } from '@/schemas';
import type { ContactUsForm, CreateFeedbackResult } from '@/types';

export class FeedbackService {
    static getCount = cache(async (email?: string): Promise<number> => {
        return await db.feedback.count({
            where: {
                ...(email && {
                    email: { contains: email },
                }),
            },
        });
    });

    static async create(form: ContactUsForm): CreateFeedbackResult {
        try {
            const validatedForm = contactUsFormSchema.safeParse(form);

            if (!validatedForm.success) {
                return {
                    status: Status.Err,
                    err: z.flattenError(validatedForm.error).fieldErrors,
                };
            }

            await db.feedback.create({
                data: validatedForm.data,
            });

            revalidatePath('/dashboard/feedback');

            return { status: Status.Ok, data: {} };
        } catch (error) {
            return {
                status: Status.Err,
                err: { _form: 'Something went wrong..!' },
            };
        }
    }
}
