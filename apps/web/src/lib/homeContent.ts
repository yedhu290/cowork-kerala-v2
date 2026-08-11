/**
 * General homepage content — the FAQ shown on the landing page (with FAQPage
 * schema). Kept broad; service and city pages answer more specific questions.
 */
import type { FaqItem } from './cityContent';

export const homeFaqs: FaqItem[] = [
    {
        question: 'What is a coworking space?',
        answer: 'A coworking space is a shared, professionally managed workspace where freelancers, startups and remote teams rent a desk or private cabin. You get amenities like high-speed Wi-Fi, meeting rooms, power backup and reception without the cost or long lease of a traditional office.',
    },
    {
        question: 'Which cities in Kerala does CoWork Kerala cover?',
        answer: 'We list coworking spaces, virtual offices and private offices in Kochi, Trivandrum, Calicut and Thrissur, close to each city’s main business and IT hubs — with more locations added as we grow.',
    },
    {
        question: 'How much does a coworking space cost in Kerala?',
        answer: 'Pricing depends on the desk type and city. Hot desks are the most affordable, dedicated desks cost more, and private cabins are priced per team. Share your requirements and we’ll send current rates for spaces that fit.',
    },
    {
        question: 'Can I use a virtual office for GST registration?',
        answer: 'Yes. A virtual office can serve as your registered business address for GST and company registration when it comes with the rent agreement, NOC and address proof. Confirm your specific case with your CA before filing.',
    },
    {
        question: 'Do you offer day passes or short-term plans?',
        answer: 'Many spaces offer flexible hot-desk and day-pass options, so you can work from a professional space without a long-term commitment. Tell us your dates and we’ll suggest spaces with the right plan.',
    },
    {
        question: 'How do I book a workspace?',
        answer: 'Browse spaces by city or workspace type, compare pricing and amenities, then send an enquiry or request a quote. Our local team helps you shortlist and book the right space for your budget and team size.',
    },
];
