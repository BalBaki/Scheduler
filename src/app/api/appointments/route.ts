import db from '@/db';
import type { NextRequest } from 'next/server';
import { prismaExclude } from '@/lib/prisma-exclude';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session) return Response.json({ search: false, error: 'You have no authorization..!' });

    try {
        const appointments = await db.appointment.findMany({
            where: {
                [session.user.role === 'DOCTOR' ? 'doctorId' : 'patientId']: session.user.id,
            },
            include: {
                [session.user.role === 'DOCTOR' ? 'patient' : 'doctor']: {
                    select: prismaExclude('User', ['password']),
                },
            },
        });

        return Response.json({ search: true, appointments });
    } catch (error) {
        return Response.json({ search: false, error: 'Something went wrong..!' });
    }
}
