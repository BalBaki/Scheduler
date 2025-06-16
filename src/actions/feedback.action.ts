'use server';

import { FeedbackService } from '@/services/feedback.service';
import type { CreateFeedbackResult, FeedbackForm } from '@/types';

export const createFeedBack = async (
    form: FeedbackForm,
): CreateFeedbackResult => {
    return FeedbackService.create(form);
};
