import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GiOfficeChair } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { PiLaptopFill } from 'react-icons/pi';

const SpaceAdapts = () => {
    const services = [
        {
            icon: IoIosPeople,
            title: 'Coworking spaces',
            description:
                'Collaborative open workspaces designated for freelancers, remote workers, and growing teams.',
        },
        {
            icon: GiOfficeChair,
            title: 'Private offices',
            description:
                'Fully furnished, secure private cabins tailored for teams requiring focus and privacy.',
        },
        {
            icon: PiLaptopFill,
            title: 'Virtual offices',
            description:
                'Establish a professional business presence with our prime address and mail handling services.',
        },
    ];

    const avatars = [
        '/images/thumb-1.jpg',
        '/images/thumb-2.png',
        '/images/thumb-1.jpg',
        '/images/thumb-2.png',
        '/images/thumb-1.jpg',
    ];

    return (
        <section className="w-full py-8 md:py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                {/* Left Content */}
                <div className="space-y-6 md:space-y-8">
                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 md:mb-4">
                            <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                            <p className="text-xs md:text-sm font-medium tracking-wider uppercase text-zinc-700">
                                WHY CHOOSE US
                            </p>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 leading-tight">
                            A Space That Adapts to Your Needs
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed">
                        Discover and instantly book coworking hubs, private offices, and virtual
                        address services in Kochi, Thiruvananthapuram, Calicut, and Thrissur.
                        Compare real-time pricing, amenities, and locations—whether you&apos;re a
                        freelancer, startup, or enterprise, your ideal workspace is just a click
                        away.
                    </p>

                    {/* CTA Button */}
                    <div>
                        <Link
                            href="/coworking-space"
                            className="px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-[#CFEAB1] text-zinc-900 text-xs md:text-sm font-medium tracking-wide hover:bg-[#bfda9f] transition-colors inline-block"
                        >
                            DISCOVER MORE
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex sm:flex-row items-start gap-8 sm:gap-12 pt-2 md:pt-4">
                        <div>
                            <div className="text-4xl sm:text-5xl md:text-7xl font-normal text-zinc-900 mb-1 md:mb-2">
                                50+
                            </div>
                            <p className="text-xs sm:text-sm md:text-base text-zinc-600">
                                Coworking Spaces
                            </p>
                        </div>
                        <div>
                            <div className="text-4xl sm:text-5xl md:text-7xl font-normal text-zinc-900 mb-1 md:mb-2">
                                2,000+
                            </div>
                            <p className="text-xs sm:text-sm md:text-base text-zinc-600">
                                Happy Clients
                            </p>
                        </div>
                    </div>

                    {/* Community */}
                    <div className="pt-2 md:pt-4">
                        <p className="text-base md:text-2xl font-medium text-zinc-900 mb-2 md:mb-3">
                            Community Coworking 500+
                        </p>
                        <div className="flex items-center -space-x-2 md:-space-x-3 mt-2">
                            {avatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className="relative size-12 md:size-16 rounded-full border-2 border-primary-100 overflow-hidden bg-primary-200"
                                >
                                    <Image
                                        src={avatar}
                                        alt={`Community member ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="space-y-6 md:space-y-8">
                    {/* Hero Image */}
                    <div className="relative w-full rounded-3xl overflow-hidden">
                        <Image
                            src="/images/landing/banner-3.png"
                            alt="Coworking"
                            width={1000}
                            height={1000}
                            className="object-cover"
                        />
                    </div>

                    {/* Service Cards */}
                    <div className="bg-white rounded-3xl border border-zinc-200 p-2">
                        {services.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <div
                                    key={index}
                                    className={`flex items-start gap-4 p-6 ${
                                        index !== services.length - 1
                                            ? 'border-b border-zinc-100'
                                            : ''
                                    }`}
                                >
                                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#EBFFD8] flex items-center justify-center">
                                        <IconComponent className="w-8 h-8 text-[#3b6874]" />
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <h3 className="text-xl font-medium text-zinc-900 mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpaceAdapts;
