'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SignOut from './auth/sign-out';
import { FiMenu } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
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

    return (
        <header className="flex items-center mt-3 h-10" role="banner">
            <div className="flex items-center mr-auto text-xl font-semibold">
                <span className="text-2xl text-white bg-[#a5c422] px-1 rounded-md font-bold">S</span>cheduler
            </div>
            <nav className="flex text-sm" role="navigation">
                <div className="hidden lg:flex [&>a]:before:transition-all [&>a]:before:absolute [&>a]:before:w-0 [&>a]:before:h-[1px] [&>a]:before:bg-black [&>a]:before:bottom-0 [&>a]:before:left-0 [&>a]:before:origin-left">
                    {routes.map((router) => {
                        return (
                            <Link
                                key={router.text}
                                href={router.href}
                                className="relative py-2 px-4 hover:before:w-full"
                            >
                                {router.text}
                            </Link>
                        );
                    })}
                    {session.status === 'loading'
                        ? null
                        : !session.data && (
                              <>
                                  <Link href="/register" className="px-3 py-2 bg-[#a5c422] text-white rounded-sm mr-2">
                                      Sign Up
                                  </Link>
                                  <Link href="/login" className="px-3 py-2 bg-[#a5c422] text-white rounded-sm">
                                      Sign In
                                  </Link>
                              </>
                          )}
                </div>
                <Sheet>
                    <SheetTrigger aria-label="Open hamburger menu">
                        <div className="hidden lg:block">
                            {session.status === 'loading'
                                ? null
                                : session.data &&
                                  (session.data.user.imageUrl ? (
                                      <Avatar>
                                          <AvatarImage src={session.data.user.imageUrl} alt="Profile picture" />
                                          <AvatarFallback>PP</AvatarFallback>
                                      </Avatar>
                                  ) : (
                                      <CgProfile className="size-10 aspect-square" />
                                  ))}
                        </div>
                        <FiMenu className="size-8 lg:hidden" />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className="capitalize truncate">
                                {session.data ? `${session.data?.user.name} ${session.data?.user.surname}` : ''}
                            </SheetTitle>
                            <SheetDescription asChild>
                                <div className="flex flex-col gap-y-2 text-black text-left">
                                    <div className="flex flex-col gap-y-2 text-left [&>a]:font-medium [&>a]:py-2">
                                        {routes.map((router) => {
                                            return (
                                                <SheetClose asChild key={router.text}>
                                                    <Link href={router.href}>{router.text}</Link>
                                                </SheetClose>
                                            );
                                        })}
                                        {!session.data && (
                                            <div className="absolute right-6 bottom-6 space-x-2">
                                                <Link
                                                    href="/register"
                                                    className="px-3 py-2 bg-[#a5c422] text-white rounded-sm mr-2"
                                                >
                                                    Sign Up
                                                </Link>
                                                <Link
                                                    href="/login"
                                                    className="px-3 py-2 bg-[#a5c422] text-white rounded-sm"
                                                >
                                                    Sign In
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    {session.data && (
                                        <>
                                            <Accordion type="single" collapsible>
                                                <AccordionItem value="profile">
                                                    <AccordionTrigger className="py-2 [&[data-state=open]]:pb-4">
                                                        Profile
                                                    </AccordionTrigger>
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
                                                <Accordion type="single" collapsible>
                                                    <AccordionItem value="dashboard">
                                                        <AccordionTrigger className="py-2 [&[data-state=open]]:pb-4">
                                                            Dashboard
                                                        </AccordionTrigger>
                                                        <AccordionContent className="flex flex-col gap-y-2">
                                                            <SheetClose asChild>
                                                                <Link href="/dashboard/approve">Approve</Link>
                                                            </SheetClose>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            )}
                                            <SignOut
                                                type="submit"
                                                variant="outline"
                                                className="absolute right-6 bottom-6"
                                            />
                                        </>
                                    )}
                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
