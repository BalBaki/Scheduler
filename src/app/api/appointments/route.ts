import { AppointmentService } from '@/services/appointment.service';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    return Response.json(await AppointmentService.get());
}
