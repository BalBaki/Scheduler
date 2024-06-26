import type { GetAppointments } from '@/types';
import type { Roles } from '@prisma/client';

export const getAppointments = async (userId: string, role: Roles): Promise<GetAppointments> => {
    const response = await fetch(
        '/api/appointments?' +
            new URLSearchParams({
                id: userId,
                role,
            })
    );

    if (!response.ok) return { search: false, error: `Status Code ${response.status}` };

    const result = (await response.json()) as GetAppointments;

    return result;
};
