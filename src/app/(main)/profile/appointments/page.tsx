import Appointments from '@/components/profile/Appointments';
import { METADATA_TITLE_SITE_NAME } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `My Appointments - ${METADATA_TITLE_SITE_NAME}`,
    description:
        'View and manage all your upcoming and past appointments. Stay on top of your schedule with ease.',
};

export default function AppointmentsPage() {
    return <Appointments />;
}
