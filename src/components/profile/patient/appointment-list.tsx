'use client';

import CancelAppointment from './cancel-appointment';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import UserDetail from '@/components/user-detail';
import { useLocale } from '@/hooks/use-locale';
import type { UserWithoutPassword } from '@/types';
import type { Appointment } from '@prisma/client';

type AppointmentListProps = {
    appointments: (Appointment & {
        patient?: UserWithoutPassword;
        doctor?: UserWithoutPassword;
    })[];
};

export default function AppointmentList({
    appointments,
}: AppointmentListProps) {
    const locale = useLocale();

    if (appointments.length < 1) return <div>No Appointments...</div>;

    return (
        <Table aria-label="Booked appointment list">
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Appointment Id</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Hour</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {appointments.map((appointment) => (
                    <TableRow
                        key={appointment.id}
                        className="[&>td]:align-baseline"
                    >
                        <TableCell>{appointment.id}</TableCell>
                        <TableCell>{appointment.title}</TableCell>
                        <TableCell className="min-w-80">
                            <UserDetail
                                triggerText={`${appointment.doctor?.name} ${appointment.doctor?.surname}`}
                                user={appointment?.doctor}
                            />
                        </TableCell>
                        <TableCell className="text-nowrap">
                            {new Date(appointment.start).toLocaleDateString(
                                locale,
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                },
                            )}
                        </TableCell>
                        <TableCell className="text-nowrap">{`${new Date(
                            appointment.start,
                        ).toLocaleTimeString(locale, {
                            hour: '2-digit',
                            minute: '2-digit',
                        })} - ${new Date(appointment.end).toLocaleTimeString(
                            locale,
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                            },
                        )}`}</TableCell>
                        <TableCell>
                            {new Date(appointment.start) > new Date() && (
                                <CancelAppointment
                                    appointmentId={appointment.id}
                                />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
}
