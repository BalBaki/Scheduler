import { cn } from '@/lib/utils';

export default function WaitForApprove({
    className,
    ...rest
}: React.ComponentPropsWithoutRef<'span'>) {
    return (
        <span className={cn('text-2xl text-red-500', className)} {...rest}>
            The account has not yet been approved. Wait for the administrator to
            approve it.
        </span>
    );
}
