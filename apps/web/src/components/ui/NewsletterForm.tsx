'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { CONTACT_EMAIL } from '@/lib/seo';

/**
 * Footer newsletter sign-up. There is no newsletter backend yet, so a valid
 * submission opens a pre-filled email to the CoWork Kerala inbox — a real,
 * working action rather than a button that does nothing.
 */
export default function NewsletterForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const value = email.trim();
        if (!/^\S+@\S+\.\S+$/.test(value)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        const subject = encodeURIComponent('Newsletter subscription');
        const body = encodeURIComponent(
            `Please subscribe this address to the CoWork Kerala newsletter: ${value}`
        );
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        toast.success('Opening your email app to confirm your subscription…');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-3">
            <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                aria-label="Email address for newsletter"
                className="h-11 w-full rounded-md border border-white/30 bg-white/90 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none"
            />
            <button
                type="submit"
                className="shrink-0 rounded-md bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
            >
                Connect
            </button>
        </form>
    );
}
