import React from 'react';
import { getLocations } from '@/services/locations';
import { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, serviceJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Header from '@/components/ui/HeaderServer';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import HeroSection from './Section/HeroSection';
import ServicesSection from './Section/ServicesSection';
import ContactSection from './Section/ContactSection';
import FeatureSection from './Section/FeatureSection';
import VirtualOfficeInfo from '@/components/seo/VirtualOfficeInfo';
import FaqSection from '@/components/seo/FaqSection';
import RelatedArticles from '@/components/blog/RelatedArticles';
import { virtualOfficeFaqs } from '@/lib/virtualOfficeContent';
import { getPostsPreferringTags } from '@/lib/blog';

export const metadata: Metadata = {
    title: 'Virtual Office in Kerala | GST Registration Address',
    description:
        'Get a GST-compliant virtual office in Kerala with a prime business address, mail handling and documents. Available in Kochi, Trivandrum and more. Enquire today.',
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
        title: 'Virtual Office in Kerala | GST Registration Address',
        description:
            'Virtual offices ideal for startups, freelancers, and remote-first teams. Get local presence and credibility while keeping overheads low.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Virtual Office in Kerala | CoWork Kerala',
        description:
            'Get GST-compliant virtual office with prime business address in Kochi, Trivandrum, Calicut.',
        images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
        canonical: '/virtual-office',
    },
};

// ISR: marketing content refreshes hourly
export const revalidate = 3600;

const VirtualOfficePage = async () => {
    const locations = await getLocations();
    const relatedPosts = getPostsPreferringTags(['Virtual Office', 'GST', 'Compliance']);

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col">
                <Header />
            </Fixedw>
            <main>
                <JsonLd
                    data={serviceJsonLd({
                        name: 'Virtual Office in Kerala',
                        description:
                            'GST-compliant virtual offices with a prime business address, documentation, and mail handling across Kochi, Trivandrum, Calicut, and Thrissur.',
                        path: '/virtual-office',
                        serviceType: 'Virtual office',
                    })}
                />
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <HeroSection />
                </Fixedw>
                <ServicesSection />
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <VirtualOfficeInfo locations={locations} />
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <ContactSection locations={locations} />
                </Fixedw>
                <FeatureSection />
                <Fixedw className="container mx-auto md:px-8 flex flex-col mt-12 md:mt-24 mb-12 md:mb-24">
                    <div className="max-w-3xl">
                        <FaqSection faqs={virtualOfficeFaqs} />
                    </div>
                </Fixedw>
                <Fixedw className="container mx-auto md:px-8 flex flex-col mb-12 md:mb-24">
                    <RelatedArticles
                        posts={relatedPosts}
                        intro="Guides on virtual offices, GST registration and choosing the right workspace in Kerala."
                    />
                </Fixedw>
            </main>
            <div className="mt-12 md:mt-24">
                <Footer />
            </div>
        </>
    );
};

export default VirtualOfficePage;
