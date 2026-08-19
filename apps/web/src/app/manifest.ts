import { MetadataRoute } from 'next';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${SITE_NAME} — Coworking Spaces in Kerala`,
        short_name: SITE_NAME,
        description: SITE_DESCRIPTION,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2f4858',
        icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            { src: '/icon.svg', type: 'image/svg+xml', purpose: 'any' },
        ],
    };
}
