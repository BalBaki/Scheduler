import { UserStatus } from '@prisma/client';
import { cn } from '@/lib/utils';

type StatusProps = {
    status: UserStatus;
};

export default function Status({ status }: StatusProps) {
    return (
        <div
            className={cn(
                'flex h-6 w-24 items-center justify-center rounded-3xl text-white',
                {
                    'bg-orange-400': status === 'WAITING',
                    'bg-red-500': status === 'DECLINED',
                    'bg-green-500': status === 'APPROVED',
                },
            )}
        >
            {status}
        </div>
    );
}
