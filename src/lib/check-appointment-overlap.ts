import db from '@/db';
import type { Roles } from '@prisma/client';

interface AppointmentOverlap {
    userId: string;
    userRole: Roles;
    startDate: Date;
    endDate: Date;
}

export const checkAppointmentOverlap = async ({ userId, userRole, startDate, endDate }: AppointmentOverlap) =>
    await db.appointment.findFirst({
        where: {
            AND: {
                [userRole === 'DOCTOR' ? 'doctorId' : 'patientId']: userId,
                OR: [
                    { AND: { start: { lte: startDate }, end: { gt: startDate } } },
                    { AND: { start: { lt: endDate }, end: { gte: endDate } } },
                    { AND: { start: { gte: startDate }, end: { lte: endDate } } },
                    { AND: { start: { lt: startDate }, end: { gt: endDate } } },
                ],
            },
        },
    });
