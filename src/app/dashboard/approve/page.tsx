import SubmitButton from '@/components/submit-button';
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
import db from '@/db';
import { prismaExclude } from '@/lib/prisma-exclude';
import { ImSpinner6 } from 'react-icons/im';
import { FcApproval } from 'react-icons/fc';
import { userApprove } from '@/actions/user-approve';

export default async function ApprovePage() {
    const users = await db.user.findMany({
        where: {
            NOT: {
                status: 'APPROVED',
            },
        },
        select: prismaExclude('User', ['password']),
    });

    if (users.length < 1) return <div>No users for waiting approve.</div>;

    return (
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
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
                        <TableCell>
                            <form action={userApprove.bind(null, user)}>
                                <SubmitButton
                                    className="size-6"
                                    pendingText={<ImSpinner6 className="w-full h-full animate-spin" />}
                                >
                                    <FcApproval className="w-full h-full" />
                                </SubmitButton>
                            </form>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
}
