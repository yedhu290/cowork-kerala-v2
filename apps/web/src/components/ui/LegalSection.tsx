import React from 'react';

/**
 * A titled section used by the legal pages (privacy policy, terms).
 * Keeps heading levels and prose styling consistent across them.
 */
export default function LegalSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 md:text-2xl">{title}</h2>
            <div className="flex flex-col gap-3 text-zinc-600 leading-relaxed">{children}</div>
        </section>
    );
}
