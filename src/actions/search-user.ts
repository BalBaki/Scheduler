'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { userSearchSchema } from '@/schemas';
import type { FormState, UserSearchForm } from '@/types';

export const searchUser = async (
    formData: UserSearchForm,
): Promise<FormState<'search', UserSearchForm>> => {
    const headerList = headers();
    const validatedForm = userSearchSchema.safeParse(formData);

    if (!validatedForm.success)
        return {
            search: false,
            errors: validatedForm.error.flatten().fieldErrors,
        };

    const location = new URL(headerList.get('referer') || '');

    redirect(
        `${location.pathname}?${new URLSearchParams({
            term: validatedForm.data.term,
        })}`,
    );
};
