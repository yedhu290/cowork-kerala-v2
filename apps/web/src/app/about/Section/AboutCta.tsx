import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

/** Strong closing call-to-action. */
const AboutCta = () => {
    return (
        <section className="w-full">
            <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-primary-500 to-primary-600 px-6 py-14 text-center md:px-12 md:py-20">
                <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-12 size-72 rounded-full bg-white/10 blur-2xl" />

                <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
                    <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                        Find your ideal workspace in Kerala
                    </h2>
                    <p className="text-white/90 md:text-lg">
                        Tell us what you need and we’ll help you compare coworking spaces, virtual
                        offices and private offices — and book the one that fits.
                    </p>
                    <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                        <Link
                            href="/coworking-space"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-zinc-900 transition-transform hover:scale-105"
                        >
                            Explore workspaces
                            <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                        >
                            <Phone size={16} />
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCta;
