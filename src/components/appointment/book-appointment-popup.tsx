'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import BookAppoinment from './book-appointment';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useLocale } from '@/hooks/use-locale';
import { Label } from '../ui/label';
import WaitForApprove from '../wait-for-approve';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import type { EventContentArg } from '@fullcalendar/core/index.js';

type BookAppoinmentPopupProps = {
    arg: EventContentArg;
};

export default function BookAppoinmentPopup({ arg }: BookAppoinmentPopupProps) {
    const { data: session } = useSession();
    const locale = useLocale();
    const { event } = arg;
    const dateText =
        event.start && event.end
            ? `${event.start.toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit',
              })} : ${event.end.toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit',
              })}`
            : event.title;

    if (event.extendedProps.patientId) return <div>{dateText}</div>;

    return (
        <Dialog>
            <DialogTrigger
                className="w-full"
                aria-label="Open book appointment pop-up"
            >
                {dateText}
            </DialogTrigger>
            <DialogContent
                className="max-w-[425px]"
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                {session?.user ? (
                    session.user.status !== 'APPROVED' ? (
                        <>
                            <VisuallyHidden.Root>
                                <DialogTitle>Waiting for approve</DialogTitle>
                            </VisuallyHidden.Root>
                            <WaitForApprove />
                        </>
                    ) : (
                        <>
                            <DialogHeader className="mt-3 text-left">
                                <VisuallyHidden.Root>
                                    <DialogTitle>
                                        Waiting for approve
                                    </DialogTitle>
                                </VisuallyHidden.Root>
                                <DialogDescription asChild>
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex flex-col gap-y-1">
                                            <Label>Date:</Label>
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
                                            <Label>Title:</Label>
                                            <div className="rounded-md border-2 p-2 text-sm">
                                                {event.title}
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Start Hour:</Label>
                                            <div className="rounded-md border-2 p-2 text-sm">
                                                {event.start?.toLocaleTimeString(
                                                    locale,
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    },
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <Label>End Hour:</Label>
                                            <div className="rounded-md border-2 p-2 text-sm">
                                                {event.end?.toLocaleTimeString(
                                                    locale,
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex flex-row justify-end space-x-2">
                                <BookAppoinment id={event.id} />
                            </DialogFooter>
                        </>
                    )
                ) : (
                    <>
                        <VisuallyHidden.Root>
                            <DialogTitle>Login</DialogTitle>
                        </VisuallyHidden.Root>
                        <Link href="/login">
                            <div className="mt-3 rounded-md border-2 bg-gray-400 py-3 text-center text-white">
                                Login
                            </div>
                        </Link>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
