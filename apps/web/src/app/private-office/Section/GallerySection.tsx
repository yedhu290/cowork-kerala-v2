import Image from 'next/image';

/** A look at private offices, cabins and shared amenities across our spaces. */
const images = [
    { src: '/images/private-office/hero-1.png', alt: 'Private office cabin with desks and seating' },
    { src: '/images/glimpse/meeting-room.png', alt: 'Meeting room for team sessions and client calls' },
    { src: '/images/private-office/hero-3.png', alt: 'Bright private office workspace' },
    { src: '/images/glimpse/office-floor.png', alt: 'Managed office floor with private cabins' },
    { src: '/images/about/about-2.png', alt: 'Team working in a private office suite' },
    { src: '/images/private-office/cta-1.png', alt: 'Furnished private office ready to move in' },
];

export default function GallerySection() {
    return (
        <section className="w-full py-8 md:py-12">
            <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center md:mb-12">
                <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-primary-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                        Gallery
                    </span>
                    <span className="h-px w-10 bg-primary-500" />
                </div>
                <h2 className="heading-section text-zinc-900">A look inside our private offices</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
                {images.map((image, index) => (
                    <div
                        key={image.src + index}
                        className={`group relative overflow-hidden rounded-3xl ${
                            index === 0 ? 'col-span-2 md:col-span-2 md:row-span-2' : ''
                        } ${index === 0 ? 'aspect-16/10 md:aspect-auto' : 'aspect-square md:aspect-4/3'}`}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
