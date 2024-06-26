'use client';

import type { EventContentArg } from '@fullcalendar/core/index.js';
import moment from 'moment';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/submit-button';
import { ImSpinner6 } from 'react-icons/im';
import RemoveAppointment from './remove-appointment';
import UserDetailPopover from '@/components/user-detail-popover';

type EditAppointmentPopupProps = {
    arg: EventContentArg;
};

export default function EditAppointmentPopup({ arg }: EditAppointmentPopupProps) {
    const { event } = arg;

    return (
        <Dialog>
            <DialogTrigger asChild className="w-full">
                <div>
                    {event.start && event.end
                        ? `${moment(event.start).format('LT')} : ${moment(event.end).format('LT')}`
                        : event.title}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <form>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex flex-col gap-y-1">
                            <Label htmlFor="startstr">Date</Label>
                            <div className="border-2 rounded-md p-2 text-sm">{moment(event.start).format('LL')}</div>
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <Label htmlFor="title">Title</Label>
                            <Input type="text" name="title" id="title" defaultValue={event.title} />
                        </div>
                        <div>
                            <Label htmlFor="startHour">Start Hour</Label>
                            <Input
                                type="time"
                                name="start"
                                id="startHour"
                                defaultValue={moment(event.start).format('hh:mm')}
                            />
                        </div>
                        <div>
                            <Label htmlFor="endHour">End Hour</Label>
                            <Input
                                type="time"
                                name="end"
                                id="endHour"
                                defaultValue={moment(event.end).format('hh:mm')}
                            />
                        </div>
                        {event.extendedProps.patient && (
                            <UserDetailPopover triggerText="Patient Detail" user={event.extendedProps.patient} />
                        )}

                        <Input type="hidden" name="date" value={moment(event.start).format('YYYY-MM-DD')} />
                    </div>
                    <DialogFooter className="flex flex-row justify-end mt-3 space-x-2">
                        <RemoveAppointment appointmentId={event.id} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
