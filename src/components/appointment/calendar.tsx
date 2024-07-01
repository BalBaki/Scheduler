'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import intercetionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import BookAppoinmentPopup from './book-appointment-popup';
import type { Appointment } from '@prisma/client';
import type { UserWithoutPassword } from '@/types';

type AppointmentCalendarProps = {
    user: UserWithoutPassword & {
        doctorAppointments: Appointment[];
    };
};

export default function AppointmentCalendar({ user }: AppointmentCalendarProps) {
    return (
        <div className="overflow-auto">
            <FullCalendar
                locale={moment.locale()}
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
