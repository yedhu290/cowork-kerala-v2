import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CtaSection from './Section/CtaSection';
import Footer from '@/components/ui/Footer';
import GallerySection from './Section/GallerySection';
import Header from '@/components/ui/HeaderServer';
import OtherLocationsSection from './Section/OtherLocationsSection';
import OverviewSection from './Section/OverviewSection';
import Fixedw from '@/components/ui/Fixedw';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { DEFAULT_OG_IMAGE, workspaceProductJsonLd } from '@/lib/seo';
import { getWorkspaceById, getWorkspaces } from '@/services/workspace.service';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const response = await getWorkspaceById(id);

    // Trigger the 404 during metadata resolution too. If metadata returns a
    // normal object for a missing workspace, the response commits a 200 before
    // the page's own notFound() runs, producing a soft 404.
    if (!response?.data) {
        notFound();
    }

    const workspace = response.data;
    const shareImage = workspace.images?.[0] || DEFAULT_OG_IMAGE;

    return {
        title: `${workspace.spaceName}, ${workspace.city.name} | CoWork Kerala`,
        description:
            workspace.shortDescription ||
            `Discover ${workspace.spaceName} - ${workspace.spaceType} in ${workspace.city.name}. Book your workspace today.`,
        openGraph: {
            title: `${workspace.spaceName}, ${workspace.city.name} | CoWork Kerala`,
            description:
                workspace.shortDescription || `${workspace.spaceType} in ${workspace.city.name}`,
            type: 'website',
            images: [shareImage],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${workspace.spaceName}, ${workspace.city.name} | CoWork Kerala`,
            description:
                workspace.shortDescription || `${workspace.spaceType} in ${workspace.city.name}`,
            images: [shareImage],
        },
        alternates: {
            canonical: `/coworking-space/details/${id}`,
        },
    };
}

// Detail pages are rendered dynamically rather than statically. With static/ISR
// generation, notFound() for an unknown id was cached and served as a soft 404
// (HTTP 200), which search engines can index as a real page. Dynamic rendering
// returns a proper 404 for invalid ids, keeps newly-added workspaces viewable
// immediately, and always reflects current pricing and availability.
export const dynamic = 'force-dynamic';

const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    const response = await getWorkspaceById(id);

    if (!response?.data) {
        notFound();
    }

    const workspace = response.data;

    // Fetch other workspaces in the same city
    const otherWorkspacesResponse = await getWorkspaces({ city: workspace.city.name, limit: 10 });
    const otherWorkspaces =
        otherWorkspacesResponse?.data?.filter((w) => w.id !== workspace.id) || [];

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col md:gap-12 gap-4">
                <Header />
                <main className="flex flex-col md:gap-12 gap-4">
                    <JsonLd
                        data={workspaceProductJsonLd(
                            workspace,
                            `/coworking-space/details/${id}`,
                        )}
                    />
                    <Breadcrumbs
                        items={[
                            { name: 'Home', url: '/' },
                            { name: 'Coworking Spaces', url: '/coworking-space' },
                            {
                                name: workspace.city.name,
                                url: `/coworking-space/${workspace.city.name.toLowerCase()}`,
                            },
                            {
                                name: workspace.spaceName,
                                url: `/coworking-space/details/${id}`,
                            },
                        ]}
                    />
                    <GallerySection workspace={workspace} />
                    <div className="mt-10" />
                    <OverviewSection workspace={workspace} />
                    <div className="mt-10" />
                    <CtaSection workspace={workspace} />
                    <div className="mt-10" />
                    <OtherLocationsSection
                        workspaces={otherWorkspaces}
                        cityName={workspace.city.name}
                    />
                    <div className="mt-10" />
                </main>
            </Fixedw>
            <Footer />
        </>
    );
};

export default Page;
