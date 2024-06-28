'use client';

import { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

type SubmitButtonProps = {
    pendingText?: string | React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

export default function SubmitButton({
    children,
    type,
    className,
    pendingText = 'Submitting....',
    disabled,
    ...rest
}: PropsWithChildren<SubmitButtonProps>) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={disabled || pending}
            className={cn('flex justify-center items-center', pending && 'cursor-not-allowed', className)}
            {...rest}
        >
            {pending ? pendingText : children || 'submit'}
        </button>
    );
}
