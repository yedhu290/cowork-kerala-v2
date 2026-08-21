import { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import Header from '@/components/ui/HeaderServer';
import Fixedw from '@/components/ui/Fixedw';
import Footer from '@/components/ui/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FaqSection from '@/components/seo/FaqSection';
import HeroSection from './Section/HeroSection';
import AboutIntroSection from './Section/AboutIntroSection';
import StatsSection from './Section/StatsSection';
import AboutCta from './Section/AboutCta';
import { aboutFaqs } from '@/lib/aboutContent';

export const metadata: Metadata = {
    title: 'About CoWork Kerala | Coworking & Offices in Kerala',
    description:
        'CoWork Kerala connects freelancers, startups and teams with coworking spaces, virtual offices and private offices across Kerala. Explore and book online.',
    keywords: [
        'about CoWork Kerala',
        'coworking platform Kerala',
        'flexible workspace Kerala',
        'remote work Kerala',
        'startup workspace',
        'enterprise workspace Kerala',
    ],
    openGraph: {
        title: 'About CoWork Kerala | Coworking & Offices in Kerala',
        description:
            'CoWork Kerala brings together the best coworking spaces in Kerala on one unified platform. Find the ideal workspace that matches your budget, location, and professional needs.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About CoWork Kerala',
        description: 'Learn how CoWork Kerala is transforming the future of work across Kerala.',
        images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
        canonical: '/about',
    },
};

const AboutPage = () => {
    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col">
                <Header />
            </Fixedw>
            <main>
                <Fixedw className="container mx-auto md:px-8 pt-4">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', url: '/' },
                            { name: 'About', url: '/about' },
                        ]}
                    />
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col gap-16 md:gap-24 mt-8 mb-16 md:mb-24">
                    <HeroSection />
                    <AboutIntroSection />
                    <StatsSection />
                    <div className="mx-auto w-full max-w-3xl">
                        <FaqSection faqs={aboutFaqs} heading="About CoWork Kerala — FAQs" />
                    </div>
                    <AboutCta />
                </Fixedw>
            </main>
            <Footer />
        </>
    );
};

export default AboutPage;
