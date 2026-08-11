import React from 'react';
import Image from 'next/image';

type HeroSectionProps = {
    city?: string;
};

const HeroSection = ({ city }: HeroSectionProps) => {
    return (
        <div className="w-full py-8 md:py-12">
            <section className="w-full relative">
                <div className="absolute -left-9 -top-9 size-24 rounded-full bg-primary-50" />
                <div className="grid gap-6 md:gap-10">
                    <div className="order-2 md:order-1 md:col-span-8">
                        <div className="relative md:aspect-22/9 aspect-square w-full overflow-hidden rounded-2xl border border-gray-200">
                            <Image
                                src="/images/virtual-office/banner-1.png"
                                alt="Virtual Office"
                                fill
                                sizes="(max-width: 768px) 100vw, 80vw"
                                priority
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="order-1 md:order-2 md:col-span-4 md:flex md:items-end absolute left-0 bottom-0 z-10">
                        <div className="mx-auto  w-fit rounded-tr-4xl bg-primary-100 p-6 md:mt-0 md:w-full md:p-8">
                            <h1 className="heading-overlay">
                                Virtual <br className="md:hidden" />
                                Office <span className="block">in {city || 'Kerala'}</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
