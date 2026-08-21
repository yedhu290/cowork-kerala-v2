import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import Header from '@/components/ui/HeaderServer';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CitySeoContent from '@/components/seo/CitySeoContent';
import HeroSection from '../Section/HeroSection';
import ContactSection from '../Section/ContactSection';
import GallerySection from '../Section/GallerySection';
import { getCityServiceContent } from '@/lib/cityContent';
import { getLocations, isKnownCity } from '@/services/locations';

type Props = {
    params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params;

    // Unknown city slugs 404 (avoids a soft 404 with generic fallback content).
    if (!(await isKnownCity(city))) {
        notFound();
    }

    // Capitalize the city name for display
    const displayCity = city.charAt(0).toUpperCase() + city.slice(1);

    const content = getCityServiceContent(city, 'private-office', displayCity);
    const title = content.metaTitle;
    const description = content.metaDescription;

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
            images: [DEFAULT_OG_IMAGE],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [DEFAULT_OG_IMAGE],
        },
        alternates: {
            canonical: `/private-office/${city.toLowerCase()}`,
        },
    };
}

export async function generateStaticParams() {
    const locations = await getLocations();
    return locations.map((location) => ({ city: location.name.toLowerCase() }));
}

// ISR: marketing content refreshes hourly
export const revalidate = 3600;

const CityPrivateOfficePage = async ({ params }: Props) => {
    const { city } = await params;

    if (!(await isKnownCity(city))) {
        notFound();
    }

    const displayCity = city.charAt(0).toUpperCase() + city.slice(1);
    const locations = await getLocations();

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
                            { name: 'Private Office', url: '/private-office' },
                            { name: displayCity, url: `/private-office/${city.toLowerCase()}` },
                        ]}
                    />
                </Fixedw>
                <HeroSection city={displayCity} />
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <ContactSection locations={locations} selectedCity={city} />
                    {/* <GallerySection /> */}
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <CitySeoContent
                        citySlug={city}
                        service="private-office"
                        displayName={displayCity}
                    />
                </Fixedw>
            </main>
            <div className="mt-12 md:mt-24">
                <Footer />
            </div>
        </>
    );
};

export default CityPrivateOfficePage;
