import Link from 'next/link';

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
    return (
        <nav
            className="flex h-min min-w-48 flex-col divide-y divide-black rounded-md border-2 border-black px-2"
            role="navigation"
            aria-label="Profile page's tab navigation"
        >
            {routes.map((route) => {
                return (
                    <Link key={route.text} href={route.href} className="py-1">
                        {route.text}
                    </Link>
                );
            })}
        </nav>
    );
}
