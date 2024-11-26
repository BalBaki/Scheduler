'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import NProgressBarProvider from '@/providers/NProgressBar';

type ProvidersProps = {
    children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <NProgressBarProvider
                    showSpinner={false}
                    easing="ease"
                    speed={300}
                >
                    {children}
                </NProgressBarProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
}
