import Image from 'next/image';
import React from 'react';
import { UsersRound, Leaf, Lightbulb, StretchHorizontal } from 'lucide-react';

const values = [
    {
        icon: UsersRound,
        title: 'Community Building',
        desc: 'Building a space where everyone feels welcome and connected within the group.',
    },
    {
        icon: Leaf,
        title: 'Sustainable Actions',
        desc: 'Committed to eco-friendly practices by reducing our energy usage for the future.',
    },
    {
        icon: Lightbulb,
        title: 'Incubating Innovations',
        desc: 'Fostering an environment that encourages new ideas and growth for our users.',
    },
    {
        icon: StretchHorizontal,
        title: 'Room for Flexibility',
        desc: 'Offering various workspaces to suit your unique needs. Be flexible as you need.',
    },
];

const OurValuesSection = () => {
    return (
        <section className="w-full rounded-3xl bg-[#CFEAB1] p-6 md:p-12">
            <div className="grid gap-8 md:grid-cols-12 md:gap-12 items-center justify-center">
                {/* Left: Title + Image */}
                <div className="md:col-span-4 flex flex-col gap-8">
                    <h2 className="text-4xl font-normal text-[#2A2A2A] md:text-5xl tracking-tight">
                        Our Values
                    </h2>
                    <div className="relative w-full overflow-hidden rounded-3xl aspect-square">
                        <Image
                            src="/images/about/about-2.png"
                            alt="Collaborative workspace"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Right: Cards */}
                <div className="md:col-span-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {values.map((v) => (
                        <div
                            key={v.title}
                            className="flex flex-col gap-4 rounded-3xl border border-[#A6C48A] p-6 md:p-8 transition-colors hover:bg-black/5"
                        >
                            <div className="flex h-10 w-10 items-center justify-center text-[#1A1A1A]">
                                <v.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-normal text-[#1A1A1A] mb-3">
                                    {v.title}
                                </h3>
                                <p className="text-[#4A4A4A] leading-relaxed text-sm md:text-base">
                                    {v.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurValuesSection;
