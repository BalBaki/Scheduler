'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import db from '@/db';
import { checkAppointmentOverlap } from '@/lib/check-appointment-overlap';
import type { ResultWithError } from '@/types';

export const bookAppointment = async (
    id: string,
): Promise<ResultWithError<'book'>> => {
    try {
        const session = await auth();

        if (!session || session.user.status !== 'APPROVED')
            throw new Error('You have no authorization..!');

        const appointment = await db.appointment.findFirst({
            where: {
                id,
            },
        });

        if (!appointment)
            return { book: false, error: 'Not exists appointment..!' };
        if (appointment.patientId)
            return {
                book: false,
                error: 'This appointment has been bookmarked by another user..!',
            };
        if (appointment.start < new Date())
            return { book: false, error: 'Outdated appointment..!' };
        if (session.user.role === 'DOCTOR')
            return { book: false, error: "You can't book this event..!" };

        const isAppointmentOverlap = await checkAppointmentOverlap({
            userId: session.user.id,
            userRole: session.user.role,
            startDate: appointment.start,
            endDate: appointment.end,
        });

        if (isAppointmentOverlap)
            return {
                book: false,
                error: 'This event hours are overlaping another event..!',
            };

        await db.appointment.update({
            where: {
                id,
            },
            data: {
                patientId: session.user.id,
            },
        });

        revalidatePath(`/doctor/${appointment.doctorId}`);

        return { book: true };
    } catch (error) {
        return { book: false, error: 'Something went wrong..!' };
    }
};
