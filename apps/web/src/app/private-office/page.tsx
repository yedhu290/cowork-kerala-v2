import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import HeroSection from './Section/HeroSection';
import ContactSection from './Section/ContactSection';
import GallerySection from './Section/GallerySection';
import SolutionsSection from './Section/SolutionsSection';
import { getLocations } from '@/services/locations';

export const metadata: Metadata = {
    title: 'Custom Private Office Space in Kerala | Independent Offices in Kochi',
    description:
        'Set up a customised, fully private office for your team anywhere in Kerala with CoWork Kerala. Get independent cabins and branded suites in Kochi and other key cities, with layout, amenities, and services tailored to your requirements.',
    keywords: [
        'private office Kerala',
        'private office Kochi',
        'custom office space Kerala',
        'independent office Kochi',
        'branded office suites',
        'team office Kerala',
        'dedicated office space',
    ],
    openGraph: {
        title: 'Custom Private Office Space in Kerala | Independent Offices in Kochi',
        description:
            'Get a secure, customised private office with layout, amenities, and services configured to your requirements. Your office, your way.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Private Office Space in Kerala | CoWork Kerala',
        description:
            'Set up a fully private, customised office for your team in Kochi and other key cities.',
    },
    alternates: {
        canonical: 'https://coworkkerala.com/private-office',
    },
};

export const revalidate = 60; // Revalidate every 60 seconds

const PrivateOfficePage = async () => {
    const locations = await getLocations();

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col">
                <Header />
            </Fixedw>
            <HeroSection />
            <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                <ContactSection locations={locations} />
                {/* <GallerySection /> */}
            </Fixedw>
            <SolutionsSection />
            <div className="mt-12 md:mt-24">
                <Footer />
            </div>
        </>
    );
};

export default PrivateOfficePage;
