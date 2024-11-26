import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePageLoading() {
    return Array.from({ length: 4 }, (_, index) => {
        return (
            <div
                key={index}
                className="mx-[4.5%] my-20 flex gap-x-2 px-2 max-md:flex-col max-md:justify-center"
            >
                <Skeleton className="aspect-square w-full max-w-60 rounded-md bg-gray-200 max-md:mx-auto" />
                <div className="flex flex-1 flex-col justify-center space-y-3 max-md:mt-2 md:ml-2">
                    <Skeleton className="h-12 w-full rounded-md bg-gray-200" />
                    <Skeleton className="h-12 w-full rounded-md bg-gray-200" />
                    <Skeleton className="h-12 w-full rounded-md bg-gray-200" />
                    <Skeleton className="h-12 w-full rounded-md bg-gray-200" />
                </div>
            </div>
        );
    });
}
