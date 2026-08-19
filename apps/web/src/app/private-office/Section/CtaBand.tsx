import Link from 'next/link';
import { ArrowUpRight, Phone } from 'lucide-react';

/** Strong closing call-to-action before the footer. */
export default function CtaBand() {
    return (
        <section className="w-full px-4 md:px-8">
            <div className="container mx-auto">
                <div className="relative overflow-hidden rounded-[2rem] bg-zinc-900 px-6 py-14 text-center md:px-12 md:py-20">
                    {/* Accent glows */}
                    <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-primary-500/25 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -left-12 size-72 rounded-full bg-primary-600/20 blur-3xl" />

                    <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-primary-400" />
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-300">
                                Get started
                            </span>
                            <span className="h-px w-10 bg-primary-400" />
                        </div>
                        <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
                            Ready for an office that’s all yours?
                        </h2>
                        <p className="text-zinc-300 md:text-lg">
                            Tell us your team size and city, and we’ll shortlist private offices that
                            fit your budget — with a clear, all-inclusive quote.
                        </p>
                        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-zinc-900 transition-transform hover:scale-105"
                            >
                                Get a quote
                                <ArrowUpRight size={18} />
                            </Link>
                            <a
                                href="tel:+917356735091"
                                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                            >
                                <Phone size={16} />
                                +91 7356735091
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
