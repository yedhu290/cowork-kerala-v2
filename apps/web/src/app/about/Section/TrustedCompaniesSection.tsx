import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

const companies = [
    'LOGOIPSUM',
    'logoipsum',
    'logoipsum',
    'logoipsum',
    'logoipsum',
    'LOGOIPSUM',
    'ULTRA CLEAR',
    'IPSUM',
    'logoipsum',
    'LOGOIPSUM',
    'LOGO IPSUM',
    'ULTRA CLEAR',
];

const TrustedCompaniesSection = () => {
    return (
        <section className="w-full rounded-3xl bg-[#F3F1EB] py-16 px-6 md:px-12 text-center">
            <div className="flex flex-col items-center gap-4 mb-12">
                <span className="rounded-full bg-[#D4E7A6] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-900">
                    Companies
                </span>
                <h2 className="text-4xl font-semibold text-zinc-900 md:text-5xl">
                    Trusted by the leading companies{' '}
                </h2>
                <p className="max-w-2xl text-zinc-600 leading-relaxed">
                    We're proud to support a diverse range of businesses, from innovative startups
                    to established industry leaders. Discover how our flexible workspaces and
                    vibrant
                </p>
            </div>

            <div className="bg-white/50 rounded-3xl p-8 md:p-12 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-60 grayscale">
                    {/* Using text placeholders for logos as requested/planned */}
                    {companies.map((company, i) => (
                        <div
                            key={i}
                            className="text-xl font-bold text-zinc-800 uppercase tracking-widest"
                        >
                            {company}
                        </div>
                    ))}
                </div>
            </div>

            <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#1A2818] px-6 py-3 text-white transition-transform hover:scale-105"
            >
                <span>Contact us</span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1A2818]">
                    <Mail size={14} />
                </div>
            </Link>
        </section>
    );
};

export default TrustedCompaniesSection;
