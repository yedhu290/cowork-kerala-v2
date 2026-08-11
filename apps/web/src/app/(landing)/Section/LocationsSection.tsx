'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import { cn } from '@/lib/utils';

import { getLocations, Location } from '@/services/locations';

type Props = {
    locations: Location[];
};

const LocationsSection = ({ locations }: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on('reInit', onInit);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('select', onSelect);
    }, [emblaApi, onInit, onSelect]);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    return (
        <section className="w-full mb-20">
            <div className="text-center mb-8 md:mb-10 lg:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 mb-2 md:mb-3">
                    Popular Locations in Kerala
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-zinc-700 tracking-wide uppercase px-4">
                    EXPLORE COWORKING SPACES AND VIRTUAL OFFICES IN KERALA&apos;S MAJOR BUSINESS
                    HUBS
                </p>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4 md:-ml-6">
                    {locations.map((loc, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_50%] md:flex-[0_0_25%] pl-4 md:pl-6 min-w-0"
                        >
                            <Link
                                href={`/coworking-space/${loc.name.toLowerCase()}`}
                                className="flex flex-col gap-3 group cursor-pointer"
                            >
                                <div className="relative w-full aspect-4/5 rounded-[30px] overflow-hidden">
                                    <Image
                                        src={loc.image}
                                        alt={loc.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-center font-bold text-zinc-900 group-hover:text-primary-600 transition-colors">
                                    {loc.name}
                                </h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                'h-1 rounded-full transition-all duration-300',
                                index === selectedIndex ? 'w-8 bg-zinc-800' : 'w-2 bg-zinc-300'
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <Link
                    href="/coworking-space"
                    className="bg-primary-100 text-zinc-900 px-8 py-3 rounded-full text-sm font-bold hover:bg-primary-200 transition-colors uppercase tracking-wider"
                >
                    View All Locations
                </Link>
            </div>
        </section>
    );
};

export default LocationsSection;
