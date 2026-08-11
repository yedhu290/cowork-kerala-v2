'use client';

import LocationCircle from '@/components/atomic/LocationCircle';
import SelectInput from '@/components/atomic/SelectInput';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getLocations, Location } from '@/services/locations';
import { useRouter } from 'next/navigation';

type Props = {
    locations: Location[];
};

const Hero = ({ locations }: Props) => {
    const [selectedType, setSelectedType] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        let path = '/coworking-space';

        if (selectedType === 'private-office') {
            path = '/private-office';
        } else if (selectedType === 'virtual-office') {
            path = '/virtual-office';
        }

        // Use path-based city routing for workspace and private-office
        if (selectedCity) {
            if (path === '/coworking-space' || path === '/private-office') {
                router.push(`${path}/${selectedCity.toLowerCase()}`);
                return;
            }
        }

        router.push(path);
    };

    return (
        <section className="w-full py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left content */}
                <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-zinc-900">
                        We help you find your ideal workspace in kerala
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-zinc-700">
                        Discover premium coworking spaces and virtual offices across God{`'`}s Own
                        Country. Professional workspaces in Kochi, Trivandrum, Calicut, Thrissur and
                        more.
                    </p>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                        <SelectInput
                            className="w-full sm:w-auto sm:flex-1 h-11 md:h-12 rounded-xl bg-[#CFEAB1] text-zinc-800 text-sm md:text-base"
                            placeholder="Looking For"
                            options={[
                                { label: 'Coworking Space', value: 'coworking' },
                                { label: 'Private Office', value: 'private-office' },
                                { label: 'Virtual Office', value: 'virtual-office' },
                            ]}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        />
                        <SelectInput
                            className="w-full sm:w-auto sm:flex-1 h-11 md:h-12 rounded-xl bg-[#CFEAB1] text-zinc-800 text-sm md:text-base"
                            placeholder="Select City"
                            options={locations.map((loc) => ({ label: loc.name, value: loc.name }))}
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                        />
                    </div>

                    {/* Locations list */}
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 md:gap-4 lg:gap-6">
                        {locations.map((city) => (
                            <LocationCircle
                                key={city.id || city.name}
                                location={city.name}
                                imageUrl={city.image}
                                onClick={() =>
                                    router.push(`/coworking-space/${city.name.toLowerCase()}`)
                                }
                            />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4">
                        <button
                            onClick={handleSearch}
                            className="h-11 md:h-12 px-5 md:px-6 rounded-full bg-zinc-900 text-white text-xs md:text-sm font-medium tracking-wide hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            FIND BEST WORKSPACE
                        </button>
                        <button
                            onClick={handleSearch}
                            aria-label="Go"
                            className="size-11 md:size-12 rounded-full border-2 border-zinc-300 flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer"
                        >
                            <span className="text-lg md:text-xl">↗</span>
                        </button>
                    </div>
                </div>

                {/* Right images */}
                <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
                    <div className="w-full aspect-[4/3] rounded-2xl md:rounded-3xl bg-[#EBFFD8] overflow-hidden relative">
                        <Image
                            src="/images/landing/banner-1.png"
                            alt="Coworking space"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 80vw, 32vw"
                        />
                    </div>
                    <div className="w-full aspect-[16/9] rounded-2xl md:rounded-3xl bg-[#EBFFD8] overflow-hidden relative">
                        <Image
                            src="/images/landing/banner-2.png"
                            alt="Modern workspace"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 80vw, 32vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
