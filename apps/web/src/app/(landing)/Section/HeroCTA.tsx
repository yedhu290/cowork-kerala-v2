'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ContactFormModal from '@/components/ui/ContactFormModal';

import { Location } from '@/services/locations';

type Props = {
    locations: Location[];
};

const HeroCTA = ({ locations }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="relative overflow-hidden">
                {/* Background Image with Dark Overlay */}
                <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[500px] w-full">
                    <Image
                        src="/images/hero-banner/hero-card.png"
                        alt="Modern coworking space with warm lighting"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h2 className="mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
                        Welcome a new way of
                        <br />
                        productivity & collaboration
                    </h2>

                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="rounded-full bg-[#CFEAB1] px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base lg:text-lg font-semibold text-gray-900 hover:bg-[#bfda9f] transition-colors tracking-wide cursor-pointer"
                        >
                            BOOK A SPACE
                        </button>

                        <button className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#CFEAB1] text-gray-900 hover:bg-[#bfda9f] transition-colors">
                            <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
                        </button>
                    </div>
                </div>
            </section>

            <ContactFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                locations={locations}
            />
        </>
    );
};

export default HeroCTA;
