'use client';

import RemoveAppointment from './RemoveAppointment';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UserDetail from '@/components/UserDetail';
import { useLocale } from '@/hooks/use-locale';
import { DialogDescription } from '@radix-ui/react-dialog';
import type { EventContentArg } from '@fullcalendar/core/index.js';

type EditAppointmentPopupProps = {
    arg: EventContentArg;
};

export default function EditAppointmentPopup({
    arg,
}: EditAppointmentPopupProps) {
    const locale = useLocale();
    const { event } = arg;

    return (
        <Dialog>
            <DialogTrigger
                className="w-full"
                aria-label="Open edit appointment pop-up"
            >
                {event.start && event.end
                    ? `${event.start.toLocaleTimeString(locale, {
                          hour: '2-digit',
                          minute: '2-digit',
                      })} : ${event.end.toLocaleTimeString(locale, {
                          hour: '2-digit',
                          minute: '2-digit',
                      })}`
                    : event.title}
            </DialogTrigger>
            <DialogHeader>
                <DialogTitle className="sr-only">Edit Appointment</DialogTitle>
                <DialogContent
                    className="max-w-[425px]"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <DialogDescription asChild>
                        <form>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col gap-y-1">
                                    <Label htmlFor="startstr">Date</Label>
                                    <div className="rounded-md border-2 p-2 text-sm">
                                        {event.start?.toLocaleDateString(
                                            locale,
                                            {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        defaultValue={event.title}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="startHour">
                                        Start Hour
                                    </Label>
                                    <Input
                                        type="time"
                                        name="start"
                                        id="startHour"
                                        defaultValue={event.start?.toLocaleTimeString(
                                            locale,
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            },
                                        )}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="endHour">End Hour</Label>
                                    <Input
                                        type="time"
                                        name="end"
                                        id="endHour"
                                        defaultValue={event.end?.toLocaleTimeString(
                                            locale,
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            },
                                        )}
                                    />
                                </div>
                                {event.extendedProps.patient && (
                                    <UserDetail
                                        triggerText="Patient Detail"
                                        user={event.extendedProps.patient}
                                    />
                                )}
                                <Input
                                    type="hidden"
                                    name="date"
                                    value={
                                        event.start?.toISOString().split('T')[0]
                                    }
                                />
                            </div>
                            <DialogFooter className="mt-3 flex flex-row justify-end space-x-2">
                                {event.start &&
                                    new Date(event.start) > new Date() && (
                                        <RemoveAppointment
                                            appointmentId={event.id}
                                        />
                                    )}
                            </DialogFooter>
                        </form>
                    </DialogDescription>
                </DialogContent>
            </DialogHeader>
        </Dialog>
    );
}
