import { AppointmentService } from '@/services/appointment.service';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id') || '';

    return Response.json(
        await AppointmentService.getValidDoctorAppointmentsById(userId),
    );
}
