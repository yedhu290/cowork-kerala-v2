/**
 * City-level location data for the /{service}/[city] landing pages.
 *
 * This is service-agnostic — the key business areas and location photo describe
 * the *city*, so the same data powers the coworking, private-office and
 * virtual-office pages for that city. Internal links, however, are
 * service-aware (they cross-link sibling services and the same service in
 * other cities), so those are computed from `service` + `citySlug`.
 *
 * Cities without bespoke data fall back to a generic-but-valid entry built
 * from the display name, so newly added locations still render correctly.
 */

import {
    SERVICE_LABEL_SINGULAR,
    ALL_SERVICES,
    type ServiceSlug,
} from '@/lib/cityContent';

export type CityPhoto = { src: string; alt: string };

export type CityLocationInfo = {
    /** Key business / workspace areas in the city (used in copy + alt text). */
    areas: string[];
    /** Location photo. Swap `src` for a real city/office photograph when available. */
    photo: CityPhoto;
};

/** Display names for cities we cross-link in the internal-links block. */
export const CITY_DISPLAY: Record<string, string> = {
    kochi: 'Kochi',
    trivandrum: 'Trivandrum',
    calicut: 'Calicut',
    thrissur: 'Thrissur',
};

const CITY_LOCATIONS: Record<string, CityLocationInfo> = {
    kochi: {
        areas: ['Infopark & Kakkanad', 'SmartCity Kochi', 'MG Road & Marine Drive', 'Kaloor'],
        photo: {
            src: '/images/hero-banner/people-coworking.png',
            alt: 'Coworking space in Kochi with professionals working near the Infopark IT corridor',
        },
    },

    trivandrum: {
        areas: ['Technopark & Kazhakkoottam', 'Vazhuthacaud', 'Pattom', 'Kowdiar'],
        photo: {
            src: '/images/glimpse/open-office.png',
            alt: 'Coworking space in Trivandrum with open-plan desks near Technopark, Kazhakkoottam',
        },
    },

    calicut: {
        areas: ['UL / Government Cyberpark', 'Mavoor Road', 'Nadakkavu', 'Mananchira'],
        photo: {
            src: '/images/glimpse/office-floor.png',
            alt: 'Coworking space in Calicut with a modern office floor near Cyberpark, Kozhikode',
        },
    },

    thrissur: {
        areas: ['Swaraj Round', 'Ollur', 'Punkunnam', 'Poothole'],
        photo: {
            src: '/images/glimpse/meeting-room.png',
            alt: 'Coworking space in Thrissur with a meeting room near Swaraj Round in the city centre',
        },
    },
};

/** Generic-but-valid location info for a city without bespoke data. */
function fallbackLocation(displayName: string): CityLocationInfo {
    return {
        areas: ['City centre', 'Main business district'],
        photo: {
            src: '/images/hero-banner/b1.png',
            alt: `Coworking space in ${displayName}, Kerala with modern, professional workspace`,
        },
    };
}

export function getCityLocationInfo(citySlug: string, displayName: string): CityLocationInfo {
    return CITY_LOCATIONS[citySlug.toLowerCase()] ?? fallbackLocation(displayName);
}

export type InternalLink = { label: string; href: string };

export type CityInternalLinks = {
    /** Other services offered in the same city. */
    sameCity: InternalLink[];
    /** The same service in other cities. */
    otherCities: InternalLink[];
};

/**
 * Cross-links for a city/service page: the sibling services in the same city
 * and the same service across the other cities we serve. Both are strong
 * internal-linking signals for local SEO and help visitors navigate.
 */
export function getCityInternalLinks(
    citySlug: string,
    service: ServiceSlug,
    displayName: string
): CityInternalLinks {
    const slug = citySlug.toLowerCase();

    const sameCity: InternalLink[] = ALL_SERVICES.filter((s) => s !== service).map((s) => ({
        label: `${SERVICE_LABEL_SINGULAR[s]} in ${displayName}`,
        href: `/${s}/${slug}`,
    }));

    const otherCities: InternalLink[] = Object.keys(CITY_DISPLAY)
        .filter((c) => c !== slug)
        .map((c) => ({
            label: `${SERVICE_LABEL_SINGULAR[service]} in ${CITY_DISPLAY[c]}`,
            href: `/${service}/${c}`,
        }));

    return { sameCity, otherCities };
}
