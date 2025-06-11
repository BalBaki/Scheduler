import { notFound } from 'next/navigation';
import ApproveAll from '@/components/dashboard/approve/ApproveAll';
import UserFilters from '@/components/dashboard/approve/UserFilters';
import UserList from '@/components/dashboard/approve/UserList';
import Pagination from '@/components/Pagination';
import db from '@/db';
import { getUserCount } from '@/db/queries/user-count';
import { METADATA_TITLE_SITE_NAME } from '@/lib/constants';
import { userFilterSchema } from '@/schemas';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Approve Registered Users - ${METADATA_TITLE_SITE_NAME}`,
    description:
        'Review and approve new user registrations. Manage access for doctors and patients on your platform.',
};

type ApprovePageProps = {
    searchParams: Promise<{
        page: string | string[] | undefined;
        query: string | string[] | undefined;
        limit: string | string[] | undefined;
        status: string | string[] | undefined;
    }>;
};

export default async function ApprovePage(props: ApprovePageProps) {
    const searchParams = await props.searchParams;
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
        omit: {
            password: true
        },
        where: {
            ...(status !== 'ALL' && {
                status,
            }),
            ...(query && {
                email: { contains: query },
            }),
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip: (page - 1) * itemCountPerPage,
        take: itemCountPerPage,
    });

    return (
        <section className="mt-2" aria-labelledby="userList">
            <h1 id="userList" className="sr-only">
                User List
            </h1>
            <div className="flex flex-wrap items-end justify-between gap-2 max-sm:flex-col">
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
