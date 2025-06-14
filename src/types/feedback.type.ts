import { z } from 'zod/v4';
import {
    contactUsFormSchema,
    feedbackFilterSchema,
    feedbackSearchParamsSchema,
} from '@/schemas';
import type { Feedback } from '@prisma/client';
import type {
    AsyncResult,
    BaseError,
    FormState,
    PaginatedDataParams,
} from './common.type';

type CreateFeedback = {};
type CreateFeedbackError = FormState<ContactUsForm>;

type GetPaginatedFeedbacks = {
    feedbacks: Feedback[];
    totalFeedbackCount: number;
};
type GetPaginatedFeedbacksError = BaseError;

export interface GetPaginatedFeedbacksParams extends PaginatedDataParams {}
export type CreateFeedbackResult = AsyncResult<
    CreateFeedback,
    CreateFeedbackError
>;
export type GetPaginatedFeedbacksResult = AsyncResult<
    GetPaginatedFeedbacks,
    GetPaginatedFeedbacksError
>;
export type FeedbackSearchParams = z.infer<typeof feedbackSearchParamsSchema>;
export type ContactUsForm = z.infer<typeof contactUsFormSchema>;
export type FeedbackFilterForm = z.infer<typeof feedbackFilterSchema>;
