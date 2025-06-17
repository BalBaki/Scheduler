import { ComponentProps, PropsWithChildren, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDragScroll } from '@/hooks/use-drag-scroll';
import { cn } from '@/lib/utils';

type DraggableContainerProps = PropsWithChildren<
    ComponentProps<'div'> & { vertical?: boolean; horizontal?: boolean }
>;

export default function DraggableContainer({
    className,
    children,
    vertical,
    horizontal,
    ...rest
}: DraggableContainerProps) {
    const searchParams = useSearchParams();
    const {
        scrollRef,
        handleMouseDown,

        isDragging,
    } = useDragScroll({ horizontal, vertical });

    useEffect(() => {
        if (!scrollRef.current) return;

        const scrollOptions: ScrollToOptions = { behavior: 'smooth' };

        if (horizontal !== false) {
            scrollOptions.left = 0;
        }

        if (vertical) {
            scrollOptions.top = 0;
        }

        scrollRef.current.scrollTo(scrollOptions);
    }, [searchParams, horizontal, vertical]);

    return (
        <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            className={cn(
                'w-full cursor-grab overflow-auto',
                {
                    'cursor-grabbing': isDragging,
                },
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    );
}
