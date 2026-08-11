import React from 'react';

const teamMembers = [
    {
        name: 'Alaric Thorne',
        role: 'General Manager',
        image: '/images/team/member-1.jpg', // Placeholder path
    },
    {
        name: 'Leopold Fenwick',
        role: 'Head Finance',
        image: '/images/team/member-2.jpg', // Placeholder path
    },
];

const TeamSection = () => {
    return (
        <section className="w-full py-12 md:py-20">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <span className="rounded-full bg-primary-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-900">
                    Team Members
                </span>
                <h2 className="text-4xl font-semibold text-zinc-900 md:text-5xl">
                    Meet the People Behind Cowork
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col items-center gap-4">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-100">
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                                <span className="text-6xl">👤</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-zinc-900">{member.name}</h3>
                            <p className="text-zinc-600">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;
