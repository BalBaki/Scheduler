'use server';

import db from '@/db';
import { addAppointmentSchema } from '@/schemas';
import type { AddAppointmentForm, FormState } from '@/types';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { checkAppointmentOverlap } from '@/lib/check-appointment-overlap';

export const addAppointment = async (form: AddAppointmentForm): Promise<FormState<'add', AddAppointmentForm>> => {
    try {
        const session = await auth();

        if (!session?.user) return { add: false, errors: { _form: 'No sign in...' } };
        if (session.user.role !== 'DOCTOR') return { add: false, errors: { _form: 'You have no authorization....' } };

        const validatedForm = addAppointmentSchema.safeParse(form);

        if (!validatedForm.success) return { add: false, errors: validatedForm.error.flatten().fieldErrors };

        const start = new Date(`${validatedForm.data.date} ${validatedForm.data.start}`);
        const end = new Date(`${validatedForm.data.date} ${validatedForm.data.end}`);

        if (start >= end) return { add: false, errors: { _form: 'Start Hour cant bigger than end hour..!' } };
        if (start < new Date()) return { add: false, errors: { _form: 'Start Time is Past..!' } };

        const isAppointmentOverlap = await checkAppointmentOverlap({
            userId: session.user.id,
            userRole: session.user.role,
            startDate: start,
            endDate: end,
        });

        if (isAppointmentOverlap)
            return { add: false, errors: { _form: 'This event hours are overlaping another event..!' } };

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
        return { add: false, errors: { _form: error instanceof Error ? error.message : 'Something went wrong...!' } };
    }
};
