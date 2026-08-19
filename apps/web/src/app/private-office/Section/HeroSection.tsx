import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Check } from 'lucide-react';

type Props = {
    city?: string;
};

const highlights = [
    'Move-in ready cabins',
    '24/7 secure access',
    'All-inclusive pricing',
    'Flexible terms',
];

const HeroSection = ({ city }: Props) => {
    return (
        <section className="w-full pt-4 md:pt-8 mb-14 md:mb-24">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid items-center gap-8 rounded-[2.5rem] bg-linear-to-br from-primary-100 via-primary-50 to-white p-6 shadow-[0_24px_70px_-28px_rgba(16,46,22,0.35)] ring-1 ring-primary-100 md:grid-cols-2 md:gap-12 md:p-10 lg:p-14">
                    {/* Content side */}
                    <div className="flex flex-col gap-6">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700 shadow-sm">
                            <Building2 size={14} aria-hidden="true" />
                            Private Offices in Kerala
                        </span>

                        <h1 className="heading-hero text-zinc-900">
                            A private office{city ? ` in ${city}` : ' in Kerala'} your team will
                            call home
                        </h1>

                        <p className="max-w-md leading-relaxed text-zinc-600 md:text-lg">
                            A furnished, lockable cabin that’s entirely yours — move-in ready, fully
                            managed, and built around the way your team works.
                        </p>

                        {/* Key highlights */}
                        <ul className="flex flex-wrap gap-2.5">
                            {highlights.map((item) => (
                                <li
                                    key={item}
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 shadow-sm"
                                >
                                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary-500 text-white">
                                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        <div className="flex flex-wrap items-center gap-5 pt-2">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30"
                            >
                                Get a quote
                                <ArrowRight size={18} />
                            </Link>
                            <a
                                href="tel:+917356735091"
                                className="text-sm font-semibold text-primary-700 underline-offset-4 transition-colors hover:underline"
                            >
                                or call +91 7356735091
                            </a>
                        </div>
                    </div>

                    {/* Image side */}
                    <div className="relative">
                        <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5 md:aspect-4/5">
                            <Image
                                src="/images/private-office/hero-1.png"
                                alt={`A furnished private office cabin${city ? ` in ${city}` : ' in Kerala'} for a growing team`}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 45vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
