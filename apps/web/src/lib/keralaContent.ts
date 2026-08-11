/**
 * Kerala-wide SEO content for the /coworking-space hub page.
 *
 * The hub page ranks for state-level intent ("coworking space in Kerala") and
 * acts as the parent for the per-city pages. This copy is unique to the hub —
 * it frames the state as a whole and routes visitors to the right city — so it
 * doesn't duplicate the city pages' content.
 */

import type { ContentSection, FaqItem } from '@/lib/cityContent';

export type KeralaContent = {
    heading: string;
    intro: string[];
    sections: ContentSection[];
    faqs: FaqItem[];
};

export const KERALA_COWORKING: KeralaContent = {
    heading: 'Coworking spaces across Kerala',
    intro: [
        'Kerala’s coworking market has grown well beyond a single city. From the Infopark corridor in Kochi to Technopark in Trivandrum and Cyberpark in Kozhikode, flexible workspaces now serve founders, freelancers, remote employees and growing teams right across the state. Whichever city you’re based in, there’s a professional alternative to working from home or signing a long office lease.',
        'CoWork Kerala brings these options together in one place. Compare hot desks, dedicated desks and private cabins across Kochi, Trivandrum, Calicut and Thrissur, filter by city, and enquire in a few clicks. Every listed space offers the essentials remote work depends on — high-speed internet with power backup, meeting rooms and a distraction-free, professional setting.',
    ],
    sections: [
        {
            heading: 'Hot desks, dedicated desks and private cabins',
            body: [
                'Most coworking spaces in Kerala offer three plan types. Hot desks give you a flexible, unassigned seat for part-time or single-day use and are the most affordable. Dedicated desks reserve a fixed spot for daily solo work. Private cabins give teams a lockable, quiet space of their own — priced per team rather than per seat — so you only pay for what you actually need.',
            ],
        },
        {
            heading: 'Coworking near Kerala’s IT hubs',
            body: [
                'Demand clusters around the state’s technology parks. Kochi’s Infopark and SmartCity in Kakkanad form the largest hub, Trivandrum’s Technopark at Kazhakkoottam anchors the capital, and Kozhikode’s Cyberpark leads in the north. Thrissur, the state’s banking and cultural centre, adds a steady base of professional demand around Swaraj Round. Each city page below lists the spaces closest to these hubs.',
            ],
        },
        {
            heading: 'What to expect from a Kerala coworking space',
            body: [
                'Beyond a desk, look for reliable high-speed internet with power backup, bookable meeting rooms, printing, tea and coffee, and secure access. Many spaces also run community events — a practical way to build a local network. Pricing varies by city and desk type, so compare a few options and tell us your requirements for current rates.',
            ],
        },
    ],
    faqs: [
        {
            question: 'Which cities in Kerala have coworking spaces?',
            answer: 'We list coworking spaces in Kochi, Trivandrum, Calicut (Kozhikode) and Thrissur, covering the state’s main business and IT hubs. Pick your city below to see the spaces available there, along with local pricing and enquiry options.',
        },
        {
            question: 'How much does a coworking space cost in Kerala?',
            answer: 'Cost depends on the city and desk type. Hot desks are the most affordable and suit part-time use, dedicated desks cost more for a fixed spot, and private cabins are priced per team. Larger cities like Kochi can differ from Calicut or Thrissur. Share your requirements and we’ll send current rates.',
        },
        {
            question: 'Can I book a coworking desk for a single day in Kerala?',
            answer: 'Yes. Hot-desk plans are designed for flexible, short-term use, including single days, so you can work from a professional space without a long-term commitment. Tell us your city and dates and we’ll point you to spaces that offer day passes.',
        },
        {
            question: 'Do CoWork Kerala spaces include internet and meeting rooms?',
            answer: 'Yes — the spaces we list include high-speed internet with power backup and access to bookable meeting rooms, along with essentials like printing and refreshments. Exact inclusions vary by space, so confirm meeting-room hours and any add-ons before you book.',
        },
    ],
};

/** A city card on the hub — links to its /coworking-space/[city] page. */
export type CityCard = {
    slug: string;
    name: string;
    blurb: string;
    /** Optional card photo (from a dashboard-managed Location); falls back to the curated city photo. */
    image?: string;
};

/** City cards for the hub — each links to its /coworking-space/[city] page. */
export const COWORKING_CITY_CARDS: CityCard[] = [
    {
        slug: 'kochi',
        name: 'Kochi',
        blurb: 'Kerala’s largest workspace market — from the Infopark IT corridor to MG Road and Marine Drive.',
    },
    {
        slug: 'trivandrum',
        name: 'Trivandrum',
        blurb: 'IT and product teams around Technopark, plus central options in Vazhuthacaud and Pattom.',
    },
    {
        slug: 'calicut',
        name: 'Calicut',
        blurb: 'Cost-effective coworking near Cyberpark and the city centre in North Kerala.',
    },
    {
        slug: 'thrissur',
        name: 'Thrissur',
        blurb: 'Professional workspace around Swaraj Round in the state’s cultural and banking capital.',
    },
];
