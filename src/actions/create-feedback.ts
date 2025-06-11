'use server';

import { FeedbackService } from '@/services/feedback.service';
import type { ContactUsForm, CreateFeedbackResult } from '@/types';

export const createFeedBack = async (
    form: ContactUsForm,
): CreateFeedbackResult => {
    return FeedbackService.create(form);
};
