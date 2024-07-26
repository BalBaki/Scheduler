import AppointmentCalendar from '@/components/appointment/calendar';
import db from '@/db';
import { prismaExclude } from '@/lib/prisma-exclude';

type DoctorPageProps = {
    params: { id: string };
};

export default async function DoctorPage({ params: { id } }: DoctorPageProps) {
    const user = await db.user.findFirst({
        where: {
            id,
        },
        select: {
            ...prismaExclude('User', ['password']),
            doctorAppointments: {
                where: {
                    start: { gte: new Date() },
                },
            },
        },
    });

    if (!user || user.role !== 'DOCTOR')
        return (
            <div className="flex h-screen items-center justify-center text-4xl text-red-500">
                This User is not Doctor..!
            </div>
        );

    return (
        <div>
            <div className="capitalize">{`${user.name} ${user.surname}`}</div>
            <div>{user.email}</div>
            <AppointmentCalendar user={user} />
        </div>
    );
}

export async function generateStaticParams() {
    const doctors = await db.user.findMany({
        where: {
            role: 'DOCTOR',
        },
        select: prismaExclude('User', ['password']),
    });

    return doctors.map((doctor) => {
        return {
            id: doctor.id,
        };
    });
}
