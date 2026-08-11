import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CtaSection from './Section/CtaSection';
import Footer from '@/components/ui/Footer';
import GallerySection from './Section/GallerySection';
import Header from '@/components/ui/Header';
import OtherLocationsSection from './Section/OtherLocationsSection';
import OverviewSection from './Section/OverviewSection';
import Fixedw from '@/components/ui/Fixedw';
import { getWorkspaceById, getWorkspaces } from '@/services/workspace.service';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const response = await getWorkspaceById(id);

    if (!response?.data) {
        return {
            title: 'Workspace Not Found | CoWork Kerala',
        };
    }

    const workspace = response.data;

    return {
        title: `${workspace.spaceName} | CoWork Kerala`,
        description:
            workspace.shortDescription ||
            `Discover ${workspace.spaceName} - ${workspace.spaceType} in ${workspace.city.name}. Book your workspace today.`,
        openGraph: {
            title: `${workspace.spaceName} | CoWork Kerala`,
            description:
                workspace.shortDescription || `${workspace.spaceType} in ${workspace.city.name}`,
            type: 'website',
            images: workspace.images?.[0] ? [workspace.images[0]] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${workspace.spaceName} | CoWork Kerala`,
            description:
                workspace.shortDescription || `${workspace.spaceType} in ${workspace.city.name}`,
            images: workspace.images?.[0] ? [workspace.images[0]] : [],
        },
    };
}

export const revalidate = 60; // Revalidate every 60 seconds

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
            </Fixedw>
            <Footer />
        </>
    );
};

export default Page;
