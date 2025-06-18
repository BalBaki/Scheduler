import { Status } from '@/enums';
import {
    GetAppointmentsResult,
    GetValidDoctorAppointmentsByIdResult,
} from '@/types';

export class ApiService {
    static readonly baseApiUrl = '/api';

    static async getAppointments(): GetAppointmentsResult {
        try {
            const response = await fetch(`${this.baseApiUrl}/appointments`);

            if (!response.ok)
                return {
                    status: Status.Err,
                    err: `Status Code ${response.status}`,
                };

            const result = (await response.json()) as GetAppointmentsResult;

            return result;
        } catch (error) {
            return {
                status: Status.Err,
                err: 'Something went wrong..!',
            };
        }
    }

    static async getValidDoctorAppointmentsById(
        id: string,
    ): GetValidDoctorAppointmentsByIdResult {
        try {
            const response = await fetch(
                this.baseApiUrl +
                    '/doctor/appointment?' +
                    new URLSearchParams({ id }),
            );

            if (!response.ok)
                return {
                    status: Status.Err,
                    err: `Status Code ${response.status}`,
                };

            return response.json() as GetValidDoctorAppointmentsByIdResult;
        } catch (error) {
            return {
                status: Status.Err,
                err: 'Something went wrong..!',
            };
        }
    }
}
