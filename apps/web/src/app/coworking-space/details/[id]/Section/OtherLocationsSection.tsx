'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Workspace } from '@/services/workspace.service';

interface OtherLocationsSectionProps {
    workspaces: Workspace[];
    cityName: string;
}

const LocationCard = ({ workspace }: { workspace: Workspace }) => {
    const image = workspace.images?.[0] || '/images/thumb-1.jpg';

    return (
        <article className="overflow-hidden rounded-3xl bg-white">
            <div className="relative">
                <div className="relative h-96 w-full overflow-hidden rounded-3xl">
                    <Image
                        src={image}
                        alt={workspace.spaceName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 45vw, 23vw"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div className="text-white">
                            <div className="text-base font-semibold md:text-lg">
                                {workspace.spaceName}
                            </div>
                            <div className="text-xs md:text-sm text-white/90">
                                {workspace.location?.address || workspace.city.name}
                            </div>
                        </div>
                        <Link
                            href={`/coworking-space/details/${workspace.id}`}
                            className="pointer-events-auto rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-200"
                        >
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

const OtherLocationsSection = ({ workspaces, cityName }: OtherLocationsSectionProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        containScroll: 'trimSnaps',
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (workspaces.length === 0) {
        return null;
    }

    return (
        <section className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold md:text-3xl">
                    Other locations in {cityName}
                </h3>
                {workspaces.length > 3 && (
                    <div className="flex gap-2">
                        <button
                            onClick={scrollPrev}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6">
                    {workspaces.map((workspace) => (
                        <div
                            key={workspace.id}
                            className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_23%] pl-1"
                        >
                            <LocationCard workspace={workspace} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OtherLocationsSection;
