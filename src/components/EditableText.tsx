'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type EditableTextProps = {
    text?: {
        main?: string | null;
        edit?: string;
        save?: string;
        cancel?: string;
    };
    schema?: {
        container?: string;
        text?: string;
        buttonContainter?: string;
        edit?: string;
        finish?: string;
        cancel?: string;
    };
    cancel?: () => void;
    buttonPosition?: 'left' | 'right';
    editOnDoubleClick?: boolean;
    children: React.ReactNode;
};

export default function EditableText({
    text,
    schema,
    cancel,
    buttonPosition = 'right',
    editOnDoubleClick = true,
    children,
}: EditableTextProps) {
    const [isEdit, setIsEdit] = useState(false);

    const handleSaveButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();

        setIsEdit(false);
    };
    const handleEditButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();

        setIsEdit(true);
    };
    const handleCancelButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();

        cancel && cancel();

        setIsEdit(false);
    };
    const handleTextClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        event.detail === 2 && setIsEdit(true);
    };

    return (
        <div className={cn('mt-1 flex h-40 flex-col', schema?.container)}>
            {isEdit ? (
                <>
                    {/* children as input */}
                    <div className="flex-1">{children}</div>
                    <div
                        className={cn(
                            'mt-1 flex gap-x-1',
                            { 'ml-auto': buttonPosition === 'right' },
                            schema?.buttonContainter,
                        )}
                    >
                        {cancel && isEdit && (
                            <Button
                                className={cn(
                                    'min-w-16 bg-red-500 px-3 hover:bg-red-500',
                                    schema?.cancel,
                                )}
                                onClick={handleCancelButtonClick}
                            >
                                {text?.cancel || 'Cancel'}
                            </Button>
                        )}
                        <Button
                            className={cn(
                                'min-w-16 bg-green-500 px-3 hover:bg-green-500',
                                schema?.finish,
                            )}
                            onClick={handleSaveButtonClick}
                        >
                            {text?.save || 'Finish'}
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={cn('flex-1 rounded-md border', schema?.text)}
                        onClick={
                            editOnDoubleClick ? handleTextClick : undefined
                        }
                    >
                        {text?.main}
                    </div>
                    <div
                        className={cn(
                            'mt-1 flex gap-x-1',
                            { 'ml-auto': buttonPosition === 'right' },
                            schema?.buttonContainter,
                        )}
                    >
                        <Button
                            className={cn('min-w-16 px-3', schema?.edit)}
                            onClick={handleEditButtonClick}
                        >
                            {text?.edit || 'Edit'}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
