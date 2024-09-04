import { cache } from 'react';
import db from '..';
import { prismaExclude } from '@/lib/prisma-exclude';

export const getUserByEmail = async (email: string) => {
    const user = await db.user.findFirst({
        where: {
            email,
        },
    });

    return user;
};

export const getDoctorWithValidAppointmentsById = cache(
    async (id: string) =>
        await db.user.findFirst({
            where: {
                id,
            },
            select: {
                ...prismaExclude('User', ['password']),
                doctorAppointments: {
                    where: {
                        start: { gte: new Date() },
                    },
                    orderBy: {
                        start: 'asc',
                    },
                },
            },
        }),
);
