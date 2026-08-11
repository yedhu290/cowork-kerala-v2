import { Metadata } from 'next';
import Header from '@/components/ui/Header';
import React from 'react';
import Fixedw from '@/components/ui/Fixedw';
import Hero from './Section/HeroSection';
import ContactSection from './Section/ContactSection';
import BenefitsSection from './Section/BenefitsSection';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
    title: 'Contact CoWork Kerala | Workspace & Virtual Office Support',
    description:
        'Contact CoWork Kerala for help finding coworking spaces, private offices, or virtual offices across Kerala, including Kochi, Thiruvananthapuram, and Calicut. Share your requirements and our team will shortlist spaces, arrange visits, and assist with bookings.',
    keywords: [
        'contact CoWork Kerala',
        'coworking space help',
        'virtual office support Kerala',
        'workspace booking Kerala',
        'office space enquiry',
    ],
    openGraph: {
        title: 'Contact CoWork Kerala | Workspace & Virtual Office Support',
        description:
            'Have questions or need help shortlisting spaces? The CoWork Kerala team can assist with workspace discovery, virtual office selection, and end-to-end booking support.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact CoWork Kerala',
        description:
            'Get help finding coworking spaces, private offices, or virtual offices across Kerala.',
    },
    alternates: {
        canonical: 'https://coworkkerala.com/contact',
    },
};

const VirtualOffice = () => {
    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col gap-12 mb-12 md:mb-24">
                <Header />
                <Hero />
                <ContactSection />
                <BenefitsSection />
            </Fixedw>
            <Footer />
        </>
    );
};

export default VirtualOffice;
