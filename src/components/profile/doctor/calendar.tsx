'use client';

import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import intercetionPlugin, { type DateClickArg } from '@fullcalendar/interaction';
import type { Appointment } from '@prisma/client';
import AddAppointmentPopup from '../doctor/add-appointment-popup';
import EditAppointmentPopup from '../doctor/edit-appointment-popup';
import { UserWithoutPassword } from '@/types';
import { useLocale } from '@/hooks/use-locale';

type DoctorCalendarProps = {
    appointments: (Appointment & {
        patient?: UserWithoutPassword;
        doctor?: UserWithoutPassword;
    })[];
};

export default function DoctorCalendar({ appointments }: DoctorCalendarProps) {
    const locale = useLocale();
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const calendarRef = useRef<FullCalendar | null>(null);

    const handleDateClick = ({ date }: DateClickArg) => {
        if (date.getTime() < new Date().setHours(0, 0, 0, 0)) return;

        setSelectedDate(date);
        setIsShowDialog(true);
    };

    return (
        <div className="overflow-auto">
            <FullCalendar
                locale={locale}
                ref={calendarRef}
                plugins={[dayGridPlugin, intercetionPlugin]}
                initialView="dayGridMonth"
                events={appointments}
                dateClick={handleDateClick}
                buttonText={{ today: '' }}
                dayHeaderFormat={{ weekday: 'long' }}
                dayHeaderClassNames="break-all"
                eventClassNames="bg-green-600 flex justify-center text-white text-center text-wrap cursor-pointer hover:bg-green-600"
                height={'auto'}
                weekNumberClassNames={'text-center'}
                eventContent={(arg) => <EditAppointmentPopup arg={arg} />}
                weekText="center"
                headerToolbar={{ right: 'prev,today,next' }}
            />
            <div className="relative">
                {isShowDialog && (
                    <AddAppointmentPopup date={selectedDate} show={isShowDialog} setShow={setIsShowDialog} />
                )}
            </div>
        </div>
    );
}
