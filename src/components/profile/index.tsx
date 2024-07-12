'use client';

import { useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Appointments from './appointments';
import WaitForApprove from '../wait-for-approve';
import Account from './account';

export default function Profile() {
    const { data: session } = useSession();

    if (!session) return null;
    if (session?.user.status !== 'APPROVED') return <WaitForApprove />;

    return (
        <Tabs defaultValue="account" className="flex my-2 max-sm:flex-col" orientation="vertical">
            <TabsList className="flex-col h-20 mr-2 [&_button]:justify-normal [&_button]:w-48">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appoinment">Appoinments</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-0">
                <Account />
            </TabsContent>
            <TabsContent value="appoinment" className="mt-0">
                <Appointments />
            </TabsContent>
        </Tabs>
    );
}
