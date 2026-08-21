import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getCityInternalLinks, type InternalLink } from '@/lib/cityLocation';
import { SERVICE_LABEL_SINGULAR, type ServiceSlug } from '@/lib/cityContent';

function LinkGroup({ title, links }: { title: string; links: InternalLink[] }) {
    if (!links.length) return null;
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-500">{title}</h3>
            <ul className="flex flex-col gap-2">
                {links.map((link) => (
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
        </div>
    );
}

/**
 * Internal-linking block for a {service}/[city] page. Cross-links the sibling
 * services in the same city and the same service across other cities — a local
 * SEO signal and a genuine navigation aid.
 */
export default function CityInternalLinks({
    citySlug,
    service,
    displayName,
}: {
    citySlug: string;
    service: ServiceSlug;
    displayName: string;
}) {
    const { sameCity, otherCities } = getCityInternalLinks(citySlug, service, displayName);

    return (
        <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
            <h2 className="heading-subsection text-zinc-900">Explore more workspaces</h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
                <LinkGroup title={`More in ${displayName}`} links={sameCity} />
                <LinkGroup
                    title={`${SERVICE_LABEL_SINGULAR[service]} in other cities`}
                    links={otherCities}
                />
            </div>
        </section>
    );
}
