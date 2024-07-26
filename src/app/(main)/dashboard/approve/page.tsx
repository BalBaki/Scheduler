import ApproveAll from '@/components/dashboard/approve/approve-all';
import ApprovePagination from '@/components/dashboard/approve/approve-pagination';
import SearchUser from '@/components/dashboard/approve/search-user';
import UserList from '@/components/dashboard/approve/user-list';
import db from '@/db';
import { ITEM_COUNT_PER_PAGE } from '@/lib/constants';
import { prismaExclude } from '@/lib/prisma-exclude';

type ApprovePageProps = {
    searchParams: {
        page: string | string[] | undefined;
        term: string | string[] | undefined;
    };
};

export default async function ApprovePage({ searchParams }: ApprovePageProps) {
    const page = parseInt(searchParams.page?.toString() || '') || 1;
    const users = await db.user.findMany({
        where: {
            NOT: {
                status: 'APPROVED',
            },
            ...(searchParams.term && {
                email: { contains: searchParams.term.toString() },
            }),
        },
        select: prismaExclude('User', ['password']),
        orderBy: {
            createdAt: 'desc',
        },
        skip: (page - 1) * ITEM_COUNT_PER_PAGE,
        take: ITEM_COUNT_PER_PAGE,
    });

    return (
        <div className="mt-2">
            <div className="flex flex-wrap justify-between max-sm:flex-col">
                <SearchUser term={searchParams.term} />
                <ApproveAll />
            </div>
            <UserList users={users} page={page} />
            <ApprovePagination page={page} searchParams={searchParams} />
        </div>
    );
}
