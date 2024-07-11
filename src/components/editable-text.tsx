'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from './ui/button';

type EditableTextProps = {
    text?: {
        main?: string;
        edit?: string;
        save?: string;
        cancel?: string;
    };
    schema?: {
        container?: string;
        text?: string;
        buttonContainter?: string;
        edit?: string;
        save?: string;
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

    const handleSaveButtonClick = () => setIsEdit(false);
    const handleEditButtonClick = () => setIsEdit(true);
    const handleCancelButtonClick = () => {
        cancel && cancel();

        setIsEdit(false);
    };
    const handleTextClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.detail === 2 && setIsEdit(true);
    };

    return (
        <div className={cn('flex flex-col h-40 mt-1', schema?.container)}>
            {isEdit ? (
                <>
                    {/* children as input */}
                    <div className="flex-1">{children}</div>
                    <div
                        className={cn(
                            'flex gap-x-1 mt-1 ',
                            { 'ml-auto': buttonPosition === 'right' },
                            schema?.buttonContainter
                        )}
                    >
                        {cancel && isEdit && (
                            <Button className={cn('min-w-16 px-3', schema?.cancel)} onClick={handleCancelButtonClick}>
                                {text?.cancel || 'Cancel'}
                            </Button>
                        )}
                        <Button className={cn('min-w-16 px-3', schema?.save)} onClick={handleSaveButtonClick}>
                            {text?.save || 'Save'}
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className={cn('flex-1 border-2 rounded-md', schema?.text)}
                        onClick={editOnDoubleClick ? handleTextClick : undefined}
                    >
                        {text?.main}
                    </div>
                    <div
                        className={cn(
                            'flex gap-x-1 mt-1',
                            { 'ml-auto': buttonPosition === 'right' },
                            schema?.buttonContainter
                        )}
                    >
                        <Button className={cn('min-w-16 px-3', schema?.edit)} onClick={handleEditButtonClick}>
                            {text?.edit || 'Edit'}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
