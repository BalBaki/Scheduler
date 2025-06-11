import { notFound } from 'next/navigation';
import FeedbackFilters from '@/components/dashboard/feedback/FeedbackFilters';
import FeedbackList from '@/components/dashboard/feedback/FeedbackList';
import Pagination from '@/components/Pagination';
import { METADATA_TITLE_SITE_NAME } from '@/lib/constants';
import { feedbackFilterSchema } from '@/schemas';
import db from '@/services/db.service';
import { FeedbackService } from '@/services/feedback.service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Feedback - ${METADATA_TITLE_SITE_NAME}`,
    description:
        'View and manage feedback from patients. Ensure the best experience by responding to their concerns.',
};

type FeedbackPageProps = {
    searchParams: Promise<{
        page: string | string[] | undefined;
        query: string | string[] | undefined;
        limit: string | string[] | undefined;
    }>;
};

export default async function FeedbackPage(props: FeedbackPageProps) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams.page?.toString() || '') || 1;
    const validatedParams = feedbackFilterSchema.safeParse({
        query: searchParams.query?.toString() || '',
    });

    if (!validatedParams.success) return notFound();

    const {
        data: { query },
    } = validatedParams;
    const feedbackCount = await FeedbackService.getCount(query);
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
            <h1 id="feedbacks" className="sr-only">
                Feedback List
            </h1>
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
