import { Metadata } from 'next';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import Header from '@/components/ui/Header';
import Hero from './Section/Hero';
import Featured from './Section/Featured';
import WhyChoose from './Section/WhyChoose';
import HeroCTA from './Section/HeroCTA';
import ContactForm from './Section/ContactForm';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import SpaceAdapts from './Section/SpaceAdapts';
import LocationsSection from './Section/LocationsSection';
import { getLocations } from '@/services/locations';
import ServiceSolutions from '@/components/seo/ServiceSolutions';
import FaqSection from '@/components/seo/FaqSection';
import RelatedArticles from '@/components/blog/RelatedArticles';
import { homeFaqs } from '@/lib/homeContent';
import { getPostsPreferringTags } from '@/lib/blog';

export const metadata: Metadata = {
    title: 'Coworking Spaces & Virtual Offices in Kerala | CoWork',
    description:
        'Find and book coworking spaces, virtual offices and private offices across Kerala — Kochi, Trivandrum, Calicut and Thrissur. Compare prices and book online.',
    keywords: [
        'coworking spaces Kerala',
        'virtual office Kerala',
        'shared office space Kochi',
        'coworking Trivandrum',
        'coworking Calicut',
        'flexible office space',
        'hot desk Kerala',
        'private office Kochi',
    ],
    openGraph: {
        title: 'Coworking Spaces & Virtual Offices in Kerala | CoWork',
        description:
            "Discover premium coworking spaces and virtual offices across God's Own Country. Professional workspaces in Kochi, Trivandrum, Calicut, Thrissur and more.",
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Coworking Spaces in Kerala | CoWork Kerala',
        description:
            'Find and book coworking spaces and virtual offices in Kerala. Compare prices and book instantly online.',
        images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
        canonical: '/',
    },
};

// ISR: home content refreshes hourly (featured-space fetch caps freshness at 5 min)
export const revalidate = 3600;

const Page = async () => {
    const locations = await getLocations();
    const latestPosts = getPostsPreferringTags(['Coworking', 'Guide', 'Virtual Office']);

    return (
        <div className="min-h-screen">
            <Fixedw className="container mx-auto md:px-8 flex flex-col">
                <Header />
            </Fixedw>
            <main>
                <Fixedw className="container mx-auto md:px-8 flex flex-col">
                    <Hero locations={locations} />
                    <SpaceAdapts />
                    <ServiceSolutions />
                    <Featured />
                    <LocationsSection locations={locations} />
                    <section className="mb-12 md:mb-20">
                        <RelatedArticles
                            posts={latestPosts}
                            heading="From our blog"
                            intro="Practical guides on coworking, virtual offices and choosing the right workspace in Kerala."
                        />
                    </section>
                </Fixedw>
                <ContactForm locations={locations} />
                <Fixedw>
                    <WhyChoose />
                    <section className="mx-auto max-w-3xl py-8 md:py-12">
                        <FaqSection
                            faqs={homeFaqs}
                            heading="Frequently asked questions about workspaces in Kerala"
                        />
                    </section>
                </Fixedw>
                <HeroCTA locations={locations} />
            </main>
            <div className="mt-12 md:mt-24">
                <Footer />
            </div>
        </div>
    );
};

export default Page;
