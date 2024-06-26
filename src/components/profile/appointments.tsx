'use client';

import { useQuery } from '@tanstack/react-query';
import type { UserWithoutPassword } from '@/types';
import DoctorCalendar from '@/components/profile/doctor/calendar';
import AppointmentList from '@/components/profile/patient/appointment-list';
import { getAppointments } from '@/queries/get-appointment';
import { Skeleton } from '../ui/skeleton';

type AppointmentsProps = {
    user: UserWithoutPassword;
};

export default function Appointments({ user }: AppointmentsProps) {
    const { data, isPending, error } = useQuery({
        queryFn: () => getAppointments(user.id, user.role),
        queryKey: ['appointments'],
    });

    if (isPending)
        return (
            <div className="max-w-[55rem] space-y-4 mt-3">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
            </div>
        );
    if (!data?.search) return <div>Error: {data?.error}</div>;
    if (error) return <div>Something went wrong..!</div>;

    return (
        <>
            {user.role === 'DOCTOR' ? (
                <DoctorCalendar appointments={data.appointments} />
            ) : (
                <AppointmentList appointments={data.appointments} />
            )}
        </>
    );
}
