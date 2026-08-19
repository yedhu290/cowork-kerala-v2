import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import JsonLd from '@/components/seo/JsonLd';
import {
    SITE_URL,
    SITE_NAME,
    SITE_DESCRIPTION,
    DEFAULT_OG_IMAGE,
    organizationJsonLd,
    localBusinessJsonLd,
    websiteJsonLd,
} from '@/lib/seo';
import './globals.css';

const manrope = Manrope({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-manrope',
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    // No title template: pages already hard-code "| CoWork Kerala".
    title: 'CoWork Kerala | Coworking Spaces & Virtual Offices',
    description: SITE_DESCRIPTION,
    keywords: [
        'coworking spaces Kerala',
        'coworking Kochi',
        'virtual office Kerala',
        'private office Kerala',
        'shared office space Kochi',
        'flexible workspace Kerala',
    ],
    applicationName: SITE_NAME,
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: SITE_URL,
        siteName: SITE_NAME,
        title: 'CoWork Kerala | Coworking Spaces & Virtual Offices',
        description: SITE_DESCRIPTION,
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CoWork Kerala | Coworking Spaces & Virtual Offices',
        description: SITE_DESCRIPTION,
        images: [DEFAULT_OG_IMAGE],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
            { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icon.svg', type: 'image/svg+xml' },
        ],
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-IN" className={manrope.variable}>
            <body className={`antialiased`}>
                <JsonLd
                    data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]}
                />
                {children}
                <Toaster richColors position="top-center" />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
            </body>
        </html>
    );
}
