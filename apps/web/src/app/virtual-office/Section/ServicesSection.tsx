'use client';

import Image from 'next/image';

const services = [
    {
        id: '01',
        title: 'Virtual office for GST Registration',
        desc: 'Build credibility for your business with a prestigious address and hassle-free GST registration support.',
        tag: 'Get Quote',
        image: '/images/virtual-office/card-1.png',
    },
    {
        id: '02',
        title: 'Virtual office for Business Registration',
        desc: 'Establish your company with ease and gain instant access to a professional business identity.',
        tag: 'Get Quote',
        image: '/images/virtual-office/card-2.png',
    },
    {
        id: '03',
        title: 'Virtual office for Mailing Address',
        desc: 'Get a secure and reliable mailing address to manage all your business correspondence seamlessly.',
        tag: 'Get Quote',
        image: '/images/virtual-office/card-3.png',
    },
];

const ServicesSection = () => {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact-form');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-primary-100 pt-16 px-6 md:px-[15%] mb-12 md:mb-20">
            <div className="text-center mb-12 flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2 block bg-primary-50 w-fit text-center p-2 px-4 rounded-full">
                    Our Services
                </span>
                <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900">
                    Virtual Office Services
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-[#F3F1EB] rounded-t-full rounded-b-3xl px-6 pt-16 flex flex-col items-center text-center h-full relative overflow-hidden group"
                    >
                        <div className="mb-4">
                            <span className="text-8xl font-bold text-primary-500">
                                {service.id}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-zinc-900 mb-4 max-w-[300px]">
                            {service.title}
                        </h3>
                        <p className="text-sm text-zinc-600 mb-6 leading-relaxed">{service.desc}</p>

                        <button
                            onClick={scrollToContact}
                            type="button"
                            className="inline-block bg-[#D4E7A6] text-[#1A2818] text-xs font-bold px-3 py-1 rounded-full mb-8 cursor-pointer hover:bg-[#cbe095] transition-colors"
                        >
                            {service.tag}
                        </button>

                        <div className="w-full h-72 relative rounded-t-2xl overflow-hidden mt-auto">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;
