import Link from 'next/link';
import React from 'react';
import { Wifi, Users, Ruler } from 'lucide-react';
import Image from 'next/image';
import { getFeaturedWorkspaces, Workspace } from '@/services/workspace.service';

const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[10px] sm:text-[11px] md:text-xs text-gray-900">
        {children}
    </span>
);

const FeaturedCard = ({ item }: { item: Workspace }) => {
    // Determine price to display - prefer privateOffice if available for this card context, or hotDesk etc.
    // Based on previous mock data, it seems mixed. Let's try to find a price.
    let price = 'Contact for Price';
    if (item.pricing) {
        if (item.pricing.hotDesk) price = `$${item.pricing.hotDesk}.00 / Day`;
        else if (item.pricing.dedicatedDesk) price = `$${item.pricing.dedicatedDesk}.00 / Day`;
        else if (item.pricing.privateOffice) price = `$${item.pricing.privateOffice}.00 / Day`;
    }

    // Determine features to display
    // The Workspace type has specific fields we might need to map or use directly if they exist
    // Inspecting the mock data in route.ts, I added a 'features' field to the mock data which isn't in the Workspace interface yet.
    // To match the design, we need wifi, seats, area.
    // The Workspace interface has `amenities` string array.
    // The previous hardcoded data had explicit wifi, seats, area fields.
    // I will assume for now we use the data if available or fallbacks.
    // Actually, looking at the mock data I wrote in route.ts, I added a 'features' object. I should update the interface or just cast for now to get it working,
    // but better to update the interface in service.
    // However, I just updated the service to fetch the data. The Workspace interface was NOT updated to include `features`.
    // I should update the Workspace interface in the service first or adapting here.
    // Let's adapt here using 'any' or extending locally to avoid another file edit info loop if possible,
    // but proper TS way is to update the interface.

    // Let's use what we have or generic amenities for now to fit the UI?
    // The UI effectively needs "Wifi", "Seats", "Area".
    // I will try to extract them from amenities or use placeholders if not available, OR I should have updated the interface.
    // Given the user wants "SEO friendly", rendering server side is key.

    // Quick fix: The mock data I returned matches the structure I visualized, but I missed updating the Workspace interface in `workspace.service.ts` to include `features`.
    // I will cast item to any to access features for this task to proceed smoothly without going back and forth,
    // or I can do a quick check if simple properties exist.

    // Actually, I'll update the component to handle the workspace data as is defined in the interface,
    // OR realize that the mock data I wrote has `features` property which is key for the UI.

    const features = item.features || {
        wifi: '100 Mbps',
        seats: 'N/A',
        area: 'N/A',
    };

    return (
        <article className="space-y-2 md:space-y-3">
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
                <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 w-full">
                    <Image
                        src={item.images[0] || '/images/placeholder.jpg'}
                        alt={item.spaceName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
                <Pill>
                    <Wifi size={12} className="md:w-3.5 md:h-3.5" /> {features.wifi}
                </Pill>
                <Pill>
                    <Users size={12} className="md:w-3.5 md:h-3.5" /> {features.seats}
                </Pill>
                <Pill>
                    <Ruler size={12} className="md:w-3.5 md:h-3.5" /> {features.area}
                </Pill>
            </div>
            <div className="mt-1 text-sm sm:text-base md:text-lg font-medium text-zinc-900">
                {item.spaceName}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">{price}</div>
        </article>
    );
};

const Featured = async () => {
    const response = await getFeaturedWorkspaces();
    const workspaces = response?.data || [];

    return (
        <section className="w-full py-8 md:py-12 lg:py-16">
            <div className="text-center mb-8 md:mb-10 lg:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 mb-2 md:mb-3">
                    Featured Workspaces in Kerala
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 uppercase tracking-wide">
                    Handpicked premium coworking spaces and virtual offices across God{`'`}s Own
                    Country
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
                {workspaces.map((it) => (
                    <FeaturedCard key={it.id} item={it} />
                ))}
            </div>

            <div className="flex justify-center">
                <Link
                    href="/coworking-space"
                    className="rounded-full bg-[#CFEAB1] px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-medium text-zinc-900 hover:bg-[#bfda9f] transition-colors tracking-wide"
                >
                    DISCOVER MORE
                </Link>
            </div>
        </section>
    );
};

export default Featured;
