'use client';

import DraggableContainer from '@/components/DraggableContainer';
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
    query: string;
};

export default function FeedbackList({ feedbacks, query }: UserListProps) {
    if (feedbacks.length < 1)
        return (
            <div className="mt-2 text-2xl font-bold break-words">
                {query
                    ? `No feedback was found from a writer whose email includes "${query}"`
                    : 'No feedback was found.'}
            </div>
        );

    return (
        <DraggableContainer>
            <Table
                containerClassname="min-w-max relative mt-3"
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
        </DraggableContainer>
    );
}
