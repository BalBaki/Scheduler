import { z } from "zod/v4";

export const contactUsFormSchema = z.object({
    email: z.email(),
    message: z.string().min(1).max(250),
});
