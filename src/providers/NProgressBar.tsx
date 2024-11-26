'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import type { NProgressOptions } from 'nprogress';
import type { PropsWithChildren } from 'react';

export default function NProgressBarProvider({
    children,
    ...options
}: PropsWithChildren<Partial<NProgressOptions>>) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.configure(options);
    }, []);

    useEffect(() => {
        NProgress.done();

        return () => {
            NProgress.start();
        };
    }, [pathname, searchParams]);

    return [children];
}
