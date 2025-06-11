import { AsyncResult, FormState } from './common.type';
import { ContactUsForm } from './form.type';

type CreateFeedback = {};
type CreateFeedbackError = FormState<ContactUsForm>;

export type CreateFeedbackResult = AsyncResult<
    CreateFeedback,
    CreateFeedbackError
>;
