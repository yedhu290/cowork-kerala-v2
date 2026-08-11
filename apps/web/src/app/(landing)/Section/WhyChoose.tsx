import Image from 'next/image';
import React from 'react';
import { Shield, Hourglass, Users, Headphones, MapPin, Gem } from 'lucide-react';

const WhyChoose = () => {
    const features = [
        {
            icon: Shield,
            title: 'Verified Spaces',
            description:
                'All our partner spaces in Kerala are verified and quality checked for your peace of mind.',
        },
        {
            icon: Hourglass,
            title: 'Instant Booking',
            description:
                'Book your workspace instantly with our seamless booking process across Kerala.',
        },
        {
            icon: Users,
            title: 'Kerala Community',
            description:
                'Connect with like-minded professionals and entrepreneurs from across Kerala..',
        },
        {
            icon: Headphones,
            title: 'Local Support',
            description:
                'Dedicated Malayalam and English support team to assist you whenever needed.',
        },
        {
            icon: MapPin,
            title: 'Prime Kerala Locations',
            description:
                "Workspaces located in the heart of business districts across Kerala's major cities.",
        },
        {
            icon: Gem,
            title: 'Premium Amenities',
            description:
                'High-speed internet, refreshments, printing, and meeting rooms at every Kerala location.',
        },
    ];

    return (
        <section className="w-full py-8 md:py-12 lg:py-16">
            {/* Top Section - Why Choose */}
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                    Why Choose Cowork Kerala?
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 uppercase tracking-widest px-4 font-medium">
                    EXPERIENCE THE DIFFERENCE WITH KERALA{"'"}S MOST TRUSTED COWORKING PLATFORM
                </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 lg:mb-24">
                {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-6 md:p-8 rounded-3xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_25px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#EBFFD8]">
                                <IconComponent
                                    className="h-8 w-8 text-[#76A04E]"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <h3 className="mb-3 text-lg md:text-xl font-bold text-zinc-900">
                                {feature.title}
                            </h3>
                            <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-xs">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Section - Call to Action */}
            {/* Bottom Section - Call to Action */}
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#CFEAB1] to-[#E8F5D6]">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <Image
                        src="/images/landing/Ellipse 1033.svg"
                        alt=""
                        width={500}
                        height={500}
                        className="absolute -bottom-32 -left-20 opacity-60"
                    />
                    <Image
                        src="/images/landing/Group.svg"
                        alt=""
                        width={300}
                        height={300}
                        className="absolute top-0 left-0 opacity-40"
                    />
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
                    <div className="md:col-span-7 p-6 sm:p-8 md:p-10 lg:p-12">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B2B2B] mb-3 md:mb-4 leading-tight">
                            Discover your perfect workspace with Cowork
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-xl">
                            We connect you to top coworking spaces and virtual offices across
                            Kerala. Compare prices, explore amenities, and book instantly—perfect
                            for freelancers, startups, and businesses seeking flexible, professional
                            work environments.
                        </p>
                    </div>
                    <div className="md:col-span-5 relative h-full min-h-[300px] md:min-h-[400px] flex items-end justify-end">
                        <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] md:[mask-image:linear-gradient(to_right,transparent_0%,black_20%)]">
                            <Image
                                src="/images/landing/cta-banner-1.png"
                                alt="Coworking space environment"
                                fill
                                className="object-cover object-center md:object-left"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
