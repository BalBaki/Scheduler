import { notFound } from 'next/navigation';
import FeedbackFilters from '@/components/dashboard/feedback/FeedbackFilters';
import FeedbackList from '@/components/dashboard/feedback/FeedbackList';
import Pagination from '@/components/Pagination';
import { METADATA_TITLE_SITE_NAME } from '@/constants';
import { Status } from '@/enums';
import { feedbackSearchParamsSchema } from '@/schemas';
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
    const validatedSearchParams =
        feedbackSearchParamsSchema.safeParse(searchParams);

    if (!validatedSearchParams.success) return notFound();

    const getPaginatedFeedbacksResult =
        await FeedbackService.getPaginatedFeedbacks(validatedSearchParams.data);

    if (getPaginatedFeedbacksResult.status === Status.Err)
        return <div>{getPaginatedFeedbacksResult.err}</div>;

    return (
        <section className="mt-2" aria-labelledby="feedbacks">
            <h1 id="feedbacks" className="sr-only">
                Feedback List
            </h1>
            <div className="flex flex-wrap justify-between max-sm:flex-col">
                <FeedbackFilters
                    filters={{
                        query: validatedSearchParams.data.query,
                    }}
                    params={validatedSearchParams.data}
                />
            </div>
            <FeedbackList
                feedbacks={getPaginatedFeedbacksResult.data.feedbacks}
                query={validatedSearchParams.data.query}
            />
            <Pagination
                totalCount={getPaginatedFeedbacksResult.data.totalFeedbackCount}
                itemCountPerPage={validatedSearchParams.data.limit}
            />
        </section>
    );
}
