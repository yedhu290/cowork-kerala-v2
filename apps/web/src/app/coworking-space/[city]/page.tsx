import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import HeroSection from '../Section/HeroSection';
import WorkspaceListing from '../Section/WorkspaceListing';
import FilterSection from '../Section/FilterSection';
import Header from '@/components/ui/HeaderServer';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CitySeoContent from '@/components/seo/CitySeoContent';
import { getCityServiceContent } from '@/lib/cityContent';
import { getLocations, isKnownCity } from '@/services/locations';
import { getWorkspaces } from '@/services/workspace.service';

type Props = {
    params: Promise<{ city: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params;

    // This route reads searchParams for the listing's page/search state, so it
    // always renders dynamically and cannot return a real 404 - notFound()
    // cannot set the status once the response has begun streaming. The sibling
    // /virtual-office and /private-office routes use dynamicParams = false for
    // that, which is not available here.
    //
    // So unknown slugs are marked noindex instead. The page still renders the
    // not-found view for people; this stops search engines indexing arbitrary
    // /coworking-space/<anything> URLs as thin duplicates.
    if (!(await isKnownCity(city))) {
        return {
            title: 'Page not found | CoWork Kerala',
            robots: { index: false, follow: false },
        };
    }

    // Capitalize the city name for display
    const displayCity = city.charAt(0).toUpperCase() + city.slice(1);

    const content = getCityServiceContent(city, 'coworking-space', displayCity);
    const title = content.metaTitle;
    const description = content.metaDescription;

    return {
        title,
        description,
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
            canonical: `/coworking-space/${city.toLowerCase()}`,
        },
    };
}

// Rendered on demand, not prerendered: this page reads `searchParams` for the
// listing's page/search state, which a statically generated page cannot do.
// Pairing it with generateStaticParams made Next choose static rendering
// whenever the locations API returned nothing at build time, and the
// searchParams access then threw DYNAMIC_SERVER_USAGE — a 500 on every city
// page instead of the intended fallback content.
// Freshness still comes from the per-fetch revalidate in the services layer.
export const dynamic = 'force-dynamic';

const CityWorkspacePage = async ({ params, searchParams }: Props) => {
    const { city } = await params;

    if (!(await isKnownCity(city))) {
        notFound();
    }

    const searchParamsData = await searchParams;

    // Capitalize the city name for the API call
    const cityStr = city.charAt(0).toUpperCase() + city.slice(1);

    const page =
        typeof searchParamsData.page === 'string' ? parseInt(searchParamsData.page, 10) : 1;
    const search =
        typeof searchParamsData.search === 'string' ? searchParamsData.search : undefined;

    const [locations, workspacesResponse] = await Promise.all([
        getLocations(),
        getWorkspaces({ city: cityStr, page, limit: 9, search }),
    ]);

    const workspaces = workspacesResponse?.data || [];
    const pagination = workspacesResponse?.pagination;

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col gap-12 mb-12 md:mb-24">
                <Header />
                <main className="flex flex-col gap-12">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', url: '/' },
                            { name: 'Coworking Spaces', url: '/coworking-space' },
                            { name: cityStr, url: `/coworking-space/${city.toLowerCase()}` },
                        ]}
                    />
                    <HeroSection
                        currentCity={city}
                        as={city === 'trivandrum' ? 'h3' : 'h1'}
                        headingClassName="text-3xl md:text-4xl font-medium leading-tight lg:w-72"
                    />
                    <FilterSection locations={locations} currentCity={city} />
                    <section className="flex flex-col gap-8">
                        <h2 className="heading-subsection text-zinc-900">
                            Available coworking spaces in {cityStr}
                        </h2>
                        <WorkspaceListing
                            workspaces={workspaces}
                            locations={locations}
                            pagination={pagination}
                        />
                    </section>
                    <CitySeoContent
                        citySlug={city}
                        service="coworking-space"
                        displayName={cityStr}
                    />
                </main>
            </Fixedw>
            <Footer />
        </>
    );
};

export default CityWorkspacePage;
