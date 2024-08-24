'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const routes = [
    {
        text: 'Account',
        href: '/profile',
    },
    {
        text: 'Appointments',
        href: '/profile/appointments',
    },
];

export default function Tabs() {
    const pathname = usePathname();

    return (
        <nav
            className="flex h-min gap-x-2 scrollbar-none max-md:overflow-y-auto md:min-w-40 md:flex-col"
            role="navigation"
            aria-label="Profile page's tab navigation"
        >
            {routes.map((route) => {
                return (
                    <Link
                        key={route.text}
                        href={route.href}
                        className={cn(
                            'text-normal py-2 pl-1 pr-5 max-md:rounded-md max-md:border-2 max-md:px-3 md:rounded-md',
                            { 'bg-gray-200/50': pathname === route.href },
                        )}
                    >
                        {route.text}
                    </Link>
                );
            })}
        </nav>
    );
}
