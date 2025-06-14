'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import StatusButtons from './StatusButtons';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { UserWithoutPassword } from '@/types';

type UserListProps = {
    users: UserWithoutPassword[];
};

export default function UserList({ users }: UserListProps) {
    const searchParams = useSearchParams();
    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        if (!tableRef.current) return;

        tableRef.current.scrollIntoView({
            block: 'start',
            inline: 'start',
        });
    }, [searchParams]);

    if (users.length < 1) return <div>No users...</div>;

    return (
        <Table
            containerClassname="h-fit max-h-[calc(100vh-350px)] sm:max-h-[calc(100vh-300px)] overflow-y-auto relative mt-3"
            ref={tableRef}
            aria-label="List of users "
            tabIndex={0}
        >
            <TableCaption></TableCaption>
            <TableHeader className="sticky top-0 bg-gray-600">
                <TableRow className="[&_th]:text-white">
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Surname</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Buttons</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.surname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phoneNumber}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell className="flex gap-x-1 px-4">
                            <StatusButtons user={user} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
}
