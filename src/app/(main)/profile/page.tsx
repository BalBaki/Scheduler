import Account from '@/components/profile/account';
import { METADATA_TITLE_SITE_NAME } from '@/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Account Settings - ${METADATA_TITLE_SITE_NAME}`,
    description:
        'Update your account details and manage your privacy settings.',
};

export default function ProfilePage() {
    return <Account />;
}
