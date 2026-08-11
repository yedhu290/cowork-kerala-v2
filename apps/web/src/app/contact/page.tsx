import { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import Header from '@/components/ui/HeaderServer';
import React from 'react';
import Fixedw from '@/components/ui/Fixedw';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Hero from './Section/HeroSection';
import ContactSection from './Section/ContactSection';
import ContactCta from './Section/ContactCta';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
    title: 'Contact CoWork Kerala | Workspace Enquiries Kerala',
    description:
        'Contact CoWork Kerala to find coworking spaces, virtual offices or private offices in Kochi, Trivandrum, Calicut and Thrissur. Tell us what you need today.',
    keywords: [
        'contact CoWork Kerala',
        'coworking space help',
        'virtual office support Kerala',
        'workspace booking Kerala',
        'office space enquiry',
    ],
    openGraph: {
        title: 'Contact CoWork Kerala | Workspace Enquiries Kerala',
        description:
            'Have questions or need help shortlisting spaces? The CoWork Kerala team can assist with workspace discovery, virtual office selection, and end-to-end booking support.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact CoWork Kerala',
        description:
            'Get help finding coworking spaces, private offices, or virtual offices across Kerala.',
        images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
        canonical: '/contact',
    },
};

const ContactPage = () => {
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
                            { name: 'Contact', url: '/contact' },
                        ]}
                    />
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col gap-16 md:gap-24 mt-8 mb-16 md:mb-24">
                    <Hero />
                    <ContactSection />
                    <ContactCta />
                </Fixedw>
            </main>
            <Footer />
        </>
    );
};

export default ContactPage;
