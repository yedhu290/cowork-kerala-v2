import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Location } from '@/services/locations';
import { privateOfficeStats } from '@/lib/privateOfficeContent';

/**
 * Core informative content for the Private Office page: quick stats, a
 * "what is it" intro, and internal links to each city's private-office page.
 */
export default function PrivateOfficeInfo({ locations }: { locations: Location[] }) {
    // Show cities in a stable, intentional order (dashboard priority first, then
    // alphabetically) so the list doesn't shift with API response ordering.
    const orderedLocations = [...locations].sort(
        (a, b) => (b.priority ?? 0) - (a.priority ?? 0) || a.name.localeCompare(b.name),
    );

    return (
        <div className="flex flex-col gap-16 md:gap-24">
            {/* Stats strip */}
            <section className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 md:grid-cols-4">
                {privateOfficeStats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center gap-1 bg-white p-6 text-center md:p-8"
                    >
                        <span className="text-3xl font-bold text-primary-600 md:text-4xl">
                            {stat.value}
                        </span>
                        <span className="text-sm text-zinc-600">{stat.label}</span>
                    </div>
                ))}
            </section>

            {/* Intro */}
            <section className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-10 bg-primary-500" />
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                            Private Offices
                        </span>
                    </div>
                    <h2 className="heading-subsection text-zinc-900">
                        What is a private office in Kerala?
                    </h2>
                    <p className="leading-relaxed text-zinc-600">
                        A private office is a lockable, fully furnished cabin or suite reserved just
                        for your team inside a managed workspace. You get the privacy, branding and
                        focus of your own office, with the amenities, flexibility and low overheads
                        of a serviced space — no long lease, deposits or fit-out headaches.
                    </p>
                    <p className="leading-relaxed text-zinc-600">
                        It’s ideal for growing teams that have outgrown a{' '}
                        <Link
                            href="/coworking-space"
                            className="font-medium text-primary-700 underline-offset-2 hover:underline"
                        >
                            coworking space
                        </Link>{' '}
                        but aren’t ready for a commercial lease. Need only an address instead? A{' '}
                        <Link
                            href="/virtual-office"
                            className="font-medium text-primary-700 underline-offset-2 hover:underline"
                        >
                            virtual office
                        </Link>{' '}
                        may be the better fit.
                    </p>
                </div>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-zinc-200">
                    <Image
                        src="/images/private-office/hero-2.png"
                        alt="A furnished private office cabin for a team in Kerala"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
            </section>

            {/* City coverage — internal links */}
            {locations.length > 0 && (
                <section className="flex flex-col gap-5">
                    <h2 className="heading-subsection text-zinc-900">
                        Find a private office in your city
                    </h2>
                    <p className="max-w-2xl leading-relaxed text-zinc-600">
                        Choose your city to see local private office options near its main business
                        and IT hubs.
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {orderedLocations.map((location) => (
                            <Link
                                key={location.id}
                                href={`/private-office/${location.name.toLowerCase()}`}
                                className="flex items-center justify-between gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-primary-200 hover:text-primary-700"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <MapPin size={15} aria-hidden="true" className="shrink-0" />
                                    Private office in {location.name}
                                </span>
                                <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
