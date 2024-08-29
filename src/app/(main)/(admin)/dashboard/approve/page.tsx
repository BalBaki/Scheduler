import { notFound } from 'next/navigation';
import ApproveAll from '@/components/dashboard/approve/approve-all';
import UserFilters from '@/components/dashboard/approve/user-filters';
import UserList from '@/components/dashboard/approve/user-list';
import Pagination from '@/components/pagination';
import VisuallyHidden from '@/components/visually-hidden';
import db from '@/db';
import { getUserCount } from '@/db/queries/user-count';
import { prismaExclude } from '@/lib/prisma-exclude';
import { userFilterSchema } from '@/schemas';

type ApprovePageProps = {
    searchParams: {
        page: string | string[] | undefined;
        query: string | string[] | undefined;
        limit: string | string[] | undefined;
        status: string | string[] | undefined;
    };
};

export default async function ApprovePage({ searchParams }: ApprovePageProps) {
    const page = parseInt(searchParams.page?.toString() || '') || 1;
    const validatedParams = userFilterSchema.safeParse({
        query: searchParams.query?.toString() || '',
        status: searchParams.status?.toString().toUpperCase() || 'WAITING',
    });

    if (!validatedParams.success) return notFound();

    const {
        data: { status, query },
    } = validatedParams;
    const userCount = await getUserCount({
        status,
        query,
    });
    const itemCountPerPage =
        parseInt(searchParams.limit?.toString() || '') || 20;
    const users = await db.user.findMany({
        where: {
            ...(status !== 'ALL' && {
                status,
            }),
            ...(query && {
                email: { contains: query },
            }),
        },
        select: prismaExclude('User', ['password']),
        orderBy: {
            createdAt: 'desc',
        },
        skip: (page - 1) * itemCountPerPage,
        take: itemCountPerPage,
    });

    return (
        <section className="mt-2" aria-labelledby="userList">
            <VisuallyHidden>
                <h1 id="userList">User List</h1>
            </VisuallyHidden>
            <div className="flex flex-wrap justify-between max-sm:flex-col">
                <UserFilters validatedfilters={validatedParams.data} />
                <ApproveAll />
            </div>
            <UserList users={users} />
            <Pagination
                totalCount={userCount}
                itemCountPerPage={itemCountPerPage}
            />
        </section>
    );
}
