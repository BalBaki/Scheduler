import db from '@/db';
import type { NextRequest } from 'next/server';
import { prismaExclude } from '@/lib/prisma-exclude';
import { getAppointmentsSchema } from '@/schemas';

export async function GET(request: NextRequest) {
    const {
        nextUrl: { searchParams },
    } = request;

    const validatedPayload = getAppointmentsSchema.safeParse({
        userId: searchParams.get('id'),
        userRole: searchParams.get('role'),
    });
    if (!validatedPayload.success) return Response.json({ search: false, error: 'Params are not valid..!' });

    const { userId, userRole } = validatedPayload.data;

    try {
        const appointments = await db.appointment.findMany({
            where: {
                [userRole === 'DOCTOR' ? 'doctorId' : 'patientId']: userId,
            },
            include: {
                [userRole === 'DOCTOR' ? 'patient' : 'doctor']: {
                    select: prismaExclude('User', ['password']),
                },
            },
        });

        return Response.json({ search: true, appointments });
    } catch (error) {
        return Response.json({ search: false, error: 'Something went wrong..!' });
    }
}
