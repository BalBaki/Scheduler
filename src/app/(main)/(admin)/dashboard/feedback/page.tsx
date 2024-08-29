import { notFound } from 'next/navigation';
import FeedbackFilters from '@/components/dashboard/feedback/feedback-filters';
import FeedbackList from '@/components/dashboard/feedback/feedback-list';
import Pagination from '@/components/pagination';
import VisuallyHidden from '@/components/visually-hidden';
import db from '@/db';
import { getFeedbackCount } from '@/db/queries/feedback-count';
import { feedbackFilterSchema } from '@/schemas';

type FeedbackPageProps = {
    searchParams: {
        page: string | string[] | undefined;
        query: string | string[] | undefined;
        limit: string | string[] | undefined;
    };
};

export default async function FeedbackPage({
    searchParams,
}: FeedbackPageProps) {
    const page = parseInt(searchParams.page?.toString() || '') || 1;
    const validatedParams = feedbackFilterSchema.safeParse({
        query: searchParams.query?.toString() || '',
    });

    if (!validatedParams.success) return notFound();

    const {
        data: { query },
    } = validatedParams;
    const feedbackCount = await getFeedbackCount(query);
    const itemCountPerPage =
        parseInt(searchParams.limit?.toString() || '') || 20;
    const feedbacks = await db.feedback.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        where: {
            ...(query && {
                email: { contains: query },
            }),
        },
        skip: (page - 1) * itemCountPerPage,
        take: itemCountPerPage,
    });

    return (
        <section className="mt-2" aria-labelledby="feedbacks">
            <VisuallyHidden>
                <h1 id="feedbacks">Feedback List</h1>
            </VisuallyHidden>
            <div className="flex flex-wrap justify-between max-sm:flex-col">
                <FeedbackFilters validatedFilters={validatedParams.data} />
            </div>
            <FeedbackList feedbacks={feedbacks} />
            <Pagination
                totalCount={feedbackCount}
                itemCountPerPage={itemCountPerPage}
            />
        </section>
    );
}
