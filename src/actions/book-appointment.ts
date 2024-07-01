'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import db from '@/db';
import type { ResultWithError } from '@/types';
import { checkAppointmentOverlap } from '@/lib/check-appointment-overlap';
import type { BookAppointmentPayload } from '@/types';

//TODO tek id kalacak. payload komple silinecek
export const bookAppointment = async ({
    id,
    startDate,
    endDate,
}: BookAppointmentPayload): Promise<ResultWithError<'book'>> => {
    try {
        const session = await auth();

        if (!session) throw new Error('Please Sign In..!');

        const appointment = await db.appointment.findFirst({
            where: {
                id,
            },
        });

        if (!appointment || appointment.patientId || session.user.role !== 'PATIENT')
            return { book: false, error: 'Invalid User...' };
        if (!startDate || !endDate) return { book: false, error: 'Enter Start or End Date' };
        if (appointment.start < new Date()) return { book: false, error: 'Outdated Appointment' };

        const isAppointmentOverlap = await checkAppointmentOverlap({
            userId: session.user.id,
            userRole: session.user.role,
            startDate,
            endDate,
        });

        if (isAppointmentOverlap) return { book: false, error: 'This event hours are overlaping another event..!' };

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
        return { book: false, error: 'Something went wrong' };
    }
};
