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
import SubmitButton from '@/components/submit-button';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { ImSpinner6 } from 'react-icons/im';
import { userApprove } from '@/actions/user-approve';
import db from '@/db';
import { prismaExclude } from '@/lib/prisma-exclude';
import { ITEM_COUNT_PER_PAGE } from '@/lib/constants';

type UserListProps = {
    page: number;
    searchParams: {
        page: string | string[] | undefined;
        term: string | string[] | undefined;
    };
};

export default async function UserList({ page, searchParams }: UserListProps) {
    const users = await db.user.findMany({
        where: {
            NOT: {
                status: 'APPROVED',
            },
            ...(searchParams.term && { email: { contains: searchParams.term.toString() } }),
        },
        select: prismaExclude('User', ['password']),
        orderBy: {
            createdAt: 'desc',
        },
        skip: (page - 1) * ITEM_COUNT_PER_PAGE,
        take: ITEM_COUNT_PER_PAGE,
    });

    if (users.length < 1) return <div>No users for waiting approve.</div>;

    return (
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Surname</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
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
                        <TableCell className="flex gap-x-1">
                            <form action={userApprove.bind(null, { user, status: 'APPROVED' })}>
                                <SubmitButton
                                    className="size-6"
                                    pendingText={<ImSpinner6 className="w-full h-full animate-spin" />}
                                >
                                    <FcApproval className="w-full h-full" />
                                </SubmitButton>
                            </form>
                            {user.status !== 'DECLINED' && (
                                <form action={userApprove.bind(null, { user, status: 'DECLINED' })}>
                                    <SubmitButton
                                        className="size-6"
                                        pendingText={<ImSpinner6 className="w-full h-full animate-spin" />}
                                    >
                                        <FcCancel className="w-full h-full" />
                                    </SubmitButton>
                                </form>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
}
