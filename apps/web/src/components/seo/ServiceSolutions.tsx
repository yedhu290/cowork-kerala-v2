import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Homepage "workspace solutions" showcase — three image cards linking to the
 * main service pages with keyword-rich copy. Adds internal links to the site's
 * key landing pages that the other homepage sections don't cover directly.
 */
const services = [
    {
        title: 'Coworking Spaces',
        href: '/coworking-space',
        image: '/images/glimpse/open-office.png',
        desc: 'Hot desks, dedicated desks and shared studios across Kochi, Trivandrum, Calicut and Thrissur — flexible plans for freelancers, startups and remote teams.',
        cta: 'Explore coworking spaces',
    },
    {
        title: 'Virtual Offices',
        href: '/virtual-office',
        image: '/images/virtual-office/banner-1.png',
        desc: 'A GST-ready business address, mail handling and meeting rooms on demand — build a credible presence in Kerala without renting a desk.',
        cta: 'Explore virtual offices',
    },
    {
        title: 'Private Offices',
        href: '/private-office',
        image: '/images/private-office/hero-1.png',
        desc: 'Lockable, fully-serviced cabins for teams that need quiet, secure space — move in ready and scale up seamlessly as you grow.',
        cta: 'Explore private offices',
    },
];

export default function ServiceSolutions() {
    return (
        <section className="w-full py-8 md:py-12">
            <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
                <h2 className="heading-section text-zinc-900">
                    Workspace solutions for every stage
                </h2>
                <p className="mt-3 leading-relaxed text-zinc-600">
                    From a single hot desk to a private team cabin or a registered business
                    address, find the right workspace in Kerala for how you work today.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                {services.map((service) => (
                    <Link
                        key={service.href}
                        href={service.href}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-colors hover:border-primary-200"
                    >
                        <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-100">
                            <Image
                                src={service.image}
                                alt={`${service.title} in Kerala`}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-6">
                            <h3 className="text-xl font-bold text-zinc-900 transition-colors group-hover:text-primary-700">
                                {service.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-zinc-600">{service.desc}</p>
                            <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-primary-700">
                                {service.cta}
                                <ArrowRight
                                    size={16}
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
