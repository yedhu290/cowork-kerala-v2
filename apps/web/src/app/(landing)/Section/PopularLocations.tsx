'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { getLocations, Location } from '@/services/locations';

type Props = {
    locations: Location[];
};

const PopularLocations = ({ locations }: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
        skipSnaps: false,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 4 },
        },
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="w-full py-8 md:py-12 lg:py-16">
            {/* Header */}
            <div className="text-center mb-8 md:mb-10 lg:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 mb-2 md:mb-3">
                    Popular Locations in Kerala
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-zinc-700 tracking-wide uppercase px-4">
                    EXPLORE COWORKING SPACES AND VIRTUAL OFFICES IN KERALA&apos;S MAJOR BUSINESS
                    HUBS
                </p>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden mb-6 md:mb-8" ref={emblaRef}>
                <div className="flex gap-4 md:gap-6 lg:gap-8">
                    {locations.map((loc) => (
                        <Link
                            key={loc.id}
                            href={`/coworking-space/${loc.name.toLowerCase()}`}
                            className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-24px)] group"
                        >
                            <div className="flex flex-col items-center">
                                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl mb-3 md:mb-4">
                                    <Image
                                        src={loc.image}
                                        alt={loc.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-zinc-900 group-hover:text-primary-600 transition-colors">
                                    {loc.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`rounded-full transition-all ${
                            index === selectedIndex
                                ? 'w-6 md:w-8 h-2 bg-zinc-800'
                                : 'w-2 h-2 bg-zinc-400 hover:bg-zinc-500'
                        }`}
                    />
                ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
                <Link
                    href="/coworking-space"
                    className="px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-[#CFEAB1] text-zinc-900 text-xs md:text-sm font-medium tracking-wide hover:bg-[#bfda9f] transition-colors uppercase"
                >
                    DISCOVER MORE
                </Link>
            </div>
        </section>
    );
};

export default PopularLocations;
