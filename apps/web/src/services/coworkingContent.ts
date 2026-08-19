import { KERALA_COWORKING, type KeralaContent } from '@/lib/keralaContent';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8091/api/v1';

/**
 * Fetch the dashboard-managed content for the /coworking-space hub page.
 *
 * Falls back to the bundled default copy (`KERALA_COWORKING`) on any failure or
 * malformed response, so a transient API outage can never blank the page — it
 * just renders the last-known-good default instead.
 */
export const getCoworkingContent = async (): Promise<KeralaContent> => {
    try {
        const response = await fetch(`${API_BASE_URL}/content/coworking`, {
            next: { revalidate: 300 }, // Refresh editable copy every 5 minutes
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const c = data?.data;
        if (data?.success && c) {
            // Guard each field independently so a partial document still renders.
            return {
                heading:
                    typeof c.heading === 'string' && c.heading.trim()
                        ? c.heading
                        : KERALA_COWORKING.heading,
                intro: Array.isArray(c.intro) ? c.intro : KERALA_COWORKING.intro,
                sections: Array.isArray(c.sections)
                    ? c.sections
                    : KERALA_COWORKING.sections,
                faqs: Array.isArray(c.faqs) ? c.faqs : KERALA_COWORKING.faqs,
            };
        }
        return KERALA_COWORKING;
    } catch (error) {
        console.error('Error fetching coworking content:', error);
        return KERALA_COWORKING;
    }
};
