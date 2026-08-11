/**
 * Central SEO configuration and site-wide structured-data (JSON-LD) builders.
 *
 * Keep all canonical URLs, brand strings, and NAP (name/address/phone) details
 * here so metadata and structured data stay consistent across the site.
 */

import type { Workspace } from '@/services/workspace.service';

export const SITE_URL = 'https://coworkkerala.com';
export const SITE_NAME = 'CoWork Kerala';

export const SITE_DESCRIPTION =
    'Find and book coworking spaces, private offices, and virtual offices across ' +
    'Kerala. Flexible workspaces in Kochi, Trivandrum, Calicut, and Thrissur ' +
    'for remote professionals, startups, and growing teams.';

/** Default social-share image (1200x630 recommended). */
export const DEFAULT_OG_IMAGE = '/images/hero-banner/people-coworking.png';

/** Contact details (NAP) — used in structured data and shared UI. */
export const CONTACT_PHONE = '+917356735091';
export const CONTACT_EMAIL = 'coworkkerala@gmail.com';
export const LOCALITY = 'Kochi';
export const REGION = 'Kerala';
export const COUNTRY = 'IN';

/** Cities the business serves — reused in schema and copy. */
export const SERVICE_AREAS = ['Kochi', 'Trivandrum', 'Calicut', 'Thrissur'];

/** Official Instagram profile (canonical URL — no share-tracking parameters). */
export const INSTAGRAM_URL = 'https://www.instagram.com/coworkkerala';

/**
 * Public social-profile URLs. Add the brand's Facebook / LinkedIn / etc. links
 * here and they are automatically emitted as `sameAs` in the Organization and
 * LocalBusiness schema — a local-SEO signal that links the brand to its profiles.
 */
export const SOCIAL_PROFILES: string[] = [INSTAGRAM_URL];

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = ''): string {
    if (path.startsWith('http')) return path;
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Organization schema — identifies the brand entity to search engines. */
export function organizationJsonLd() {
    const data: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl('/logo/logo.png'),
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE,
        areaServed: SERVICE_AREAS,
    };

    // Emit sameAs only once real profile URLs are provided.
    if (SOCIAL_PROFILES.length) data.sameAs = SOCIAL_PROFILES;

    return data;
}

/** LocalBusiness schema — powers local/map results for the coworking brand. */
export function localBusinessJsonLd() {
    const data: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        logo: absoluteUrl('/logo/logo.png'),
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE,
        priceRange: '₹₹',
        address: {
            '@type': 'PostalAddress',
            addressLocality: LOCALITY,
            addressRegion: REGION,
            addressCountry: COUNTRY,
        },
        areaServed: SERVICE_AREAS.map((city) => ({
            '@type': 'City',
            name: city,
        })),
    };

    // Emit sameAs only once real profile URLs are provided.
    if (SOCIAL_PROFILES.length) data.sameAs = SOCIAL_PROFILES;

    return data;
}

/** WebSite schema — enables the sitename treatment in search results. */
export function websiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
    };
}

/**
 * FAQPage schema. Only use this when the questions and answers are also
 * visible on the page — Google requires the content to be present for users,
 * not injected solely for the rich result.
 */
export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/** BreadcrumbList schema for a trail of { name, url } items. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.url),
        })),
    };
}

/**
 * Product schema for a single coworking/office space detail page.
 *
 * Every field maps to content visible on the page (name, gallery images,
 * description, pricing). The AggregateOffer is emitted only when at least one
 * price tier is available, so we never advertise a price the page doesn't show.
 */
export function workspaceProductJsonLd(workspace: Workspace, path: string) {
    const prices = [
        workspace.pricing?.hotDesk,
        workspace.pricing?.dedicatedDesk,
        workspace.pricing?.privateOffice,
    ].filter((price): price is number => typeof price === 'number' && price > 0);

    const data: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${absoluteUrl(path)}#product`,
        name: workspace.spaceName,
        description:
            workspace.shortDescription ||
            workspace.longDescription ||
            `${workspace.spaceType} in ${workspace.city?.name ?? REGION}.`,
        category: workspace.spaceType,
        brand: { '@type': 'Brand', name: SITE_NAME },
        url: absoluteUrl(path),
    };

    const images = (workspace.images ?? []).filter(Boolean).map((img) => absoluteUrl(img));
    if (images.length) data.image = images;

    if (prices.length) {
        data.offers = {
            '@type': 'AggregateOffer',
            priceCurrency: 'INR',
            lowPrice: Math.min(...prices),
            offerCount: prices.length,
            availability: 'https://schema.org/InStock',
            areaServed: workspace.city?.name,
        };
    }

    return data;
}

/**
 * BlogPosting schema for a single blog post.
 *
 * Every field maps to content visible on the post page (headline, description,
 * author, publish date, hero image).
 */
export function blogPostingJsonLd(post: {
    title: string;
    description: string;
    date: string;
    author: string;
    image?: string;
    path: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${absoluteUrl(post.path)}#blogposting`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Person', name: post.author },
        publisher: { '@id': `${SITE_URL}/#organization` },
        image: absoluteUrl(post.image ?? DEFAULT_OG_IMAGE),
        url: absoluteUrl(post.path),
        mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(post.path) },
    };
}

/**
 * Service schema for a service-category landing page
 * (coworking / virtual office / private office).
 *
 * Ties the offering to the brand as provider and lists the cities served.
 * Backed by the descriptive hero copy on each landing page.
 */
export function serviceJsonLd(opts: {
    name: string;
    description: string;
    path: string;
    serviceType?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${absoluteUrl(opts.path)}#service`,
        name: opts.name,
        description: opts.description,
        serviceType: opts.serviceType ?? opts.name,
        url: absoluteUrl(opts.path),
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: SERVICE_AREAS.map((city) => ({ '@type': 'City', name: city })),
    };
}
