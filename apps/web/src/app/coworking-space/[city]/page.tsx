import React from 'react';
import { Metadata } from 'next';
import HeroSection from '../Section/HeroSection';
import WorkspaceListing from '../Section/WorkspaceListing';
import FilterSection from '../Section/FilterSection';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import { getLocations } from '@/services/locations';
import { getWorkspaces } from '@/services/workspace.service';

type Props = {
    params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city } = await params;
    // Capitalize the city name for display
    const displayCity = city.charAt(0).toUpperCase() + city.slice(1);

    const title = `Coworking Spaces in ${displayCity} | CoWork Kerala`;
    const description = `Discover the best coworking spaces in ${displayCity}. Flexible desks, private offices, and meeting rooms available.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    };
}

export const revalidate = 60; // Revalidate every 60 seconds

const CityWorkspacePage = async ({ params }: Props) => {
    const { city } = await params;
    // Capitalize the city name for the API call
    const cityStr = city.charAt(0).toUpperCase() + city.slice(1);

    const [locations, workspacesResponse] = await Promise.all([
        getLocations(),
        getWorkspaces({ city: cityStr }),
    ]);

    const workspaces = workspacesResponse?.data || [];

    return (
        <Fixedw className="container mx-auto md:px-8 flex flex-col gap-12">
            <Header />
            <HeroSection currentCity={city} />
            <FilterSection locations={locations} currentCity={city} />
            <WorkspaceListing workspaces={workspaces} locations={locations} />
            <Footer />
        </Fixedw>
    );
};

export default CityWorkspacePage;
