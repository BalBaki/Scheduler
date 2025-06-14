'use client';

import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import NProgressBar from '@/components/NProgressBar';

type ProvidersProps = {
    children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                {children}
                <Suspense>
                    <NProgressBar
                        showSpinner={false}
                        easing="ease"
                        speed={300}
                    />
                </Suspense>
            </SessionProvider>
        </QueryClientProvider>
    );
}
