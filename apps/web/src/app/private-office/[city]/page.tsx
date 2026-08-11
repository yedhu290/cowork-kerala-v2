import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import HeroSection from '../Section/HeroSection';
import ContactSection from '../Section/ContactSection';
import GallerySection from '../Section/GallerySection';
import SolutionsSection from '../Section/SolutionsSection';
import { getLocations } from '@/services/locations';

type Props = {
    params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params;
    // Capitalize the city name for display
    const displayCity = city.charAt(0).toUpperCase() + city.slice(1);

    const title = `Private Office Space in ${displayCity} | CoWork Kerala`;
    const description = `Set up a customised, fully private office for your team in ${displayCity}. Get independent cabins and branded suites with layout, amenities, and services tailored to your requirements.`;

    return {
        title,
        description,
        keywords: [
            `private office ${displayCity}`,
            `custom office space ${displayCity}`,
            `independent office ${displayCity}`,
            'branded office suites',
            'team office Kerala',
            'dedicated office space',
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
            canonical: `https://coworkkerala.com/private-office/${city.toLowerCase()}`,
        },
    };
}

export const revalidate = 60; // Revalidate every 60 seconds

const CityPrivateOfficePage = async ({ params }: Props) => {
    const { city } = await params;
    const displayCity = city.charAt(0).toUpperCase() + city.slice(1);
    const locations = await getLocations();

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col">
                <Header />
            </Fixedw>
            <HeroSection city={displayCity} />
            <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                <ContactSection locations={locations} selectedCity={city} />
                {/* <GallerySection /> */}
            </Fixedw>
            <SolutionsSection />
            <div className="mt-12 md:mt-24">
                <Footer />
            </div>
        </>
    );
};

export default CityPrivateOfficePage;
