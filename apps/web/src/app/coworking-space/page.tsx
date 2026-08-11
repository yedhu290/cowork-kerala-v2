import React from 'react';
import { Metadata } from 'next';
import HeroSection from './Section/HeroSection';
import WorkspaceListing from './Section/WorkspaceListing';
import FilterSection from './Section/FilterSection';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import { getLocations } from '@/services/locations';
import { getWorkspaces } from '@/services/workspace.service';

export const metadata: Metadata = {
    title: 'Find Your Perfect Workspace | CoWork Kerala',
    description:
        'Explore top-rated coworking spaces across Kerala. Book hot desks, dedicated desks, and private offices.',
    openGraph: {
        title: 'Find Your Perfect Workspace | CoWork Kerala',
        description:
            'Explore top-rated coworking spaces across Kerala. Book hot desks, dedicated desks, and private offices.',
    },
};

export const revalidate = 60; // Revalidate every 60 seconds

const CoWorkingSpace = async () => {
    const [locations, workspacesResponse] = await Promise.all([getLocations(), getWorkspaces({})]);

    const workspaces = workspacesResponse?.data || [];

    return (
        <Fixedw className="container mx-auto md:px-8 flex flex-col gap-12">
            <Header />
            <HeroSection />
            <FilterSection locations={locations} />
            <WorkspaceListing workspaces={workspaces} locations={locations} />
            <Footer />
        </Fixedw>
    );
};

export default CoWorkingSpace;
