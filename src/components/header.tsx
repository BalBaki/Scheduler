'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SignOut from './auth/sign-out';
import { ImSpinner6 } from 'react-icons/im';
import { CgProfile } from 'react-icons/cg';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const routes = [
    {
        text: 'Home',
        href: '/',
    },
    {
        text: 'About Us',
        href: '/',
    },
    {
        text: 'Doctors',
        href: '/doctor',
    },
    {
        text: 'Contact',
        href: '/',
    },
];

export default function Header() {
    const session = useSession();
    const pathname = usePathname();

    if (pathname.startsWith('/login') || pathname.startsWith('/register')) return null;

    return (
        <header className="flex items-center mt-3 h-10">
            <div className="flex items-center mr-auto text-xl font-semibold">
                <span className="text-2xl text-white bg-[#a5c422] px-1 rounded-md font-bold">S</span>cheduler
            </div>
            <div className="flex gap-x-2 text-sm">
                <nav className="flex max-sm:hidden">
                    {routes.map((router) => {
                        return (
                            <Link
                                key={router.text}
                                href={router.href}
                                className="relative py-2 px-4 before:transition-all before:absolute before:w-0 before:h-[1px] before:bg-black 
                                before:bottom-0 before:left-0 hover:before:w-full before:origin-left"
                            >
                                {router.text}
                            </Link>
                        );
                    })}
                </nav>
                {session.status === 'loading' ? (
                    <ImSpinner6 className="size-10 p-1.5 animate-spin" />
                ) : session.data ? (
                    <Sheet>
                        <SheetTrigger>
                            {session.data.user.imageUrl ? (
                                <Avatar>
                                    <AvatarImage src={session.data.user.imageUrl} />
                                    <AvatarFallback>PP</AvatarFallback>
                                </Avatar>
                            ) : (
                                <CgProfile className="size-10 aspect-square" />
                            )}
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="capitalize">{`${session.data.user.name} ${session.data.user.surname}`}</SheetTitle>
                                <SheetDescription asChild>
                                    <nav className="flex flex-col gap-y-2 text-black text-left">
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="profile">
                                                <AccordionTrigger>Profile</AccordionTrigger>
                                                <AccordionContent className="flex flex-col gap-y-2">
                                                    <SheetClose asChild>
                                                        <Link href="/profile">Account</Link>
                                                    </SheetClose>
                                                    <SheetClose asChild>
                                                        <Link href="/profile/appointments">Appointments</Link>
                                                    </SheetClose>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                        {session.data.user.role === 'ADMIN' && (
                                            <>
                                                <Accordion type="single" collapsible>
                                                    <AccordionItem value="dashboard">
                                                        <AccordionTrigger>Dashboard</AccordionTrigger>
                                                        <AccordionContent className="flex flex-col gap-y-2">
                                                            <SheetClose asChild>
                                                                <Link href="/dashboard/approve">Approve</Link>
                                                            </SheetClose>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </>
                                        )}
                                        <SignOut
                                            type="submit"
                                            variant="outline"
                                            className="absolute right-6 bottom-6"
                                        />
                                    </nav>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                ) : (
                    <Link href="/login">
                        <Button className="w-20 bg-[#a5c422] rounded-sm">Sign In</Button>
                    </Link>
                )}
            </div>
        </header>

        // return (
        //     <div className="mt-2 h-10">
        //         <div className="flex items-center gap-x-2">
        //             {/* <div className="mr-auto capitalize truncate">{`${session.data.user.name} ${session.data.user.surname}`}</div> */}
        //             {session.data.user.role === 'ADMIN' && (
        //                 <Link href="/dashboard/approve">
        //                     <Button variant="outline" className="w-20 border-black">
        //                         Approve
        //                     </Button>
        //                 </Link>
        //             )}
        //             <Link href="/profile">
        //                 <Button variant="outline" className="w-20 border-black">
        //                     Profile
        //                 </Button>
        //             </Link>
        //             <SignOut />
        //         </div>
        //         {session.data.user.status === 'WAITING' && (
        //             <div className="bg-red-500 mt-1">
        //                 The account has not yet been approved. Wait for the administrator to approve it.
        //             </div>
        //         )}
        //     </div>
    );
}
