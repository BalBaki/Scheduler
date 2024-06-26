'use server';

import { revalidatePath } from 'next/cache';
import db from '@/db';
import { auth } from '@/auth';
import type { ResultWithError } from '@/types';

export const removeAppointment = async (appointmentId: string): Promise<ResultWithError<'remove'>> => {
    try {
        const session = await auth();

        if (!session) return { remove: false, error: 'Authorization error..!' };

        await db.appointment.delete({
            where: {
                id: appointmentId,
                doctorId: session.user.id,
            },
        });

        revalidatePath(`/doctor/${session.user.id}`);

        return { remove: true };
    } catch (error) {
        return { remove: false, error: 'Something went wrong..!' };
    }
};
