/**
 * General (non-city) content for the Virtual Office landing page.
 *
 * City-specific copy lives in `cityContent.ts`; this module holds the shared
 * educational content and FAQs used on `/virtual-office` so the page has unique,
 * keyword-rich material distinct from the per-city pages.
 */
import type { FaqItem } from './cityContent';

/**
 * General virtual-office FAQs (with FAQPage schema on the page). Kept broad on
 * purpose — the per-city pages answer location-specific questions separately.
 */
export const virtualOfficeFaqs: FaqItem[] = [
    {
        question: 'What is a virtual office?',
        answer: 'A virtual office gives your business a professional commercial address and mail handling without renting physical desk space. You can use it for GST and company registration, put it on your website and invoices, and add meeting-room access whenever you need it.',
    },
    {
        question: 'Can I use a virtual office for GST registration in Kerala?',
        answer: 'Yes. A virtual office can serve as your principal place of business for GST when you don’t have your own premises, provided it comes with the rent agreement, NOC and address proof. Confirm your specific case with your CA before filing.',
    },
    {
        question: 'Which documents do I get with a virtual office?',
        answer: 'Typically a commercial address you can use on registrations and invoices, a rent or service agreement, a No Objection Certificate (NOC), address proof, and mail handling. Meeting-room access is usually available as an add-on.',
    },
    {
        question: 'How much does a virtual office cost?',
        answer: 'Pricing is usually annual and depends on whether registration documents and mail handling are included. Address-only plans cost less but may not be usable for GST. Share your requirements and we’ll send current rates.',
    },
    {
        question: 'Which cities in Kerala do you cover?',
        answer: 'We offer virtual offices in Kochi, Trivandrum, Calicut and Thrissur, close to each city’s main business and IT hubs.',
    },
    {
        question: 'Can I upgrade to a physical office later?',
        answer: 'Yes. Many businesses start with a virtual office and move into a coworking desk or a private office as their team grows, keeping the same trusted address.',
    },
];
