import ApprovePagination from '@/components/dashboard/approve/approve-pagination';
import SearchUser from '@/components/dashboard/approve/search-user';
import UserList from '@/components/dashboard/approve/user-list';

type ApprovePageProps = {
    searchParams: {
        page: string | string[] | undefined;
        term: string | string[] | undefined;
    };
};

export default function ApprovePage({ searchParams }: ApprovePageProps) {
    const page = parseInt(searchParams.page?.toString() || '') || 1;

    return (
        <div className="mt-2">
            <SearchUser term={searchParams.term} />
            <UserList page={page} searchParams={searchParams} />
            <ApprovePagination page={page} searchParams={searchParams} />
        </div>
    );
}
