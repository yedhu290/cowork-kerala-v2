import React from 'react';
import {
    Globe,
    Armchair,
    Building2,
    Sofa,
    CupSoda,
    Printer,
    Lock,
    CircleParking,
    Clock,
    Dumbbell,
    Zap,
    Snowflake,
} from 'lucide-react';

const solutions = [
    { icon: Globe, title: 'High-speed internet' },
    { icon: Armchair, title: 'Ergonomic furniture' },
    { icon: Building2, title: 'Fully furnished offices' },
    { icon: Sofa, title: 'Lounge areas' },
    { icon: CupSoda, title: 'Snacks & beverages' },
    { icon: Printer, title: 'Printing & scanning' },
    { icon: Lock, title: 'Lockers' },
    { icon: CircleParking, title: 'Parking' },
    { icon: Clock, title: '24/7 access' },
    { icon: Dumbbell, title: 'Fitness area' },
    { icon: Zap, title: 'EV charging' },
    { icon: Snowflake, title: 'Air conditioning' },
];

const SolutionsSection = () => {
    return (
        <section className="w-full bg-primary-50 py-14 md:py-20">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center md:mb-14">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-10 bg-primary-500" />
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                            Amenities
                        </span>
                        <span className="h-px w-10 bg-primary-500" />
                    </div>
                    <h2 className="heading-section text-zinc-900">
                        Everything included, nothing to arrange
                    </h2>
                    <p className="leading-relaxed text-zinc-600">
                        Move in and start working — the essentials and the extras are all taken care
                        of.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
                    {solutions.map((item) => (
                        <div
                            key={item.title}
                            className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-primary-300"
                        >
                            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                                <item.icon size={20} strokeWidth={1.5} />
                            </span>
                            <span className="text-sm font-medium text-zinc-800">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionsSection;
