import { cn } from '@/lib/utils';

type FormValidationErrorProps = {
    errors: string | string[];
} & React.ComponentPropsWithoutRef<'div'>;

export default function FormValidationError({
    errors,
    className,
    ...rest
}: FormValidationErrorProps) {
    if (typeof errors === 'string') errors = [errors];

    return (
        <div className={cn('text-md text-red-500', className)} {...rest}>
            {errors.map((err) => (
                <div key={err}>{err}</div>
            ))}
        </div>
    );
}
