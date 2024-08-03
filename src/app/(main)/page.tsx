import AboutUs from '@/components/home/about-us';
import Benefits from '@/components/home/benefits';
import Goals from '@/components/home/goals';
import Hero from '@/components/home/hero';
import Info from '@/components/home/info';
import Issues from '@/components/home/issues';
import Services from '@/components/home/services';

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
        </>
    );
}
