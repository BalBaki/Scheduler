import { QueryClient, queryOptions } from '@tanstack/react-query';
import { ApiService } from './api.service';

export class ReactQueryService {
    static getValidDoctorAppointmentsByIdQueryOptions(userId: string) {
        return queryOptions({
            queryKey: ['doctor-appointments'],
            queryFn: () => ApiService.getValidDoctorAppointmentsById(userId),
            refetchOnWindowFocus: false,
        });
    }

    static async multipleInvalidateQueries(
        client: QueryClient,
        keys: string[],
    ) {
        return Promise.all(
            keys.map((key) => client.invalidateQueries({ queryKey: [key] })),
        );
    }
}
