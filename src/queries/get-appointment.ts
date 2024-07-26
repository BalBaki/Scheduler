import type { GetAppointments } from '@/types';

export const getAppointments = async (): Promise<GetAppointments> => {
    const response = await fetch('/api/appointments');

    if (!response.ok)
        return { search: false, error: `Status Code ${response.status}` };

    const result = (await response.json()) as GetAppointments;

    return result;
};
