import Image from 'next/image';
import React from 'react';

const AboutIntroSection = () => {
    return (
        <section className="w-full">
            <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
                {/* Image */}
                <div className="md:col-span-5">
                    <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-gray-200 aspect-auto">
                        <Image
                            src="/images/glimpse/meeting-room.png"
                            alt="Team member in a modern workspace"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="md:col-span-7">
                    <p className="text-xl leading-8 text-zinc-700 md:text-xl md:leading-9">
                        Cowork Kerala, a dynamic co-working space where ambition meets community. We
                        redefine the work experience, providing flexible solutions for individuals
                        and teams to thrive in our own vibrant and collaborative environment. Our
                        meticulously designed spaces inspire creativity, foster connections, and
                        provide the ideal backdrop for innovation.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutIntroSection;
