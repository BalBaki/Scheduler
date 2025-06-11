import { auth } from '@/auth';
import db from '@/db';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const session = await auth();

    if (!session)
        return Response.json({
            search: false,
            error: 'You have no authorization..!',
        });

    try {
        const appointments = await db.appointment.findMany({
            where: {
                [session.user.role === 'DOCTOR' ? 'doctorId' : 'patientId']:
                    session.user.id,
            },
            include: {
                [session.user.role === 'DOCTOR' ? 'patient' : 'doctor']: {
                    omit: {
                        password: true
                    }
                },
            },
        });

        return Response.json({ search: true, appointments });
    } catch (error) {
        return Response.json({
            search: false,
            error: 'Something went wrong..!',
        });
    }
}
