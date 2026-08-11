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
    { icon: Globe, title: 'High Speed Internet' },
    { icon: Armchair, title: 'Ergonomic Furniture' },
    { icon: Building2, title: 'Fully Furnished Offices' },
    { icon: Sofa, title: 'Lounge Areas' },
    { icon: CupSoda, title: 'Snacks and Beverages' },
    { icon: Printer, title: 'Printing and Scanning' },
    { icon: Lock, title: 'Lockers' },
    { icon: CircleParking, title: 'Parking' },
    { icon: Clock, title: '24/7 Access' },
    { icon: Dumbbell, title: 'Fitness Area' },
    { icon: Zap, title: 'EV Charging' },
    { icon: Snowflake, title: 'Air Conditioning' },
];

const SolutionsSection = () => {
    return (
        <section className="w-full bg-[#4d898b] py-16 px-6 md:px-[10%] text-center">
            <div className="flex flex-col items-center gap-6 mb-16">
                <span className="rounded-full bg-[#D4E7A6] px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#1A2818]">
                    Our Amenities
                </span>
                <h2 className="text-4xl md:text-6xl font-medium text-white">
                    Seamless Work Solutions
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full mx-auto">
                {solutions.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-6 bg-white/10 rounded-full p-4 backdrop-blur-sm max-w-2xl"
                    >
                        <div className="flex size-16 items-center justify-center rounded-full bg-white/30 text-white shrink-0 transition-colors">
                            <item.icon size={26} strokeWidth={1.5} />
                        </div>
                        <span className="text-white font-medium text-left text-lg">
                            {item.title}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SolutionsSection;
