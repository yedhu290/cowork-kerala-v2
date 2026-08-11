import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Admin · CoWork Kerala',
    template: '%s · CoWork Kerala Admin',
  },
  description: 'Admin dashboard for CoWork Kerala coworking spaces',
  // Dashboard is not public content - keep it out of search results.
  // (also enforced site-wide via src/app/robots.ts disallowing /admin/)
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      {children}
    </div>
  );
}
