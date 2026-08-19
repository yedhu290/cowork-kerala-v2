import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, ArrowUpRight } from 'lucide-react';
import Fixedw from './Fixedw';
import NewsletterForm from './NewsletterForm';
import { INSTAGRAM_URL } from '@/lib/seo';

const CONTACT_ITEMS = [
    {
        icon: Phone,
        label: '+91 7356735091',
        href: 'tel:+917356735091',
        external: false,
    },
    {
        icon: Mail,
        label: 'coworkkerala@gmail.com',
        href: 'mailto:coworkkerala@gmail.com',
        external: false,
    },
    {
        icon: MapPin,
        label: 'Kochi, Kerala, India',
        href: 'https://www.google.com/maps/search/?api=1&query=Kochi%2C+Kerala%2C+India',
        external: true,
    },
];

const LINK_COLUMNS = [
    {
        title: 'Company',
        links: [
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about' },
            { label: 'Blog', href: '/blog' },
        ],
    },
    {
        title: 'Spaces',
        links: [
            { label: 'Coworking Space', href: '/coworking-space' },
            { label: 'Private Office', href: '/private-office' },
            { label: 'Virtual Office', href: '/virtual-office' },
        ],
    },
    {
        title: 'Quick Links',
        links: [
            { label: 'Contact', href: '/contact' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms & Conditions', href: '/terms' },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="w-full border-t border-zinc-200 pt-14">
            <Fixedw>
                <div className="grid gap-10 md:grid-cols-12 md:gap-12">
                    {/* Left: contact + link columns */}
                    <div className="md:col-span-6">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-primary-500" />
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                                Get in Touch
                            </span>
                        </div>

                        <h2 className="heading-subsection mt-4 text-zinc-900">
                            Let{`'`}s Keep in Touch
                            <br /> with Us!
                        </h2>

                        <p className="mt-5 max-w-xl text-zinc-600">
                            Contact us today to explore the possibilities of our dynamic co-working
                            space. Your ideal workspace is just a message or call away with us.
                        </p>

                        <ul className="mt-7 space-y-3">
                            {CONTACT_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        {...(item.external
                                            ? { target: '_blank', rel: 'noopener noreferrer' }
                                            : {})}
                                        className="group inline-flex items-center gap-3 text-zinc-700 transition-colors hover:text-primary-700"
                                    >
                                        <span className="grid size-10 place-items-center rounded-full bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-200">
                                            <item.icon size={18} />
                                        </span>
                                        <span className="font-medium">{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-7 flex items-center gap-3">
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow CoWork Kerala on Instagram"
                                className="flex size-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-900 transition-colors hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>

                        <div className="my-9 h-px w-full bg-zinc-200" />

                        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                            {LINK_COLUMNS.map((column) => (
                                <div key={column.title}>
                                    <h3 className="text-sm font-bold text-zinc-900">
                                        {column.title}
                                    </h3>
                                    <ul className="mt-4 space-y-2.5 text-sm text-zinc-600">
                                        {column.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="transition-colors hover:text-primary-700"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: newsletter image card */}
                    <div className="md:col-span-6">
                        <div className="relative h-full overflow-hidden rounded-3xl border border-zinc-200">
                            <div className="relative h-full min-h-[22rem] w-full">
                                <Image
                                    src="/images/footer/footer.png"
                                    alt="CoWork Kerala coworking space"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                                <div className="text-lg font-semibold text-white">
                                    Subscribe to our Newsletter
                                </div>
                                <p className="mt-1 text-sm text-white/80">
                                    Get workspace tips and offers straight to your inbox.
                                </p>
                                <NewsletterForm />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-zinc-200 py-6 text-sm text-zinc-500 sm:flex-row">
                    <div>
                        © {new Date().getFullYear()} CoWork Kerala. All rights reserved.{' '}
                        <span className="mx-1 text-zinc-300">|</span> Powered by{' '}
                        <a
                            href="https://mastrovia.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 font-medium text-zinc-700 transition-colors hover:text-primary-700"
                        >
                            mastrovia.com
                            <ArrowUpRight size={14} />
                        </a>
                    </div>
                    <div className="flex gap-5">
                        <Link className="transition-colors hover:text-primary-700" href="/privacy">
                            Privacy
                        </Link>
                        <Link className="transition-colors hover:text-primary-700" href="/terms">
                            Terms
                        </Link>
                    </div>
                </div>
            </Fixedw>
        </footer>
    );
};

export default Footer;
