import Image from 'next/image';

const HeroSection = ({
    currentCity,
    as: Heading = 'h1',
    headingClassName = 'text-3xl md:text-4xl font-medium leading-tight lg:w-64',
}: {
    currentCity?: string;
    /** Heading tag for the hero title. Defaults to h1 (one per page). */
    as?: 'h1' | 'h3';
    /** Size/width utilities for the hero title. Override to fit longer names. */
    headingClassName?: string;
}) => {
    return (
        <section className="w-full relative">
            <div className="absolute -left-9 -top-9 size-24 rounded-full bg-primary-50" />
            <div className="grid gap-6 md:gap-10">
                <div className="order-2 md:order-1 md:col-span-8">
                    <div className="relative md:aspect-22/9 aspect-square w-full overflow-hidden rounded-2xl border border-gray-200">
                        <Image
                            src="/images/hero-banner/b1.png"
                            alt="People working in a modern workspace"
                            fill
                            sizes="(max-width: 768px) 100vw, 80vw"
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="order-1 md:order-2 md:col-span-4 md:flex md:items-end absolute left-0 bottom-0 z-10">
                    <div className="mx-auto  w-fit rounded-tr-4xl bg-primary-100 p-6 md:-mt-0 md:w-full md:p-8">
                        <Heading className={`${headingClassName} capitalize`}>
                            Coworking in
                            <br />
                            {currentCity ? currentCity : 'Kerala'}
                        </Heading>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
