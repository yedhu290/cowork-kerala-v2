'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Location } from '@/services/locations';
import { ChevronDown } from 'lucide-react';

type Props = {
    locations: Location[];
    currentCity?: string;
};

const FilterSection = ({ locations, currentCity = '' }: Props) => {
    const router = useRouter();
    const [selectedCity, setSelectedCity] = useState(currentCity);

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const city = e.target.value;
        setSelectedCity(city);

        if (city) {
            router.push(`/coworking-space/${city.toLowerCase()}`);
        } else {
            router.push('/coworking-space');
        }
    };

    return (
        <section className="w-full">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-64">
                    <select
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="w-full h-12 appearance-none rounded-xl bg-[#d0e8c5] px-4 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer"
                        aria-label="Select City"
                    >
                        <option value="">Select City</option>
                        {locations.map((loc) => (
                            <option key={loc.id || loc.name} value={loc.name}>
                                {loc.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600"
                        size={20}
                    />
                </div>
            </div>
        </section>
    );
};

export default FilterSection;
