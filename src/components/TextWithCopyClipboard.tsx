'use client';

import { FaRegCopy } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import type { IconType } from 'react-icons/lib';

type TextWithCopyClipboardProps = {
    text: string;
    icon?: IconType;
    schema?: {
        text?: string;
        icon?: string;
    };
} & React.ComponentPropsWithoutRef<'div'>;

export default function TextWithCopyClipboard({
    text,
    icon: Icon = FaRegCopy,
    schema,
    className,
    ...rest
}: TextWithCopyClipboardProps) {
    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div
            className={cn(
                'flex items-center justify-between gap-x-2 overflow-hidden',
                className,
            )}
            {...rest}
        >
            <p className={cn('truncate', schema?.text)} title={text}>
                {text}
            </p>
            <Icon
                className={cn('h-5 min-w-5 cursor-pointer', schema?.icon)}
                onClick={handleCopyClick}
            />
        </div>
    );
}
