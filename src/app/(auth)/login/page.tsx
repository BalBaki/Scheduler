import CredentialsSignIn from '@/components/auth/credentials-sign-in';
import { METADATA_TITLE_SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Login - ${METADATA_TITLE_SITE_NAME}`,
    description:
        'Access your account to manage your appointments, view schedules, and more. Login now to continue.',
};

export default function LoginPage() {
    return <CredentialsSignIn />;
}
