'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import DoctorCalendar from '@/components/profile/doctor/calendar';
import AppointmentList from '@/components/profile/patient/appointment-list';
import { getAppointments } from '@/queries/get-appointment';
import { Skeleton } from '../ui/skeleton';

export default function Appointments() {
    const { data: session } = useSession();

    if (!session) return null;

    const { data, isPending, error } = useQuery({
        queryFn: () => getAppointments(),
        queryKey: ['appointments'],
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    if (isPending)
        return (
            <div className="mt-3 max-w-[55rem] space-y-4">
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
            </div>
        );
    if (!data?.search) return <div>Error: {data?.error}</div>;
    if (error) return <div>Something went wrong..!</div>;

    return (
        <>
            {session.user.role === 'DOCTOR' ? (
                <DoctorCalendar appointments={data.appointments} />
            ) : (
                <AppointmentList appointments={data.appointments} />
            )}
        </>
    );
}
