'use client';

import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

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
            className={cn(
                'flex items-center justify-center',
                pending && 'cursor-not-allowed',
                className,
            )}
            aria-label="Submit form"
            {...rest}
        >
            {pending ? pendingText : children || 'submit'}
        </button>
    );
}
