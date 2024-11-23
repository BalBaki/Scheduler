import AboutUs from '@/components/home/AboutUs';
import Benefits from '@/components/home/Benefits';
import ContactUs from '@/components/home/ContactUs';
import Goals from '@/components/home/Goals';
import Hero from '@/components/home/Hero';
import Info from '@/components/home/Info';
import Issues from '@/components/home/Issues';
import Services from '@/components/home/Services';
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
