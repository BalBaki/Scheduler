import { cache } from 'react';
import db from '..';
import { Prisma } from '@prisma/client';

type DoctorWithValidAppointmes = Prisma.UserGetPayload<{include: {doctorAppointments: true}, omit: {password:true}}> | null

export const getUserByEmail = async (email: string) => {
    const user = await db.user.findFirst({
        where: {
            email,
        },
    });

    return user;
};

export const getDoctorWithValidAppointmentsById = cache(
    async (id: string) => {
     return await db.user.findUnique({
            omit: {
                password: true,
            },
            where: {
                id,
            },
            include: {
                doctorAppointments: {
                    
                    where: {
                        start: { gte: new Date() },
                    },
                    orderBy: {
                        start: 'asc',
                    },
                } 
            }
            
        })
    }
);
