'use client';

import moment from 'moment';
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
import UserDetailPopover from '@/components/user-detail-popover';
import CancelAppointment from './cancel-appointment';
import type { Appointment } from '@prisma/client';
import type { UserWithoutPassword } from '@/types';

type AppointmentListProps = {
    appointments: (Appointment & {
        patient?: UserWithoutPassword;
        doctor?: UserWithoutPassword;
    })[];
};

export default function AppointmentList({ appointments }: AppointmentListProps) {
    if (appointments.length < 1) return <div>No Appointments...</div>;

    return (
        <Table className="max-w-[55rem]">
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
                    <TableRow key={appointment.id}>
                        <TableCell>{appointment.id}</TableCell>
                        <TableCell>{appointment.title}</TableCell>
                        <TableCell className="cursor-pointer">
                            <UserDetailPopover
                                triggerText={`${appointment.doctor?.name} ${appointment.doctor?.surname}`}
                                user={appointment?.doctor}
                            />
                        </TableCell>
                        <TableCell>{moment(appointment.start).format('MMM Do YYYY')}</TableCell>
                        <TableCell>{`${moment(appointment.start).format('LT')} - ${moment(appointment.end).format(
                            'LT'
                        )}`}</TableCell>
                        <TableCell>
                            {new Date(appointment.start) > new Date() && (
                                <CancelAppointment appointmentId={appointment.id} />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
}
