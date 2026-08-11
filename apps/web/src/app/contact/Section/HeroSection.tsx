import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="w-full relative">
            <div className="grid gap-6 md:gap-10">
                {/* Background image */}
                <div className="relative md:aspect-[22/9] aspect-square w-full overflow-hidden rounded-3xl">
                    <Image
                        src="/images/hero-banner/people-coworking.png"
                        alt="Team collaborating in an office"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Overlay title card */}
                <div className="absolute left-0 bottom-0 z-10 md:w-[60%] lg:w-[40%]">
                    <div className="mx-auto w-fit md:w-full rounded-tr-4xl bg-primary-100 p-5 md:p-8">
                        <h1 className="text-3xl md:text-5xl font-medium leading-tight text-zinc-900">
                            Contact our
                            <br />
                            team
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
