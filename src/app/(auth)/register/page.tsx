import SignUp from '@/components/auth/sign-up';
import { METADATA_TITLE_SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Register - ${METADATA_TITLE_SITE_NAME}`,
    description:
        'Create a new account as a doctor or patient to start booking and managing appointments. Sign up today!',
};

export default function RegisterPage() {
    return <SignUp />;
}
