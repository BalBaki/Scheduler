'use server';

import { auth } from '@/auth';
import db from '@/db';
import { revalidatePath } from 'next/cache';
import type { ResultWithError } from '@/types';

//TODO tek appointmentId kalacak. update whereine patientid === session.user.id control ekle.
export const cancelAppointment = async ({
    appointmentId,
    doctorId,
}: {
    appointmentId: string;
    doctorId: string;
}): Promise<ResultWithError<'cancel'>> => {
    try {
        const session = await auth();

        if (!session) return { cancel: false, error: 'Authorization error..!' };

        await db.appointment.update({
            where: {
                id: appointmentId,
                doctorId,
            },
            data: {
                patientId: null,
            },
        });

        revalidatePath(`/doctor/${doctorId}`);

        return { cancel: true };
    } catch (error) {
        return { cancel: false, error: 'Something went wrong..!' };
    }
};
