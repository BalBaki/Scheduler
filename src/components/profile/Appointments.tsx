'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import DoctorCalendar from '@/components/profile/doctor/DoctorCalendar';
import AppointmentList from '@/components/profile/patient/AppointmentList';
import { Status } from '@/enums';
import { ApiService } from '@/services/api.service';
import { Skeleton } from '../ui/skeleton';

export default function Appointments() {
    const { data: session } = useSession();

    const {
        data: result,
        isPending,
        error,
    } = useQuery({
        queryFn: () => ApiService.getAppointments(),
        queryKey: ['appointments', session?.user.id],
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    if (isPending)
        return (
            <div className="mt-3 w-full space-y-4">
                <Skeleton className="h-12 w-full rounded-md bg-gray-200" />
                <Skeleton className="h-12 w-full rounded-md bg-gray-200" />
                <Skeleton className="h-12 w-full rounded-md bg-gray-200" />
            </div>
        );
    if (result?.status === Status.Err) return <div>Error: {result.err}</div>;
    if (error) return <div>Something went wrong..!</div>;

    return (
        <>
            {session &&
                (session.user.role === 'DOCTOR' ? (
                    <DoctorCalendar appointments={result.data.appointments} />
                ) : (
                    <AppointmentList appointments={result.data.appointments} />
                ))}
        </>
    );
}
