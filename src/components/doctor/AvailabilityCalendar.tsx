'use client';

import { useQuery } from '@tanstack/react-query';
import { Status } from '@/enums';
import { ReactQueryService } from '@/services/react-query.service';
import AppointmentCalendar from '../appointment/Calendar';
import { Skeleton } from '../ui/skeleton';

type AvailabilityCalendarProps = {
    userId: string;
};

export default function AvailabilityCalendar({
    userId,
}: AvailabilityCalendarProps) {
    const {
        isPending,
        isError,
        data: result,
    } = useQuery(
        ReactQueryService.getValidDoctorAppointmentsByIdQueryOptions(userId),
    );

    if (isPending) {
        return (
            <div className="flex flex-col justify-center space-y-3 max-md:mt-2 md:ml-2">
                {Array.from({ length: 4 }, (_, i) => (
                    <Skeleton
                        key={i}
                        className="h-12 w-full rounded-md bg-gray-200"
                    />
                ))}
            </div>
        );
    }

    if (isError || result.status === Status.Err) {
        return <div>Something went wrong...</div>;
    }

    return (
        <section
            className="rounded-sm bg-white p-8"
            aria-labelledby="availability-calendar"
        >
            <h2
                id="availability-calendar"
                className="text-3xl font-bold text-[#4e788f]"
            >
                Availability Calendar
            </h2>
            <AppointmentCalendar appointments={result.data} />
        </section>
    );
}
