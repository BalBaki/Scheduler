import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseDragScrollOptions } from '@/types';

export const useDragScroll = ({
    horizontal = true,
    vertical = false,
    speed = 1.5,
    hideScrollbars = false,
}: UseDragScrollOptions = {}) => {
    const [isDragging, setIsDragging] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const startPos = useRef({ x: 0, y: 0 });
    const startScroll = useRef({ left: 0, top: 0 });

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!scrollRef.current) return;

        setIsDragging(true);

        startPos.current = {
            x: e.clientX,
            y: e.clientY,
        };

        startScroll.current = {
            left: scrollRef.current.scrollLeft,
            top: scrollRef.current.scrollTop,
        };

        scrollRef.current.style.userSelect = 'none';

        e.preventDefault();
    }, []);

    const resetDragging = useCallback(() => {
        setIsDragging(false);

        if (scrollRef.current) {
            scrollRef.current.style.userSelect = 'auto';
        }
    }, []);

    useEffect(() => {
        if (!scrollRef.current) return;

        if (hideScrollbars) {
            scrollRef.current.style.overflow = 'hidden';
        }

        const onGlobalMouseMove = (e: MouseEvent) => {
            if (!scrollRef.current) return;

            const deltaX = e.clientX - startPos.current.x;
            const deltaY = e.clientY - startPos.current.y;

            if (horizontal) {
                scrollRef.current.scrollLeft =
                    startScroll.current.left - deltaX * speed;
            }

            if (vertical) {
                scrollRef.current.scrollTop =
                    startScroll.current.top - deltaY * speed;
            }
        };

        if (isDragging) {
            document.addEventListener('mousemove', onGlobalMouseMove, {
                passive: false,
            });
            document.addEventListener('mouseup', resetDragging, { once: true });
        }

        return () => {
            document.removeEventListener('mousemove', onGlobalMouseMove);
            document.removeEventListener('mouseup', resetDragging);
        };
    }, [isDragging, resetDragging, horizontal, vertical, speed]);

    return {
        scrollRef,
        handleMouseDown,
        isDragging,
    };
};
