'use client';

import { useEffect, useRef } from 'react';
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
import type { Feedback } from '@prisma/client';

type UserListProps = {
    feedbacks: Feedback[];
    page: number;
};

export default function FeedbackList({ feedbacks, page }: UserListProps) {
    const tableRef = useRef<HTMLTableElement | null>(null);

    useEffect(() => {
        if (!tableRef.current) return;

        tableRef.current.scrollIntoView({
            block: 'start',
            inline: 'start',
        });
    }, [page]);

    if (feedbacks.length < 1) return <div>No feedback.</div>;

    return (
        <Table
            containerClassname="h-fit max-h-[calc(100vh-230px)] sm:max-h-[calc(100vh-190px)] overflow-y-auto relative mt-1"
            ref={tableRef}
            aria-label="List of feedbacks"
            tabIndex={0}
        >
            <TableCaption></TableCaption>
            <TableHeader className="sticky top-0 bg-gray-600">
                <TableRow className="[&_th]:text-white">
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {feedbacks.map((feedBack) => (
                    <TableRow key={feedBack.id}>
                        <TableCell>{feedBack.email}</TableCell>
                        <TableCell>{feedBack.message}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
}
