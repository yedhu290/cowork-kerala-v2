import React from 'react';

const features = [
    {
        title: 'A CREDIBLE BUSINESS ADDRESS',
        heading: 'Flexibility',
        desc: 'Get a premium office address in a prime location without the cost of physical space. Enhance your brand image and build trust with clients.',
        tag: 'PROFESSIONAL PRESENCE',
        bg: 'bg-[#F3F1EB]',
        tagBg: 'bg-[#D4E7A6] text-[#1A2818]',
    },
    {
        title: 'WORK FROM ANYWHERE',
        heading: 'Networking Opportunities',
        desc: 'Operate your business remotely while maintaining a strong presence in prime markets. Stay connected with clients worldwide without being tied to a physical office.',
        tag: 'GLOBAL ACCESSIBILITY',
        bg: 'bg-[#D4E7A6]',
        tagBg: 'bg-[#1A2818] text-white',
    },
    {
        title: 'SMART BUSINESS SOLUTION',
        heading: 'Cost-Effective',
        desc: "A virtual office gives you all the benefits of a prime business address and mail services at a fraction of the cost of a physical office. It's perfect for startups, freelancers, and growing businesses looking to maintain professionalism without heavy overheads.",
        tag: 'COST-EFFECTIVE',
        bg: 'bg-[#F3F1EB]',
        tagBg: 'bg-[#D4E7A6] text-[#1A2818]',
    },
];

const FeatureSection = () => {
    return (
        <div className="flex flex-col">
            {features.map((feature, index) => (
                <section
                    key={index}
                    className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[500px]"
                >
                    {/* Left Side - Heading */}
                    <div className="bg-[#728576] flex items-center justify-center p-12 md:p-20">
                        <h2 className="text-5xl md:text-7xl font-normal text-[#D4E7A6] tracking-tight text-center leading-tight">
                            {feature.heading}
                        </h2>
                    </div>

                    {/* Right Side - Content */}
                    <div className={`flex flex-col justify-center p-12 md:p-20 ${feature.bg}`}>
                        <div className="mb-8">
                            <span
                                className={`inline-block rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider ${feature.tagBg}`}
                            >
                                {feature.tag}
                            </span>
                        </div>
                        <h3 className="mb-6 text-2xl md:text-3xl font-bold text-[#2F4858] uppercase leading-tight">
                            {feature.title}
                        </h3>
                        <p className="text-zinc-700 leading-relaxed text-lg">{feature.desc}</p>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default FeatureSection;
