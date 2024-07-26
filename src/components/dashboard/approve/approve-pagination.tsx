import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import db from '@/db';
import { ITEM_COUNT_PER_PAGE } from '@/lib/constants';

type ApprovePaginationProps = {
    page: number;
    searchParams: {
        page: string | string[] | undefined;
        term: string | string[] | undefined;
    };
};

export default async function ApprovePagination({
    page,
    searchParams,
}: ApprovePaginationProps) {
    const userCount = await db.user.count({
        where: {
            NOT: {
                status: 'APPROVED',
            },
            ...(searchParams.term && {
                email: { contains: searchParams.term.toString() },
            }),
        },
    });
    const lastPage = Math.ceil(userCount / ITEM_COUNT_PER_PAGE);

    return (
        <Pagination className="my-2">
            <PaginationContent>
                <PaginationItem>
                    {page > 1 && (
                        <PaginationPrevious
                            className="w-28 border-2 border-gray-400"
                            href={{
                                pathname: '/dashboard/approve',
                                query: {
                                    ...searchParams,
                                    page: page - 1,
                                },
                            }}
                        />
                    )}
                </PaginationItem>
                <PaginationItem>
                    {page < lastPage && (
                        <PaginationNext
                            href={{
                                pathname: '/dashboard/approve',
                                query: {
                                    ...searchParams,
                                    page: page + 1,
                                },
                            }}
                            className="w-28 border-2 border-gray-400"
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
