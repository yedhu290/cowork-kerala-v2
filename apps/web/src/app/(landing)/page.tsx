import { Metadata } from 'next';
import Header from '@/components/ui/Header';
import Hero from './Section/Hero';
import Featured from './Section/Featured';
import WhyChoose from './Section/WhyChoose';
import HeroCTA from './Section/HeroCTA';
import ContactForm from './Section/ContactForm';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import SpaceAdapts from './Section/SpaceAdapts';
import LocationsSection from './Section/LocationsSection';
import { getLocations } from '@/services/locations';
import PopularLocations from './Section/PopularLocations';

export const metadata: Metadata = {
    title: 'Best Coworking Spaces in Kerala | Book Online | CoWork Kerala',
    description:
        "Find and book coworking spaces and virtual offices in Kerala. Our platform offers flexible office spaces designed for today's remote professionals, startups, and businesses. Compare prices, amenities, and locations across Kochi, Thiruvananthapuram, Calicut, Thrissur. Book instantly online.",
    keywords: [
        'coworking spaces Kerala',
        'virtual office Kerala',
        'shared office space Kochi',
        'coworking Trivandrum',
        'coworking Calicut',
        'flexible office space',
        'hot desk Kerala',
        'private office Kochi',
    ],
    openGraph: {
        title: 'Best Coworking Spaces in Kerala | Book Online | CoWork Kerala',
        description:
            "Discover premium coworking spaces and virtual offices across God's Own Country. Professional workspaces in Kochi, Trivandrum, Calicut, Thrissur and more.",
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Coworking Spaces in Kerala | CoWork Kerala',
        description:
            'Find and book coworking spaces and virtual offices in Kerala. Compare prices and book instantly online.',
    },
    alternates: {
        canonical: 'https://coworkkerala.com',
    },
};

export const revalidate = 60; // Revalidate every 60 seconds

const Page = async () => {
    const locations = await getLocations();

    return (
        <div className="min-h-screen">
            <Fixedw className="container mx-auto md:px-8 flex flex-col">
                <Header />
                <Hero locations={locations} />
                <SpaceAdapts />
                <Featured />
                <LocationsSection locations={locations} />
            </Fixedw>
            <ContactForm locations={locations} />
            <Fixedw>
                <WhyChoose />
            </Fixedw>
            <HeroCTA locations={locations} />
            <Footer />
        </div>
    );
};

export default Page;
