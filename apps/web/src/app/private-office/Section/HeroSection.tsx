import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';

type Props = {
    city?: string;
};

const HeroSection = ({ city }: Props) => {
    return (
        <section className="w-full bg-primary-100 py-6 px-3 md:p-12 mb-12 md:mb-20">
            <div className="md:px-[12%] mx-auto">
                <h1 className="text-4xl md:text-6xl font-semibold text-zinc-900 mb-12">
                    Private Office{city ? ` in ${city}` : ''}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left: Large Image */}
                    <div className="md:col-span-7 relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
                        <Image
                            src="/images/private-office/hero-1.png"
                            alt="Private Office"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 bg-black/50 drop-shadow-md p-4 rounded-xl w-2xl max-w-[95%] md:max-w-sm text-center md:text-left text-white text-sm font-medium leading-relaxed">
                            Get a secure space with layout, amenities, and services configured to
                            your requirements, so your office truly works the way you do
                        </div>
                    </div>

                    {/* Right: Content + Small Images */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <div className="mb-4">
                            <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 leading-tight mb-6">
                                We also help companies set up customised, fully private,
                                ready‑to‑use offices across Kerala with dedicated cabins and suites
                                tailored to your team size and workflow.
                            </h2>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-white p-2 px-3 text-sm font-bold text-zinc-900 transition-transform hover:scale-105"
                            >
                                <span>Contact us</span>
                                <div className="flex size-8 items-center justify-center rounded-full bg-zinc-900 text-white">
                                    <Mail size={18} />
                                </div>
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="relative h-[150px] md:h-auto rounded-3xl overflow-hidden">
                                <Image
                                    src="/images/private-office/hero-2.png"
                                    alt="Office detail"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-[150px] md:h-auto rounded-3xl overflow-hidden">
                                <Image
                                    src="/images/private-office/hero-3.png"
                                    alt="Meeting room"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
