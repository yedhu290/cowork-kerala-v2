import React from 'react';
import { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, serviceJsonLd } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import HeroSection from './Section/HeroSection';
import WorkspaceListing from './Section/WorkspaceListing';
import FilterSection from './Section/FilterSection';
import Header from '@/components/ui/HeaderServer';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import KeralaCoworkingSeo from '@/components/seo/KeralaCoworkingSeo';
import { getLocations } from '@/services/locations';
import { getWorkspaces } from '@/services/workspace.service';
import { getCoworkingContent } from '@/services/coworkingContent';
import { COWORKING_CITY_CARDS, type CityCard } from '@/lib/keralaContent';

export const metadata: Metadata = {
    title: 'Coworking Spaces in Kerala | Book Hot Desks Online',
    description:
        'Browse coworking spaces across Kerala — hot desks, dedicated desks and private cabins in Kochi, Trivandrum, Calicut and Thrissur. Compare and book online.',
    keywords: [
        'coworking spaces Kerala',
        'hot desk Kerala',
        'dedicated desk Kochi',
        'shared office space Kerala',
        'book workspace Kerala',
    ],
    openGraph: {
        title: 'Coworking Spaces in Kerala | Book Hot Desks Online',
        description:
            'Explore top-rated coworking spaces across Kerala. Book hot desks, dedicated desks, and private offices.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'CoWork Kerala',
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Coworking Spaces in Kerala | Book Hot Desks Online',
        description:
            'Explore top-rated coworking spaces across Kerala. Book hot desks, dedicated desks, and private offices.',
        images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
        canonical: '/coworking-space',
    },
};

// ISR: refresh workspace inventory every 5 minutes
export const revalidate = 300;

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const CoWorkingSpace = async ({ searchParams }: Props) => {
    const params = await searchParams;
    const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
    const search = typeof params.search === 'string' ? params.search : undefined;

    const [locations, workspacesResponse, coworkingContent] = await Promise.all([
        getLocations(),
        getWorkspaces({ page, limit: 9, search }),
        getCoworkingContent(),
    ]);

    const workspaces = workspacesResponse?.data || [];
    const pagination = workspacesResponse?.pagination;

    // City cards are driven by the dashboard-managed Locations. Fall back to the
    // curated blurb (matched by slug) when a Location has no description, and to
    // the full hardcoded set if the locations service returns nothing.
    const fallbackCardBySlug = new Map(
        COWORKING_CITY_CARDS.map((card) => [card.slug, card])
    );
    const cityCards: CityCard[] =
        locations.length > 0
            ? locations.map((loc) => {
                  const slug = loc.name.toLowerCase();
                  const fallback = fallbackCardBySlug.get(slug);
                  return {
                      slug,
                      name: loc.name,
                      blurb:
                          loc.description?.trim() ||
                          fallback?.blurb ||
                          `Coworking spaces in ${loc.name}, Kerala.`,
                      image: loc.image || undefined,
                  };
              })
            : COWORKING_CITY_CARDS;

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col gap-12 mb-12 md:mb-24">
                <Header />
                <main className="flex flex-col gap-12">
                    <JsonLd
                        data={serviceJsonLd({
                            name: 'Coworking Spaces in Kerala',
                            description:
                                'Explore top-rated coworking spaces across Kerala. Book hot desks, dedicated desks, and private offices.',
                            path: '/coworking-space',
                            serviceType: 'Coworking space',
                        })}
                    />
                    <HeroSection />
                    <FilterSection locations={locations} />
                    <section className="flex flex-col gap-8">
                        <h2 className="heading-subsection text-zinc-900">
                            Coworking spaces ready to book
                        </h2>
                        <WorkspaceListing
                            workspaces={workspaces}
                            locations={locations}
                            pagination={pagination}
                        />
                    </section>
                    <KeralaCoworkingSeo
                        content={coworkingContent}
                        cityCards={cityCards}
                    />
                </main>
            </Fixedw>
            <Footer />
        </>
    );
};

export default CoWorkingSpace;
