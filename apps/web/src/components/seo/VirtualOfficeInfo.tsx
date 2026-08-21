import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Location } from '@/services/locations';

/**
 * Educational, keyword-rich content block for the main /virtual-office page.
 * Adds unique copy, an image, and internal links (coworking, private office,
 * per-city pages, blog and contact) that the marketing sections don't cover.
 */
export default function VirtualOfficeInfo({ locations }: { locations: Location[] }) {
    return (
        <section className="flex flex-col gap-16">
            {/* Intro */}
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="flex flex-col gap-4">
                    <h2 className="heading-subsection text-zinc-900">What is a virtual office?</h2>
                    <p className="leading-relaxed text-zinc-600">
                        A virtual office gives your business a real, professional address in a prime
                        commercial location — without renting desks or paying for space you don’t
                        use. You get a business address for your website, invoices and government
                        registrations, along with mail handling and on-demand access to meeting
                        rooms when you need them.
                    </p>
                    <p className="leading-relaxed text-zinc-600">
                        It’s the practical way for founders, freelancers and remote-first teams to
                        look established across Kerala while keeping overheads low. Many businesses
                        pair a virtual office with a{' '}
                        <Link
                            href="/coworking-space"
                            className="font-medium text-primary-700 underline-offset-2 hover:underline"
                        >
                            coworking space
                        </Link>{' '}
                        or a{' '}
                        <Link
                            href="/private-office"
                            className="font-medium text-primary-700 underline-offset-2 hover:underline"
                        >
                            private office
                        </Link>{' '}
                        as they grow.
                    </p>
                </div>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-zinc-200">
                    <Image
                        src="/images/virtual-office/card-2.png"
                        alt="A professional virtual office business address in Kerala"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* City coverage — internal links to each city page */}
            {locations.length > 0 && (
                <div className="flex flex-col gap-5">
                    <h2 className="heading-subsection text-zinc-900">
                        Virtual office locations across Kerala
                    </h2>
                    <p className="max-w-2xl leading-relaxed text-zinc-600">
                        We provide virtual offices in Kerala’s main business and IT hubs. Choose your
                        city to see local details, pricing guidance and answers to common questions.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {locations.map((location) => (
                            <Link
                                key={location.id}
                                href={`/virtual-office/${location.name.toLowerCase()}`}
                                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-primary-200 hover:text-primary-700"
                            >
                                <MapPin size={15} aria-hidden="true" />
                                Virtual office in {location.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
