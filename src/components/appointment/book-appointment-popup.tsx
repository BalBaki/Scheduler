'use client';

import type { EventContentArg } from '@fullcalendar/core/index.js';
import { useSession } from 'next-auth/react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '../ui/label';
import BookAppoinment from './book-appointment';
import Link from 'next/link';
import WaitForApprove from '../wait-for-approve';
import { useLocale } from '@/hooks/use-locale';

type BookAppoinmentPopupProps = {
    arg: EventContentArg;
};

export default function BookAppoinmentPopup({ arg }: BookAppoinmentPopupProps) {
    const { data: session } = useSession();
    const locale = useLocale();
    const { event } = arg;

    if (event.extendedProps.patientId)
        return (
            <div>
                {event.start && event.end
                    ? `${event.start.toLocaleTimeString(locale, {
                          hour: '2-digit',
                          minute: '2-digit',
                      })} : ${event.end.toLocaleTimeString(locale, {
                          hour: '2-digit',
                          minute: '2-digit',
                      })}`
                    : event.title}
            </div>
        );

    return (
        <Dialog>
            <DialogTrigger asChild className="w-full">
                <div>
                    {event.start && event.end
                        ? `${event.start.toLocaleTimeString(locale, {
                              hour: '2-digit',
                              minute: '2-digit',
                          })} : ${event.end.toLocaleTimeString(locale, {
                              hour: '2-digit',
                              minute: '2-digit',
                          })}`
                        : event.title}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                {session?.user ? (
                    session.user.status !== 'APPROVED' ? (
                        <WaitForApprove />
                    ) : (
                        <>
                            <DialogHeader className="text-left mt-3">
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex flex-col gap-y-1">
                                        <Label>Date:</Label>
                                        <div className="border-2 rounded-md p-2 text-sm">
                                            {event.start?.toLocaleDateString(locale, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <Label>Title:</Label>
                                        <div className="border-2 rounded-md p-2 text-sm">{event.title}</div>
                                    </div>
                                    <div>
                                        <Label>Start Hour:</Label>
                                        <div className="border-2 rounded-md p-2 text-sm">
                                            {event.start?.toLocaleTimeString(locale, {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <Label>End Hour:</Label>
                                        <div className="border-2 rounded-md p-2 text-sm">
                                            {event.end?.toLocaleTimeString(locale, {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </DialogHeader>
                            <DialogFooter className="flex flex-row justify-end space-x-2">
                                <BookAppoinment id={event.id} />
                            </DialogFooter>
                        </>
                    )
                ) : (
                    <Link href="/login">
                        <div className="border-2 rounded-md text-center bg-gray-400 text-white mt-3 py-3">Login</div>
                    </Link>
                )}
            </DialogContent>
        </Dialog>
    );
}
