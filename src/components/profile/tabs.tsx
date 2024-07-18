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
        <div className="flex flex-col min-w-48 h-min border-2 border-black rounded-md px-2 divide-y divide-black ">
            {routes.map((route) => {
                return (
                    <Link key={route.text} href={route.href} className="py-1">
                        {route.text}
                    </Link>
                );
            })}
        </div>
    );
}
