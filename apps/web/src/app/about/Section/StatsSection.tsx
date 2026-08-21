import React from 'react';
import { aboutStats } from '@/lib/aboutContent';

/** Compact stat strip summarising CoWork Kerala's reach. */
const StatsSection = () => {
    return (
        <section className="w-full">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 md:grid-cols-4">
                {aboutStats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center gap-1 bg-white p-6 text-center md:p-8"
                    >
                        <span className="text-3xl font-bold text-primary-600 md:text-4xl">
                            {stat.value}
                        </span>
                        <span className="text-sm text-zinc-600">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
