import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import FaqSection from '@/components/seo/FaqSection';
import { getCityLocationInfo } from '@/lib/cityLocation';
import type { KeralaContent, CityCard } from '@/lib/keralaContent';

const OTHER_SERVICES = [
    { label: 'Private office in Kerala', href: '/private-office' },
    { label: 'Virtual office in Kerala', href: '/virtual-office' },
    { label: 'Talk to our team', href: '/contact' },
];

type Props = {
    /** Editable hub copy (heading, intro, sections, FAQs) — dashboard-managed. */
    content: KeralaContent;
    /** City cards to render — driven by the dashboard-managed Locations. */
    cityCards: CityCard[];
};

/**
 * Kerala-wide SEO block for the /coworking-space hub: unique intro, a grid of
 * city cards (photos + internal links), the state's major work hubs, a map,
 * FAQs and cross-service links. Copy and city cards are dashboard-managed and
 * passed in as props; the per-city photos/hubs fall back to curated location
 * data so nothing regresses when a Location has no image.
 */
export default function KeralaCoworkingSeo({ content, cityCards }: Props) {
    return (
        <section className="flex flex-col gap-12">
            {/* Intro */}
            <div className="flex max-w-3xl flex-col gap-4">
                <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-primary-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                        Coworking in Kerala
                    </span>
                </div>
                <h2 className="heading-subsection text-zinc-900">{content.heading}</h2>
                {content.intro.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed text-zinc-600">
                        {paragraph}
                    </p>
                ))}
            </div>

            {/* City cards */}
            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-bold text-zinc-900 md:text-2xl">
                    Choose your city
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                    {cityCards.map((city) => {
                        const info = getCityLocationInfo(city.slug, city.name);
                        const cardImage = city.image || info.photo.src;
                        return (
                            <Link
                                key={city.slug}
                                href={`/coworking-space/${city.slug}`}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 transition-shadow hover:shadow-lg"
                            >
                                <div className="relative h-44 w-full overflow-hidden">
                                    <Image
                                        src={cardImage}
                                        alt={`Coworking spaces in ${city.name}, Kerala`}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-2 p-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-zinc-900">
                                            {city.name}
                                        </span>
                                        <ArrowUpRight
                                            size={18}
                                            className="text-zinc-400 transition-colors group-hover:text-primary-700"
                                        />
                                    </div>
                                    <p className="text-sm leading-relaxed text-zinc-600">
                                        {city.blurb}
                                    </p>
                                    <span className="mt-1 text-sm font-semibold text-primary-700">
                                        View coworking spaces in {city.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Extra content sections */}
            <div className="flex max-w-3xl flex-col gap-10">
                {content.sections.map((section) => (
                    <div key={section.heading} className="flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-zinc-900 md:text-2xl">
                            {section.heading}
                        </h3>
                        {section.body.map((paragraph, index) => (
                            <p key={index} className="leading-relaxed text-zinc-600">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                ))}
            </div>

            {/* FAQ */}
            <div className="max-w-3xl">
                <FaqSection faqs={content.faqs} />
            </div>

            {/* Cross-service links */}
            <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
                <h2 className="heading-subsection text-zinc-900">Looking for something else?</h2>
                <ul className="mt-6 flex flex-col gap-2">
                    {OTHER_SERVICES.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="group inline-flex items-center gap-1.5 font-medium text-zinc-800 transition-colors hover:text-primary-700"
                            >
                                {link.label}
                                <ArrowUpRight
                                    size={15}
                                    className="text-zinc-400 transition-colors group-hover:text-primary-700"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}
