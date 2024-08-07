'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CgProfile } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';
import SignOut from './auth/sign-out';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const routes = [
    {
        text: 'Home',
        href: '/',
    },
    {
        text: 'About Us',
        href: '/#aboutUs',
    },
    {
        text: 'Doctors',
        href: '/doctor',
    },
    {
        text: 'Contact',
        href: '/#contactUs',
    },
];

export default function Header() {
    const { data: session, status } = useSession();
    const headerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!headerRef.current) return;

        const stickyObserver = new IntersectionObserver(
            ([e]) => {
                e.target.setAttribute(
                    'data-sticky',
                    (e.intersectionRatio < 1).toString(),
                );
            },
            {
                threshold: [1],
            },
        );

        stickyObserver.observe(headerRef.current);

        return () => {
            headerRef.current && stickyObserver.disconnect();
        };
    }, []);

    return (
        <header
            className="sticky -top-px z-10 flex px-2 py-2 data-[sticky=true]:bg-white"
            role="banner"
            ref={headerRef}
        >
            <div className="mr-auto flex items-center text-xl font-semibold">
                <span className="rounded-md bg-[#a5c422] px-1 text-2xl font-bold text-white">
                    S
                </span>
                cheduler
            </div>
            <nav
                className="flex text-sm"
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="hidden lg:flex [&>a]:before:absolute [&>a]:before:bottom-0 [&>a]:before:left-0 [&>a]:before:h-[1px] [&>a]:before:w-0 [&>a]:before:origin-left [&>a]:before:bg-black [&>a]:before:transition-all">
                    {routes.map((router) => {
                        return (
                            <Link
                                key={router.text}
                                href={router.href}
                                className="relative px-4 py-2 hover:before:w-full"
                            >
                                {router.text}
                            </Link>
                        );
                    })}
                    {status === 'loading'
                        ? null
                        : !session && (
                              <>
                                  <Link
                                      href="/register"
                                      className="mr-2 rounded-sm bg-[#a5c422] px-3 py-2 text-white"
                                  >
                                      Sign Up
                                  </Link>
                                  <Link
                                      href="/login"
                                      className="rounded-sm bg-[#a5c422] px-3 py-2 text-white"
                                  >
                                      Sign In
                                  </Link>
                              </>
                          )}
                </div>
                <Sheet>
                    <SheetTrigger aria-label="Open hamburger menu">
                        <div className="hidden lg:block">
                            {status === 'loading' && !session
                                ? null
                                : session &&
                                  (session.user.imageUrl ? (
                                      <Avatar>
                                          <AvatarImage
                                              src={session.user.imageUrl}
                                              alt="Profile avatar"
                                          />
                                          <AvatarFallback>PP</AvatarFallback>
                                      </Avatar>
                                  ) : (
                                      <CgProfile className="aspect-square size-10" />
                                  ))}
                        </div>
                        <FiMenu className="size-8 lg:hidden" />
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="truncate capitalize">
                                {session
                                    ? `${session?.user.name} ${session?.user.surname}`
                                    : ''}
                            </SheetTitle>
                            <SheetDescription asChild>
                                <div className="flex flex-col gap-y-2 text-left text-black">
                                    <div className="flex flex-col gap-y-2 text-left [&>a]:py-2 [&>a]:font-medium">
                                        {routes.map((router) => {
                                            return (
                                                <SheetClose
                                                    asChild
                                                    key={router.text}
                                                >
                                                    <Link href={router.href}>
                                                        {router.text}
                                                    </Link>
                                                </SheetClose>
                                            );
                                        })}
                                        {!session && (
                                            <div className="ml-auto space-x-2">
                                                <Link
                                                    href="/register"
                                                    className="mr-2 rounded-sm bg-[#a5c422] px-3 py-2 text-white"
                                                >
                                                    Sign Up
                                                </Link>
                                                <Link
                                                    href="/login"
                                                    className="rounded-sm bg-[#a5c422] px-3 py-2 text-white"
                                                >
                                                    Sign In
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    {session && (
                                        <>
                                            <Accordion
                                                type="single"
                                                collapsible
                                            >
                                                <AccordionItem value="profile">
                                                    <AccordionTrigger className="py-2 [&[data-state=open]]:pb-4">
                                                        Profile
                                                    </AccordionTrigger>
                                                    <AccordionContent className="flex flex-col gap-y-2">
                                                        <SheetClose asChild>
                                                            <Link href="/profile">
                                                                Account
                                                            </Link>
                                                        </SheetClose>
                                                        <SheetClose asChild>
                                                            <Link href="/profile/appointments">
                                                                Appointments
                                                            </Link>
                                                        </SheetClose>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                            {session.user.role === 'ADMIN' && (
                                                <Accordion
                                                    type="single"
                                                    collapsible
                                                >
                                                    <AccordionItem value="dashboard">
                                                        <AccordionTrigger className="py-2 [&[data-state=open]]:pb-4">
                                                            Dashboard
                                                        </AccordionTrigger>
                                                        <AccordionContent className="flex flex-col gap-y-2">
                                                            <SheetClose asChild>
                                                                <Link href="/dashboard/approve">
                                                                    Approve
                                                                </Link>
                                                            </SheetClose>
                                                            <SheetClose asChild>
                                                                <Link href="/dashboard/feedback">
                                                                    Feedback
                                                                </Link>
                                                            </SheetClose>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            )}
                                            <div className="ml-auto">
                                                <SheetClose asChild>
                                                    <SignOut
                                                        type="submit"
                                                        variant="outline"
                                                    />
                                                </SheetClose>
                                            </div>
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
