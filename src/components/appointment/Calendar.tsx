'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import intercetionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import BookAppoinmentPopup from './BookAppointmentPopUp';
import { useLocale } from '@/hooks/use-locale';
import type { Appointment } from '@prisma/client';

type AppointmentCalendarProps = {
    appointments: Appointment[];
};

export default function AppointmentCalendar({
    appointments,
}: AppointmentCalendarProps) {
    const locale = useLocale();

    return (
        <div className="overflow-auto">
            <FullCalendar
                locale={locale}
                plugins={[dayGridPlugin, intercetionPlugin]}
                initialView="dayGridMonth"
                events={appointments}
                eventContent={(arg) => <BookAppoinmentPopup arg={arg} />}
                buttonText={{ today: '' }}
                dayHeaderFormat={{ weekday: 'long' }}
                dayHeaderClassNames="break-all"
                eventClassNames={({ event }) =>
                    `flex justify-center text-white text-center text-wrap ${
                        event.extendedProps.patientId
                            ? 'bg-calendar-invalid-date hover:bg-calendar-invalid-date cursor-not-allowed'
                            : 'bg-calendar-valid-date hover:bg-calendar-valid-date cursor-pointer'
                    }`
                }
                height={'auto'}
                weekNumberClassNames={'text-center'}
                weekText="center"
                headerToolbar={{ right: 'prev,today,next' }}
            />
        </div>
    );
}
