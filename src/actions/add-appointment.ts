'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import db from '@/db';
import { checkAppointmentOverlap } from '@/lib/check-appointment-overlap';
import { hasPermission } from '@/lib/permissions';
import { addAppointmentServerSchema } from '@/schemas';
import type { AddAppointmentServerForm, FormState } from '@/types';

export const addAppointment = async (
    form: AddAppointmentServerForm,
): Promise<FormState<'add', AddAppointmentServerForm>> => {
    try {
        const session = await auth();

        if (!session || !hasPermission(session.user, 'appointment', 'create'))
            return {
                add: false,
                errors: { _form: 'You have no authorization..!' },
            };

        const validatedForm = addAppointmentServerSchema.safeParse(form);

        if (!validatedForm.success)
            return {
                add: false,
                errors: validatedForm.error.flatten().fieldErrors,
            };

        const start = new Date(validatedForm.data.start);
        const end = new Date(validatedForm.data.end);

        if (start >= end)
            return {
                add: false,
                errors: { _form: 'Start Hour cant bigger than end hour..!' },
            };
        if (start < new Date())
            return { add: false, errors: { _form: 'Start Time is Past..!' } };

        const isAppointmentOverlap = await checkAppointmentOverlap({
            userId: session.user.id,
            userRole: session.user.role,
            startDate: start,
            endDate: end,
        });

        if (isAppointmentOverlap)
            return {
                add: false,
                errors: {
                    _form: 'This event hours are overlaping another event..!',
                },
            };

        await db.appointment.create({
            data: {
                title: validatedForm.data.title,
                start,
                end,
                doctorId: session.user.id,
            },
        });

        revalidatePath(`/doctor/${session.user.id}`);

        return { add: true };
    } catch (error) {
        return {
            add: false,
            errors: {
                _form:
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong...!',
            },
        };
    }
};
