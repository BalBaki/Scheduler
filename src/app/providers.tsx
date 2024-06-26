'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ProvidersProps = {
    children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
        </QueryClientProvider>
    );
}
