import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

export const metadata: Metadata = {
    title: 'Co-Work Kerala',
    description: 'Find the best coworking spaces in Kerala',
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
        <html lang="en">
            <body className={`antialiased`}>
                {children}
                <Toaster richColors position="top-center" />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
            </body>
        </html>
    );
}
