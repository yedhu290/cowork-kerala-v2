import { Metadata } from 'next';
import Header from '@/components/ui/Header';
import Fixedw from '@/components/ui/Fixedw';
import Footer from '@/components/ui/Footer';
import HeroSection from './Section/HeroSection';
import AboutIntroSection from './Section/AboutIntroSection';
import OurValuesSection from './Section/OurValuesSection';
import GlimpseInsideSection from './Section/GlimpseInsideSection';
import TeamSection from './Section/TeamSection';
import TrustedCompaniesSection from './Section/TrustedCompaniesSection';

export const metadata: Metadata = {
    title: 'About CoWork Kerala - Revolutionizing Flexible Work in Kerala',
    description:
        "CoWork Kerala connects freelancers, startups, and enterprises with premium coworking spaces. Learn how we're transforming the future of work across Kerala.",
    keywords: [
        'about CoWork Kerala',
        'coworking platform Kerala',
        'flexible workspace Kerala',
        'remote work Kerala',
        'startup workspace',
        'enterprise workspace Kerala',
    ],
    openGraph: {
        title: 'About CoWork Kerala - Revolutionizing Flexible Work in Kerala',
        description:
            'CoWork Kerala brings together the best coworking spaces in Kerala on one unified platform. Find the ideal workspace that matches your budget, location, and professional needs.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About CoWork Kerala',
        description: 'Learn how CoWork Kerala is transforming the future of work across Kerala.',
    },
    alternates: {
        canonical: 'https://coworkkerala.com/about',
    },
};

const VirtualOffice = () => {
    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col gap-12 mb-12 md:mb-24">
                <Header />
                <HeroSection />
                <AboutIntroSection />
                <OurValuesSection />
                {/* <GlimpseInsideSection /> */}
                {/* <TeamSection /> */}
                {/* <TrustedCompaniesSection /> */}
            </Fixedw>
            <Footer />
        </>
    );
};

export default VirtualOffice;
