import React from 'react';
import Image from 'next/image';

const images = [
    '/images/glimpse/standing-desk.png',
    '/images/glimpse/group-discussion.png',
    '/images/glimpse/open-office.png',
    '/images/glimpse/office-floor.png',
    '/images/glimpse/meeting-room.png',
    '/images/glimpse/standing-desk.png',
    '/images/glimpse/group-discussion.png',
    '/images/glimpse/open-office.png',
    '/images/glimpse/office-floor.png',
];

const GallerySection = () => {
    return (
        <section className="w-full py-12 md:py-20 text-center">
            <div className="flex flex-col items-center gap-4 mb-12">
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Gallery
                </span>
                <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900">
                    Images of our hot desk area
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GallerySection;
