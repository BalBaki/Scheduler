'use server';

import { auth } from '@/auth';
import db from '@/db';
import { revalidatePath } from 'next/cache';
import type { ResultWithError } from '@/types';

export const cancelAppointment = async (appointmentId: string): Promise<ResultWithError<'cancel'>> => {
    try {
        const session = await auth();
        const appointment = await db.appointment.findFirst({
            where: {
                id: appointmentId,
                patientId: session?.user.id,
            },
        });

        if (!appointment) return { cancel: false, error: 'Not exists appointment..!' };
        if (!session || session.user.status !== 'APPROVED' || appointment.patientId !== session.user.id)
            return { cancel: false, error: 'You have no authorization..!' };

        await db.appointment.update({
            where: {
                id: appointment.id,
                patientId: session.user.id,
            },
            data: {
                patientId: null,
            },
        });

        revalidatePath(`/doctor/${appointment.doctorId}`);

        return { cancel: true };
    } catch (error) {
        return { cancel: false, error: 'Something went wrong..!' };
    }
};
