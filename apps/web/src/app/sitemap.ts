import { MetadataRoute } from 'next';
import { getWorkspaces } from '@/services/workspace.service';
import { getLocations } from '@/services/locations';
import { SITE_URL as BASE_URL } from '@/lib/seo';
import { getAllPostMeta } from '@/lib/blog';

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
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Blog posts (local MDX content — no network call needed)
    const blogPages: MetadataRoute.Sitemap = getAllPostMeta().map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

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

    // Dynamic city pages — one entry per service type, per city.
    let cityPages: MetadataRoute.Sitemap = [];
    try {
        const locationsResponse = await getLocations();
        if (locationsResponse) {
            cityPages = locationsResponse.flatMap((location) => {
                const city = encodeURIComponent(location.name.toLowerCase());
                return (['coworking-space', 'virtual-office', 'private-office'] as const).map(
                    (service) => ({
                        url: `${BASE_URL}/${service}/${city}`,
                        lastModified: new Date(),
                        changeFrequency: 'weekly' as const,
                        priority: 0.8,
                    }),
                );
            });
        }
    } catch (error) {
        console.error('Error fetching locations for sitemap:', error);
    }

    return [...staticPages, ...blogPages, ...workspacePages, ...cityPages];
}
