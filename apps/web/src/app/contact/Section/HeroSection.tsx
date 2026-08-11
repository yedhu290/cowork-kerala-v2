import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="w-full">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                {/* Text */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-10 bg-primary-500" />
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                            Talk To Us
                        </span>
                    </div>

                    <h1 className="heading-hero text-zinc-900">
                        Talk to a local{' '}
                        <span className="text-primary-600">Kerala</span> workspace team
                    </h1>

                    <p className="max-w-xl text-lg leading-relaxed text-zinc-600">
                        Tell us what you need — a desk for the day, a private cabin for your team, or
                        a registered business address — and we’ll shortlist the right options across
                        Kochi, Trivandrum, Calicut and Thrissur. No pressure, no jargon, just quick,
                        honest help.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                            href="tel:+917356735091"
                            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl"
                        >
                            <Phone size={16} />
                            Call us
                        </a>
                        <a
                            href="https://wa.me/917356735091"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition-colors hover:border-primary-300 hover:text-primary-700"
                        >
                            <MessageCircle size={16} />
                            WhatsApp
                        </a>
                        <a
                            href="mailto:coworkkerala@gmail.com"
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition-colors hover:border-primary-300 hover:text-primary-700"
                        >
                            <Mail size={16} />
                            Email
                        </a>
                    </div>
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
                            src="/images/hero-banner/people-coworking.png"
                            alt="The CoWork Kerala team ready to help you find a workspace"
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
                                src="/images/glimpse/standing-desk.png"
                                alt="A CoWork Kerala workspace in Kerala"
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
