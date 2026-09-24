import { CITY_DISPLAY } from '@/lib/cityLocation';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8091/api/v1';

export interface Location {
    id: string;
    name: string;
    image: string;
    /** Short blurb, used as the city-card description on the coworking hub. */
    description?: string;
    /** Dashboard-managed sort weight (higher = shown first). */
    priority?: number;
}

export const getLocations = async (): Promise<Location[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`, {
            next: { revalidate: 3600 }, // Locations rarely change: refresh hourly
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
            // The API returns Mongo's `_id`, not `id`. Normalize it here so every
            // caller can rely on a stable `location.id` for React keys and links
            // (falling back to the unique city name if neither is present).
            return (data.data as Array<Location & { _id?: string }>).map((loc) => ({
                ...loc,
                id: loc.id ?? loc._id ?? loc.name,
            }));
        }
        return [];
    } catch (error) {
        // Non-fatal: callers fall back to bundled defaults (e.g. the Header's
        // FALLBACK_CITIES), so a transient API outage shouldn't surface as a red
        // console error or bump Next's dev "Issues" counter. Warn, don't error —
        // still visible in logs, just not flagged as a failure.
        console.warn(
            'Locations API unavailable, using fallback:',
            error instanceof Error ? error.message : error,
        );
        return [];
    }
};

/**
 * Whether a city slug matches a real, served location. Used by the [city] pages
 * to return a proper 404 for unknown slugs (instead of a soft 404 with fallback
 * content). If the locations service is unavailable and returns an empty list,
 * this returns true so a transient outage can't 404 otherwise-valid city pages.
 */
export const isKnownCity = async (citySlug: string): Promise<boolean> => {
    const locations = await getLocations();
    if (locations.length === 0) return true;
    const slug = citySlug.toLowerCase();
    return locations.some((loc) => loc.name.toLowerCase() === slug);
};

/**
 * City slugs to prerender, for the [city] routes that set `dynamicParams = false`.
 *
 * The API is the source of truth: it lists the cities that actually have
 * locations. CITY_DISPLAY is only a fallback for when the API is unreachable
 * during a build - without it an empty list would 404 every city page at once.
 *
 * It is deliberately a fallback rather than a union. CITY_DISPLAY contains
 * cities that may have no location in the database (thrissur, at the time of
 * writing). Merging the two prerendered those pages, and isKnownCity() then
 * rejected them at render time - producing the not-found view under a 200,
 * which is the soft 404 this was meant to remove.
 */
export const getCityParamSlugs = async (): Promise<string[]> => {
    const locations = await getLocations();
    if (locations.length > 0) {
        return locations.map((loc) => loc.name.toLowerCase());
    }
    return Object.keys(CITY_DISPLAY);
};
