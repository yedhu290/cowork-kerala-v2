import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

export type Crumb = { name: string; url: string };

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD.
 * Server component — the structured data mirrors the on-page navigation.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <>
            <JsonLd data={breadcrumbJsonLd(items)} />
            <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
                <ol className="flex flex-wrap items-center gap-2">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li key={item.url} className="flex items-center gap-2">
                                {isLast ? (
                                    <span aria-current="page" className="text-zinc-700">
                                        {item.name}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.url}
                                        className="transition-colors hover:text-primary-700"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                                {!isLast && <span className="text-zinc-300">/</span>}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
