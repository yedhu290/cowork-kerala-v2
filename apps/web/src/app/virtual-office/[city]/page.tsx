import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import Header from '@/components/ui/HeaderServer';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CitySeoContent from '@/components/seo/CitySeoContent';
import RelatedArticles from '@/components/blog/RelatedArticles';
import HeroSection from '../Section/HeroSection';
import ContactSection from '../Section/ContactSection';
import { getCityServiceContent } from '@/lib/cityContent';
import { getPostsPreferringTags } from '@/lib/blog';
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

    const content = getCityServiceContent(city, 'virtual-office', displayCity);
    const title = content.metaTitle;
    const description = content.metaDescription;

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
            images: [DEFAULT_OG_IMAGE],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [DEFAULT_OG_IMAGE],
        },
        alternates: {
            canonical: `/virtual-office/${city.toLowerCase()}`,
        },
    };
}

export async function generateStaticParams() {
    const locations = await getLocations();
    return locations.map((location) => ({ city: location.name.toLowerCase() }));
}

// ISR: marketing content refreshes hourly
export const revalidate = 3600;

const CityVirtualOfficePage = async ({ params }: Props) => {
    const { city } = await params;

    if (!(await isKnownCity(city))) {
        notFound();
    }

    const displayCity = city.charAt(0).toUpperCase() + city.slice(1);
    const locations = await getLocations();
    const relatedPosts = getPostsPreferringTags(['Virtual Office', 'GST', 'Compliance']);

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
                            { name: 'Virtual Office', url: '/virtual-office' },
                            { name: displayCity, url: `/virtual-office/${city.toLowerCase()}` },
                        ]}
                    />
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <HeroSection city={displayCity} />
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <ContactSection locations={locations} selectedCity={city} />
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <CitySeoContent
                        citySlug={city}
                        service="virtual-office"
                        displayName={displayCity}
                    />
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <RelatedArticles
                        posts={relatedPosts}
                        heading="Helpful reading"
                        intro={`Guides on virtual offices, GST registration and choosing a workspace in ${displayCity} and across Kerala.`}
                    />
                </Fixedw>
            </main>
            <div className="mt-12 md:mt-24">
                <Footer />
            </div>
        </>
    );
};

export default CityVirtualOfficePage;
