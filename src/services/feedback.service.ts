import 'server-only';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { z } from 'zod/v4';
import db from './db.service';
import { Status } from '@/enums';
import { feedbackFormSchema } from '@/schemas';
import type {
    CreateFeedbackResult,
    FeedbackForm,
    GetPaginatedFeedbacksParams,
    GetPaginatedFeedbacksResult,
} from '@/types';

export class FeedbackService {
    static create = async (form: FeedbackForm): CreateFeedbackResult => {
        try {
            const validatedForm = feedbackFormSchema.safeParse(form);

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
    };

    static getCount = cache(async (email?: string): Promise<number> => {
        return db.feedback.count({
            where: {
                ...(email && {
                    email: { contains: email },
                }),
            },
        });
    });

    static getPaginatedFeedbacks = async ({
        limit = 20,
        page,
        query,
    }: GetPaginatedFeedbacksParams): GetPaginatedFeedbacksResult => {
        try {
            const feedCount = await FeedbackService.getCount(query);
            const feedbacks = await db.feedback.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                where: {
                    ...(query && {
                        email: { contains: query },
                    }),
                },
                skip: (page - 1) * limit,
                take: limit,
            });

            return {
                status: Status.Ok,
                data: {
                    feedbacks,
                    totalFeedbackCount: feedCount,
                },
            };
        } catch (error) {
            return {
                status: Status.Err,
                err: 'Something went wrong..!',
            };
        }
    };
}
