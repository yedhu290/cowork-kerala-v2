import React from 'react';
import { getLocations } from '@/services/locations';
import { Metadata } from 'next';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import HeroSection from './Section/HeroSection';
import ServicesSection from './Section/ServicesSection';
import ContactSection from './Section/ContactSection';
import FeatureSection from './Section/FeatureSection';

export const metadata: Metadata = {
    title: 'Virtual Office in Kochi – GST & Company Registration Address | CoWork Kerala',
    description:
        'Get GST-compliant virtual office in Kerala with a prime business address, documentation, and mail handling at flexible prices at Kochi, Trivandrum, Calicut, Thrissur and more. Book your virtual office online with CoWork Kerala today.',
    keywords: [
        'virtual office Kerala',
        'virtual office Kochi',
        'GST registration address Kerala',
        'company registration address Kochi',
        'business address Kerala',
        'mail handling Kerala',
        'virtual office Trivandrum',
        'virtual office Calicut',
    ],
    openGraph: {
        title: 'Virtual Office in Kochi – GST & Company Registration Address | CoWork Kerala',
        description:
            'Virtual offices ideal for startups, freelancers, and remote-first teams. Get local presence and credibility while keeping overheads low.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Virtual Office in Kerala | CoWork Kerala',
        description:
            'Get GST-compliant virtual office with prime business address in Kochi, Trivandrum, Calicut.',
    },
    alternates: {
        canonical: 'https://coworkkerala.com/virtual-office',
    },
};

export const revalidate = 60; // Revalidate every 60 seconds

const VirtualOfficePage = async () => {
    const locations = await getLocations();

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                <Header />
                <HeroSection />
            </Fixedw>
            <ServicesSection />
            <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                <ContactSection locations={locations} />
            </Fixedw>
            <FeatureSection />
            <div className="mt-12 md:mt-24">
                <Footer />
            </div>
        </>
    );
};

export default VirtualOfficePage;
