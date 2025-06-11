'use server';

import { AppointmentService } from '@/services/appointment.service';
import type { CreateAppointmentServerForm } from '@/types';

export const createAppointment = async (form: CreateAppointmentServerForm) => {
    return AppointmentService.create(form);
};

export const removeAppointment = async (appointmentId: string) => {
    return AppointmentService.remove(appointmentId);
};

export const cancelAppointment = async (appointmentId: string) => {
    return AppointmentService.cancel(appointmentId);
};

export const bookAppointment = async (appointmentId: string) => {
    return AppointmentService.book(appointmentId);
};
