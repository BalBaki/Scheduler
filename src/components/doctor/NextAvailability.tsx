'use client';

import { useQuery } from '@tanstack/react-query';
import { Status } from '@/enums';
import { useLocale } from '@/hooks/use-locale';
import { ReactQueryService } from '@/services/react-query.service';
import { Skeleton } from '../ui/skeleton';

type NextAvailabilityProps = {
    userId: string;
};

export default function NextAvailability({ userId }: NextAvailabilityProps) {
    const locale = useLocale();
    const {
        isFetching,
        isError,
        data: result,
    } = useQuery(
        ReactQueryService.getValidDoctorAppointmentsByIdQueryOptions(userId),
    );

    if (isFetching) {
        return <Skeleton className="h-8 max-w-124 rounded-md bg-gray-200" />;
    }

    if (isError || (result && result.status === Status.Err)) {
        return <div>Something went wrong...</div>;
    }

    const unBookedAppointment = result?.data.find(
        (appointment) => !appointment.patientId,
    );

    if (!unBookedAppointment) return null;

    return (
        <div className="flex flex-wrap max-sm:justify-center">
            <h2 className="mr-1 font-medium">Next availability :</h2>
            <p className="rounded-md bg-[#237a83] px-1.5 pt-px pb-1 text-center text-white max-sm:block">
                {`${new Date(unBookedAppointment.start).toLocaleDateString(
                    locale,
                    {
                        minute: '2-digit',
                        hour: '2-digit',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    },
                )} - ${new Date(unBookedAppointment.end).toLocaleDateString(
                    locale,
                    {
                        minute: '2-digit',
                        hour: '2-digit',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    },
                )}`}
            </p>
        </div>
    );
}
