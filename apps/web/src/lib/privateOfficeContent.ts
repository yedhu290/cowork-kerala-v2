/**
 * Content for the Private Office landing page. Centralised so copy, pricing and
 * FAQs stay in one place. `icon` values map to lucide-react icon names in the
 * section components. Pricing is indicative ("from") — the real quote comes via
 * the enquiry form.
 */
import type { FaqItem } from './cityContent';

export const privateOfficeStats = [
    { value: '4+', label: 'Cities across Kerala' },
    { value: '2–50', label: 'Team sizes supported' },
    { value: '24/7', label: 'Secure access' },
    { value: 'Move-in', label: 'Ready furnished cabins' },
] as const;

export const privateOfficeFaqs: FaqItem[] = [
    {
        question: 'What is a private office?',
        answer: 'A private office is a lockable, fully furnished cabin or suite reserved exclusively for your team, inside a managed workspace. You get the privacy and branding of your own office with the amenities, flexibility and low overheads of a serviced space.',
    },
    {
        question: 'How much does a private office cost in Kerala?',
        answer: 'Private offices are priced per cabin, so the cost depends on team size, city and location. Small cabins for a few people start lower, while branded suites for larger teams cost more. Pricing is all-inclusive of rent, utilities and amenities — share your requirements for an exact quote.',
    },
    {
        question: 'How many people can a private office fit?',
        answer: 'We have options from small 1–4 person cabins to suites and dedicated floors for teams of 50+. If your headcount changes, you can add seats or move to a larger space.',
    },
    {
        question: 'Are private offices furnished?',
        answer: 'Yes. Cabins come move-in ready with desks, ergonomic chairs, storage, high-speed internet and power backup. You can add your own branding and adjust the layout.',
    },
    {
        question: 'Can I get a private office on a short-term or flexible basis?',
        answer: 'Yes — terms are far more flexible than a traditional commercial lease, with no long lock-ins or heavy deposits. Tell us your timeline and we’ll match you to a suitable plan.',
    },
    {
        question: 'Which cities do you offer private offices in?',
        answer: 'We offer private offices in Kochi, Trivandrum, Calicut and Thrissur, close to each city’s main business and IT hubs, with more locations added as we grow.',
    },
];
