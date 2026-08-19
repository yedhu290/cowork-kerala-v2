import React from 'react';
import { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, serviceJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Header from '@/components/ui/HeaderServer';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import HeroSection from './Section/HeroSection';
import ContactSection from './Section/ContactSection';
import GallerySection from './Section/GallerySection';
import SolutionsSection from './Section/SolutionsSection';
import PrivateOfficeInfo from './Section/PrivateOfficeInfo';
import CtaBand from './Section/CtaBand';
import FaqSection from '@/components/seo/FaqSection';
import { privateOfficeFaqs } from '@/lib/privateOfficeContent';
import { getLocations } from '@/services/locations';

export const metadata: Metadata = {
    title: 'Private Office in Kerala | Furnished Cabins for Teams',
    description:
        'Rent a private, furnished office for your team in Kerala — independent cabins in Kochi and other cities, amenities included. Enquire for a quote today.',
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
        title: 'Private Office in Kerala | Furnished Cabins for Teams',
        description:
            'Get a secure, customised private office with layout, amenities, and services configured to your requirements. Your office, your way.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Private Office Space in Kerala | CoWork Kerala',
        description:
            'Set up a fully private, customised office for your team in Kochi and other key cities.',
        images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
        canonical: '/private-office',
    },
};

// ISR: marketing content refreshes hourly
export const revalidate = 3600;

const PrivateOfficePage = async () => {
    const locations = await getLocations();

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col">
                <Header />
            </Fixedw>
            <main>
                <JsonLd
                    data={serviceJsonLd({
                        name: 'Private Office Space in Kerala',
                        description:
                            'Customised, fully private offices for teams in Kerala — independent cabins and branded suites with layout, amenities, and services tailored to your requirements.',
                        path: '/private-office',
                        serviceType: 'Private office',
                    })}
                />
                <HeroSection />
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-16 md:mb-24">
                    <PrivateOfficeInfo locations={locations} />
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <GallerySection />
                </Fixedw>
                <SolutionsSection />
                <Fixedw className="container mx-auto md:px-8 flex flex-col my-12 md:my-20">
                    <div className="mx-auto w-full max-w-3xl">
                        <FaqSection faqs={privateOfficeFaqs} heading="Private office FAQs" />
                    </div>
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <ContactSection locations={locations} />
                </Fixedw>
                <CtaBand />
            </main>
            <div className="mt-12 md:mt-24">
                <Footer />
            </div>
        </>
    );
};

export default PrivateOfficePage;
