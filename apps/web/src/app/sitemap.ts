import { MetadataRoute } from 'next';
import { getWorkspaces } from '@/services/workspace.service';
import { getLocations } from '@/services/locations';

const BASE_URL = 'https://coworkkerala.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/virtual-office`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/private-office`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/coworking-space`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ];

    // Dynamic workspace pages
    let workspacePages: MetadataRoute.Sitemap = [];
    try {
        const workspacesResponse = await getWorkspaces({ limit: 100 });
        if (workspacesResponse?.data) {
            workspacePages = workspacesResponse.data.map((workspace) => ({
                url: `${BASE_URL}/coworking-space/details/${workspace.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));
        }
    } catch (error) {
        console.error('Error fetching workspaces for sitemap:', error);
    }

    // Dynamic city pages
    let cityPages: MetadataRoute.Sitemap = [];
    try {
        const locationsResponse = await getLocations();
        if (locationsResponse) {
            cityPages = locationsResponse.map((location) => ({
                url: `${BASE_URL}/coworking-space/${encodeURIComponent(location.name.toLowerCase())}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));
        }
    } catch (error) {
        console.error('Error fetching locations for sitemap:', error);
    }

    return [...staticPages, ...workspacePages, ...cityPages];
}
