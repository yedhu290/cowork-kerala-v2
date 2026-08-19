import Image from 'next/image';
import React from 'react';

const AboutIntroSection = () => {
    return (
        <section className="w-full">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                {/* Image collage */}
                <div className="relative">
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-zinc-200">
                        <Image
                            src="/images/glimpse/meeting-room.png"
                            alt="A team collaborating in a CoWork Kerala meeting room"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 45vw"
                        />
                    </div>
                    {/* Second photo, overlapping for a warmer, more editorial feel */}
                    <div className="absolute -bottom-6 -right-6 hidden w-40 overflow-hidden rounded-2xl border-4 border-white shadow-lg md:block">
                        <div className="relative aspect-square">
                            <Image
                                src="/images/glimpse/open-office.png"
                                alt="Open-plan desks at a CoWork Kerala space"
                                fill
                                sizes="160px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-10 bg-primary-500" />
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                            Who we are
                        </span>
                    </div>
                    <h2 className="heading-subsection text-zinc-900">
                        Kerala’s home for flexible workspaces
                    </h2>
                    <p className="leading-relaxed text-zinc-600">
                        CoWork Kerala is a dynamic workspace platform where ambition meets community.
                        We bring the best coworking spaces, virtual offices and private offices in
                        Kerala together in one place, so individuals and teams can find flexible,
                        professional space that fits their budget, location and way of working.
                    </p>
                    <p className="leading-relaxed text-zinc-600">
                        From solo founders and freelancers to growing startups and established teams,
                        our carefully chosen spaces are designed to inspire creativity, foster
                        connections and give your work the setting it deserves — across Kochi,
                        Trivandrum, Calicut and Thrissur.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutIntroSection;
