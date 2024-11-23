'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationWrapper,
} from '@/components/ui/pagination';

type PaginationProps = {
    totalCount: number;
    itemCountPerPage: number;
};

export default function Pagination({
    totalCount,
    itemCountPerPage,
}: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchParamsAsObject = Object.fromEntries(
        new URLSearchParams(searchParams),
    );
    const page = Number(searchParams.get('page')) || 1;
    const lastPage = Math.ceil(totalCount / itemCountPerPage);

    if (totalCount <= itemCountPerPage) return null;

    return (
        <PaginationWrapper className="my-2">
            <PaginationContent>
                <PaginationItem>
                    {page > 1 && (
                        <PaginationPrevious
                            className="w-28 border-2 border-gray-400"
                            href={{
                                pathname,
                                query: {
                                    ...searchParamsAsObject,
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
                                pathname,
                                query: {
                                    ...searchParamsAsObject,
                                    page: page + 1,
                                },
                            }}
                            className="w-28 border-2 border-gray-400"
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </PaginationWrapper>
    );
}
