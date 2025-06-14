import { notFound } from 'next/navigation';
import ApproveAll from '@/components/dashboard/users/ApproveAll';
import UserFilters from '@/components/dashboard/users/UserFilters';
import UserList from '@/components/dashboard/users/UserList';
import Pagination from '@/components/Pagination';
import { Status } from '@/enums';
import { METADATA_TITLE_SITE_NAME } from '@/lib/constants';
import { usersSearchParamsSchema } from '@/schemas';
import { UserManagementService } from '@/services/user-management.service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Approve Registered Users - ${METADATA_TITLE_SITE_NAME}`,
    description:
        'Review and approve new user registrations. Manage access for doctors and patients on your platform.',
};

type UsersPageProps = {
    searchParams: Promise<{
        page: string | string[] | undefined;
        query: string | string[] | undefined;
        limit: string | string[] | undefined;
        status: string | string[] | undefined;
    }>;
};

export default async function UsersPage(props: UsersPageProps) {
    const searchParams = await props.searchParams;
    const validatedSearchParams =
        usersSearchParamsSchema.safeParse(searchParams);

    if (!validatedSearchParams.success) return notFound();

    const getPaginatedUsersResult =
        await UserManagementService.getPaginatedUsers(
            validatedSearchParams.data,
        );

    if (getPaginatedUsersResult.status === Status.Err)
        return <div>{getPaginatedUsersResult.err}</div>;

    return (
        <section className="mt-2" aria-labelledby="userList">
            <h1 id="userList" className="sr-only">
                User List
            </h1>
            <div className="flex flex-wrap items-end justify-between gap-2 max-sm:flex-col">
                <UserFilters
                    validatedfilters={{
                        query: validatedSearchParams.data.query,
                        status: validatedSearchParams.data.status,
                    }}
                    params={validatedSearchParams.data}
                />
                <ApproveAll />
            </div>
            <UserList users={getPaginatedUsersResult.data.users} />
            <Pagination
                totalCount={getPaginatedUsersResult.data.userCount}
                itemCountPerPage={validatedSearchParams.data.limit}
            />
        </section>
    );
}
