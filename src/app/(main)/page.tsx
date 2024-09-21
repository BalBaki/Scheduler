import AboutUs from '@/components/home/about-us';
import Benefits from '@/components/home/benefits';
import ContactUs from '@/components/home/contact-us';
import Goals from '@/components/home/goals';
import Hero from '@/components/home/hero';
import Info from '@/components/home/info';
import Issues from '@/components/home/issues';
import Services from '@/components/home/services';
import { METADATA_TITLE_SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: METADATA_TITLE_SITE_NAME,
    description: `Connect with healthcare professionals and manage your appointments online. Whether you're a doctor or a patient, ${METADATA_TITLE_SITE_NAME} offers a seamless experience for scheduling, booking, and managing healthcare services.`,
};

export default function Home() {
    return (
        <>
            <Hero />
            <Issues />
            <AboutUs />
            <Services />
            <Goals />
            <Info />
            <Benefits />
            <ContactUs />
        </>
    );
}
