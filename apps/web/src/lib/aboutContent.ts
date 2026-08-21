/**
 * Content for the About page. Centralised so copy, values, stats and FAQs live
 * in one place. `icon` values map to lucide-react icon names in the sections.
 */
import type { FaqItem } from './cityContent';

export const aboutStats = [
    { value: '4+', label: 'Cities across Kerala' },
    { value: '3', label: 'Workspace types' },
    { value: '100s', label: 'Seats & cabins' },
    { value: '24/7', label: 'Access & support' },
] as const;

export const aboutFaqs: FaqItem[] = [
    {
        question: 'What is CoWork Kerala?',
        answer: 'CoWork Kerala is a platform that helps freelancers, startups and teams find and book the right workspace across Kerala — coworking desks, virtual offices and private offices — in one place, with transparent pricing.',
    },
    {
        question: 'What types of workspaces do you offer?',
        answer: 'Three main types: coworking spaces (hot desks and dedicated desks), virtual offices (a GST-ready business address with mail handling) and private offices (lockable, furnished cabins for teams).',
    },
    {
        question: 'Which cities in Kerala do you cover?',
        answer: 'We currently cover Kochi, Trivandrum, Calicut and Thrissur, close to each city’s main business and IT hubs, with more locations added as we grow.',
    },
    {
        question: 'How do I book a workspace?',
        answer: 'Browse spaces by city or type, compare pricing and amenities, then send an enquiry or request a quote. Our local team helps you shortlist and book the right space.',
    },
    {
        question: 'Can a virtual office be used for GST registration?',
        answer: 'Yes — a virtual office can serve as your registered business address for GST and company registration when it includes the rent agreement, NOC and address proof. Confirm your specific case with your CA before filing.',
    },
];
