'use client';

import { useLocale } from '@/hooks/use-locale';
import type { Appointment } from '@prisma/client';

type NextAvailabilityProps = {
    appointment: Appointment;
};

export default function NextAvailability({
    appointment,
}: NextAvailabilityProps) {
    const locale = useLocale();

    return (
        <div
            className="flex flex-wrap max-sm:justify-center"
            aria-describedby="nextAvailability"
        >
            <h2 id="nextAvailability" className="mr-1 font-medium">
                Next availability :
            </h2>
            <p className="rounded-md bg-[#237a83] px-1.5 pb-1 pt-px text-center text-white max-sm:block">
                {`${appointment.start.toLocaleDateString(locale, {
                    minute: '2-digit',
                    hour: '2-digit',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })} - ${appointment.end.toLocaleDateString(locale, {
                    minute: '2-digit',
                    hour: '2-digit',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}`}
            </p>
        </div>
    );
}
