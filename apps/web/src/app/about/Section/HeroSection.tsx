import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative w-full overflow-hidden rounded-3xl">
            <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
                <Image
                    src="/images/about/about.png"
                    alt="Modern collaborative workspace with glass walls"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Gradient overlay for better text readability if needed, though the card handles most of it */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Content Card */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-[94%]">
                    <div className="rounded-3xl bg-black/40 backdrop-blur-md p-6 md:p-10 lg:p-12 text-white border border-white/10 text-center">
                        <div className="mb-6">
                            <span className="inline-flex items-center rounded-full bg-[#D4F0B5] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900">
                                About Us
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                            We{`'`}re all about creating awesome spaces where you can{' '}
                            <span className="text-[#D4F0B5]">work</span>,{' '}
                            <span className="text-[#D4F0B5]">connect</span> ,and{' '}
                            <span className="text-[#D4F0B5]">thrive</span>.
                        </h1>

                        <p className="text-sm md:text-base lg:text-lg text-zinc-200 leading-relaxed max-w-3xl mx-auto">
                            Entrepreneurs, freelancers, and growing teams alike will find their
                            perfect spot here. Join our fun and vibrant community and let{`'`}s turn
                            work into an adventure together!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
