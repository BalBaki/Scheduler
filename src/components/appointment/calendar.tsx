'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import intercetionPlugin from '@fullcalendar/interaction';
import BookAppoinmentPopup from './book-appointment-popup';
import type { Appointment } from '@prisma/client';
import type { UserWithoutPassword } from '@/types';
import { useLocale } from '@/hooks/use-locale';

type AppointmentCalendarProps = {
    user: UserWithoutPassword & {
        doctorAppointments: Appointment[];
    };
};

export default function AppointmentCalendar({ user }: AppointmentCalendarProps) {
    const locale = useLocale();

    return (
        <div className="overflow-auto">
            <FullCalendar
                locale={locale}
                plugins={[dayGridPlugin, intercetionPlugin]}
                initialView="dayGridMonth"
                events={user.doctorAppointments}
                eventContent={(arg) => <BookAppoinmentPopup arg={arg} />}
                buttonText={{ today: '' }}
                dayHeaderFormat={{ weekday: 'long' }}
                dayHeaderClassNames="break-all"
                eventClassNames={({ event }) =>
                    `flex justify-center text-white text-center text-wrap ${
                        event.extendedProps.patientId
                            ? 'bg-red-300 hover:bg-red-300 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-600 cursor-pointer'
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
