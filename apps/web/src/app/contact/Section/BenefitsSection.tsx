import React from 'react';

const items = [
    {
        title: 'Passionate Community',
        desc:
            'Join a community of dedicated individuals who are enthusiastic about their work and eager to collaborate.',
    },
    {
        title: 'Dynamic Work Environment',
        desc:
            'Our workspace is crafted to offer a vibrant and versatile atmosphere suited to the varied demands of modern professionals. Designed with flexibility so different industries and work styles can thrive.',
    },
    {
        title: 'Opportunities for Growth',
        desc:
            'We provide numerous resources and support systems to help you grow both personally and professionally.',
    },
    {
        title: 'Culture-Driven Environment',
        desc:
            'We emphasise a strong, positive workplace culture that fosters creativity and innovation.',
    },
    {
        title: 'Networking and Connections',
        desc:
            'Our space offers countless opportunities to meet new people and build meaningful connections.',
    },
];

const BenefitsSection = () => {
    return (
        <section className="w-full">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item,idx) => (
                    <div
                        key={item.title}
                        className={`rounded-2xl bg-primary-100 p-5 md:p-6 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] ${idx === 1 && 'lg:col-span-2'}`}
                    >
                        <div className="mb-3 rounded-lg bg-primary-300/70 px-4 py-2 text-zinc-900 font-medium">
                            {item.title}
                        </div>
                        <p className="text-zinc-700 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
