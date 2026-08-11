import Image from 'next/image';
import { getCityLocationInfo } from '@/lib/cityLocation';

/**
 * Location block for a {service}/[city] page: a short orientation line and a
 * location photo. Service-agnostic — the city geography is the same whichever
 * workspace type the page is about.
 */
export default function CityLocationSection({
    citySlug,
    displayName,
}: {
    citySlug: string;
    displayName: string;
}) {
    const info = getCityLocationInfo(citySlug, displayName);

    return (
        <section className="flex flex-col gap-8">
            <div className="flex max-w-3xl flex-col gap-3">
                <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-primary-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                        Location
                    </span>
                </div>
                <h2 className="heading-subsection text-zinc-900">
                    Where you&apos;ll be working in {displayName}
                </h2>
                <p className="leading-relaxed text-zinc-600">
                    {`Our ${displayName} workspaces are set around ${info.areas
                        .slice(0, 3)
                        .join(', ')} — close to the city’s main business hubs, transport ` +
                        'links and everyday amenities.'}
                </p>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-zinc-200 md:h-80">
                <Image
                    src={info.photo.src}
                    alt={info.photo.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
            </div>
        </section>
    );
}
