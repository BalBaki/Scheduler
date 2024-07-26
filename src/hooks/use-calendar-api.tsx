import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { MutableRefObject } from 'react';
import type { CalendarApi } from '@fullcalendar/core/index.js';

export const useCalendarApi = (
    calendarRef: MutableRefObject<FullCalendar | null>,
) => {
    const [calendarApi, setCalendarApi] = useState<CalendarApi | undefined>();

    useEffect(() => {
        if (!calendarRef.current) return;

        setCalendarApi(calendarRef.current.getApi());
    }, []);

    return calendarApi;
};
