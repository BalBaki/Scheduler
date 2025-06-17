'use client';

import StatusButtons from './StatusButtons';
import DraggableContainer from '@/components/DraggableContainer';
import Status from '@/components/Status';
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
    query: string;
};

export default function UserList({ users, query }: UserListProps) {
    if (users.length < 1)
        return (
            <div className="mt-2 text-2xl font-bold break-words">
                {query
                    ? `No user was found whose email includes "${query}"`
                    : 'No users was found.'}
            </div>
        );

    return (
        <DraggableContainer>
            <Table
                containerClassname="min-w-max relative mt-3"
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
                            <TableCell>
                                <Status status={user.status} />
                            </TableCell>
                            <TableCell className="flex gap-x-1 px-4">
                                <StatusButtons user={user} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter></TableFooter>
            </Table>
        </DraggableContainer>
    );
}
