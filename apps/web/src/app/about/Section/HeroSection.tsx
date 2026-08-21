import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="w-full">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                {/* Text */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-10 bg-primary-500" />
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                            About Us
                        </span>
                    </div>

                    <h1 className="heading-hero text-zinc-900">
                        Your workspace people in{' '}
                        <span className="text-primary-600">Kerala</span>
                    </h1>

                    <p className="max-w-xl text-lg leading-relaxed text-zinc-600">
                        CoWork Kerala connects freelancers, startups and growing teams with the right{' '}
                        <span className="font-semibold text-zinc-800">coworking spaces</span>,{' '}
                        <span className="font-semibold text-zinc-800">virtual offices</span> and{' '}
                        <span className="font-semibold text-zinc-800">private offices</span> — compared,
                        priced clearly and bookable in minutes.
                    </p>

                    <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                        <Link
                            href="/coworking-space"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl"
                        >
                            Explore workspaces
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-7 py-3.5 text-sm font-bold text-zinc-900 transition-colors hover:border-primary-300 hover:text-primary-700"
                        >
                            <Phone size={16} />
                            Contact us
                        </Link>
                    </div>

                    <p className="pt-1 text-sm font-medium text-zinc-500">
                        Kochi · Trivandrum · Calicut · Thrissur
                    </p>
                </div>

                {/* Layered image composition */}
                <div className="relative">
                    {/* Soft accent panel peeking behind the photo */}
                    <div
                        className="absolute -right-4 -top-4 hidden h-[90%] w-[90%] rounded-[2.5rem] bg-primary-100 md:block"
                        aria-hidden="true"
                    />
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-[2.5rem] shadow-xl ring-1 ring-black/5">
                        <Image
                            src="/images/about/about.png"
                            alt="A modern CoWork Kerala coworking space with glass-walled offices and shared desks"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                        />
                    </div>
                    {/* Floating secondary photo for a richer, collage-style hero */}
                    <div className="absolute -bottom-6 -left-6 hidden w-44 overflow-hidden rounded-2xl border-4 border-white shadow-lg lg:block">
                        <div className="relative aspect-square">
                            <Image
                                src="/images/glimpse/group-discussion.png"
                                alt="A team collaborating at a CoWork Kerala workspace"
                                fill
                                sizes="176px"
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
