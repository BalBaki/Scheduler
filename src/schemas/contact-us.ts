import * as zod from 'zod';

export const contactUsFormSchema = zod.object({
    email: zod.string().email(),
    message: zod.string().min(1).max(250),
});
