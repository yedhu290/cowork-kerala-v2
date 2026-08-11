import Header from '@/components/ui/Header';
import { getLocations } from '@/services/locations';

/**
 * Server wrapper around the client `Header`. Fetches the city list once on the
 * server (ISR-cached and request-deduped with the page's own locations fetch)
 * and passes it in, so the nav renders with real cities on first paint and the
 * client never issues its own per-page locations request.
 */
export default async function HeaderServer() {
    const locations = await getLocations();
    return <Header initialLocations={locations} />;
}
