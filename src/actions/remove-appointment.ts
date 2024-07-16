'use server';

import { revalidatePath } from 'next/cache';
import db from '@/db';
import { auth } from '@/auth';
import type { ResultWithError } from '@/types';

export const removeAppointment = async (appointmentId: string): Promise<ResultWithError<'remove'>> => {
    try {
        const session = await auth();
        const appointment = await db.appointment.findFirst({
            where: {
                id: appointmentId,
                doctorId: session?.user.id,
            },
        });

        if (!appointment) return { remove: false, error: 'Not exists appointment..!' };
        if (!session || appointment.doctorId !== session.user.id)
            return { remove: false, error: 'You have no authorization..!' };
        if (appointment.patientId)
            return { remove: false, error: 'You cannot remove this event. It booked by a patient..!' };

        await db.appointment.delete({
            where: {
                id: appointment.id,
                doctorId: session.user.id,
            },
        });

        revalidatePath(`/doctor/${session.user.id}`);

        return { remove: true };
    } catch (error) {
        return { remove: false, error: 'Something went wrong..!' };
    }
};
