import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import HeroSection from '../Section/HeroSection';
import ServicesSection from '../Section/ServicesSection';
import ContactSection from '../Section/ContactSection';
import FeatureSection from '../Section/FeatureSection';
import { getLocations } from '@/services/locations';

type Props = {
    params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params;
    // Capitalize the city name for display
    const displayCity = city.charAt(0).toUpperCase() + city.slice(1);

    const title = `Virtual Office in ${displayCity} | GST & Company Registration | CoWork Kerala`;
    const description = `Get GST-compliant virtual office in ${displayCity} with a prime business address, documentation, and mail handling. Flexible pricing plans available in ${displayCity}. Book online now.`;

    return {
        title,
        description,
        keywords: [
            `virtual office ${displayCity}`,
            `GST registration address ${displayCity}`,
            `company registration address ${displayCity}`,
            `business address ${displayCity}`,
            'mail handling Kerala',
            'startup registration',
        ],
        openGraph: {
            title,
            description,
            type: 'website',
            locale: 'en_IN',
            siteName: 'CoWork Kerala',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
        alternates: {
            canonical: `https://coworkkerala.com/virtual-office/${city.toLowerCase()}`,
        },
    };
}

export const revalidate = 60; // Revalidate every 60 seconds

const CityVirtualOfficePage = async ({ params }: Props) => {
    const { city } = await params;
    const displayCity = city.charAt(0).toUpperCase() + city.slice(1);
    const locations = await getLocations();

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                <Header />
                <HeroSection city={displayCity} />
            </Fixedw>
            <ServicesSection />
            <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                <ContactSection locations={locations} selectedCity={city} />
            </Fixedw>
            <FeatureSection />
            <div className="mt-12 md:mt-24">
                <Footer />
            </div>
        </>
    );
};

export default CityVirtualOfficePage;
