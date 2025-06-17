import AppointmentCalendar from '../appointment/Calendar';
import type { DoctorWithValidAppointments } from '@/types';

type AvailabilityCalendarProps = {
    data: DoctorWithValidAppointments;
};

export default function AvailabilityCalendar({
    data,
}: AvailabilityCalendarProps) {
    if (!data) return null;

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
            <AppointmentCalendar user={data} />
        </section>
    );
}
