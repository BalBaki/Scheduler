'use client';

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
        <header className="mt-3 flex h-10 items-center" role="banner">
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
                    {session.status === 'loading'
                        ? null
                        : !session.data && (
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
                            {session.status === 'loading'
                                ? null
                                : session.data &&
                                  (session.data.user.imageUrl ? (
                                      <Avatar>
                                          <AvatarImage
                                              src={session.data.user.imageUrl}
                                              alt="Profile picture"
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
                                {session.data
                                    ? `${session.data?.user.name} ${session.data?.user.surname}`
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
                                        {!session.data && (
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
                                    {session.data && (
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
                                            {session.data.user.role ===
                                                'ADMIN' && (
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
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            )}
                                            <div className="ml-auto">
                                                <SignOut
                                                    type="submit"
                                                    variant="outline"
                                                />
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
