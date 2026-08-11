/**
 * City × service SEO content for the /{service}/[city] landing pages.
 *
 * These pages target long-tail, location-specific intent ("coworking space in
 * Kochi", "virtual office for GST registration in Calicut"). Each city/service
 * pair gets a unique intro and FAQ set so the pages are substantial and
 * distinct rather than thin, templated duplicates.
 *
 * Cities not listed here (e.g. a new location added later in the admin) fall
 * back to generic-but-valid content built from the display name, so the pages
 * still work and can be enriched later.
 */

export type ServiceSlug = 'coworking-space' | 'virtual-office' | 'private-office';

export type FaqItem = { question: string; answer: string };

export type ContentSection = { heading: string; body: string[] };

export type CityServiceContent = {
    metaTitle: string;
    metaDescription: string;
    heading: string;
    intro: string[];
    /**
     * Optional extra H2 sections rendered between the intro and the FAQ. Lets a
     * city/service page carry richer, well-structured content with keyword-rich
     * subheadings. Pages without sections just render intro + FAQ as before.
     */
    sections?: ContentSection[];
    faqs: FaqItem[];
};

type CityEntry = Partial<Record<ServiceSlug, CityServiceContent>>;

const CITY_CONTENT: Record<string, CityEntry> = {
    kochi: {
        'coworking-space': {
            metaTitle:
                'Coworking Space in Kochi | Book Hot Desks & Cabins',
            metaDescription:
                'Find coworking spaces in Kochi — hot desks near Infopark and Kakkanad, dedicated desks and cabins on MG Road and Marine Drive. Compare and book today.',
            heading: 'Coworking spaces in Kochi',
            intro: [
                'Kochi is Kerala’s busiest hub for flexible workspace. Most coworking demand clusters around the IT corridor at Infopark and SmartCity in Kakkanad, while MG Road, Kaloor and Marine Drive remain popular with agencies, consultancies and client-facing teams. Whether you’re a solo founder or a growing team, there are options to match both your budget and your commute.',
                'Coworking spaces in Kochi typically offer hot desks for flexible, part-time use, dedicated desks for daily solo work, and private cabins for teams that need quiet and confidentiality. Most also include meeting rooms, high-speed internet with power backup, and community events — useful when you’re building a network in the city.',
            ],
            faqs: [
                {
                    question: 'How much does a coworking space cost in Kochi?',
                    answer: 'It depends on the desk type. Hot desks are the most affordable and suit part-time use, dedicated desks cost more for a fixed spot, and private cabins are priced per team. Rates also vary by area — spaces near Infopark can differ from those in the city centre. Tell us your requirements and we’ll share current pricing.',
                },
                {
                    question: 'Where are the main coworking areas in Kochi?',
                    answer: 'The IT corridor around Infopark and SmartCity in Kakkanad has the highest concentration, which is convenient if you work with tech clients. MG Road, Kaloor and Marine Drive are central options that are better connected for meetings and city access.',
                },
                {
                    question: 'Can I book a coworking desk for a single day in Kochi?',
                    answer: 'Yes. Hot-desk plans are designed for flexible, short-term use, including single days, so you can work from a professional space without a long commitment. Share your dates and we’ll point you to spaces that offer day passes.',
                },
            ],
        },
        'virtual-office': {
            metaTitle:
                'Virtual Office in Kochi | GST Registration Address',
            metaDescription:
                'Get a GST-compliant virtual office address in Kochi with mail handling and registration documents. Ideal for startups and remote teams. Enquire today.',
            heading: 'Virtual office in Kochi',
            intro: [
                'A virtual office gives your business a credible Kochi address without renting a full-time desk. In a port city thick with e-commerce sellers, exporters and Infopark-linked firms, a registered commercial address in Kochi carries real weight — which is why consultants, online sellers and remote-first teams use one for GST or company registration, invoices and correspondence while keeping overheads low.',
                'A proper Kochi virtual office comes with everything you need to register the address — a rent or service agreement, a No Objection Certificate and address proof — plus mail handling and, in many cases, meeting-room access at the provider’s Kakkanad or MG Road premises for when you need to meet clients in person.',
            ],
            faqs: [
                {
                    question: 'Can I use a virtual office for GST registration in Kochi?',
                    answer: 'Yes — for a Kochi-based business a virtual office is a recognised way to establish a principal place of business for GST when you don’t hold your own premises. Your provider should issue the rent agreement, NOC and address proof the application asks for. The Ernakulam GST office scrutinises address documents closely, so confirm the paperwork with your CA before filing.',
                },
                {
                    question: 'What documents do I get with a Kochi virtual office?',
                    answer: 'A rent or service agreement in your company’s name, a No Objection Certificate from the Kochi property owner, and address proof such as a utility bill for the premises. If you’re an online seller registering on marketplaces, ask that the set also satisfies each platform’s address-verification checks, not just GST.',
                },
                {
                    question: 'How much does a virtual office in Kochi cost?',
                    answer: 'Kochi plans are usually billed annually, and the price turns on whether registration documentation and mail handling are bundled in. A bare address near the city centre costs less than a document-backed plan in the Kakkanad belt, but only the latter reliably supports GST. Tell us your use case and we’ll share current rates.',
                },
            ],
        },
        'private-office': {
            metaTitle:
                'Private Office in Kochi | Furnished Cabins for Teams',
            metaDescription:
                'Rent a private office in Kochi — furnished, secure cabins for teams near Infopark, Kakkanad and the city centre. Start small and scale up. Enquire today.',
            heading: 'Private office space in Kochi',
            intro: [
                'A private office gives your team a lockable, furnished space of its own — the right fit once you’re on calls all day, handling confidential work, or simply large enough that a shared floor no longer works. In Kochi the choice usually comes down to the Kakkanad IT corridor, close to Infopark clients, or a more central address around MG Road and Kaloor for agencies and consultancies.',
                'Most Kochi private offices are fully serviced: furniture, high-speed internet with power backup, meeting-room access, reception and housekeeping are handled for you, so your team can move in and start working. You can usually begin with a small cabin near Infopark and shift to a larger one as you grow.',
            ],
            faqs: [
                {
                    question: 'How much does a private office in Kochi cost?',
                    answer: 'Private offices in Kochi are priced per cabin rather than per seat, so cost tracks team size and area — a cabin in the Kakkanad IT belt typically differs from one near the city centre. For small teams the per-person figure often lands close to dedicated desks once you compare. Share your headcount for a quote.',
                },
                {
                    question: 'Can I get a private office for a small team in Kochi?',
                    answer: 'Yes. Cabins in Kochi start small — enough for two or three people — and scale up as you hire, which suits founders who need privacy for calls or client data but don’t want an Infopark-scale lease.',
                },
                {
                    question: 'What’s included in a private office in Kochi?',
                    answer: 'A furnished, lockable cabin with high-speed internet, power backup, meeting-room access, reception and housekeeping. In the Kakkanad corridor many buildings also offer covered parking and 24/7 access for late shifts — worth confirming, along with meeting-room hours, before you commit.',
                },
            ],
        },
    },

    trivandrum: {
        'coworking-space': {
            metaTitle:
                'Coworking Space in Trivandrum | Hot Desks Near Technopark',
            metaDescription:
                'Find coworking spaces in Trivandrum near Technopark — hot desks, dedicated desks and private cabins. Compare prices and book online today with CoWork Kerala.',
            heading: 'Finding the right coworking space in Trivandrum',
            intro: [
                'Trivandrum, Kerala’s capital, is a growing base for product startups and remote teams, anchored by Technopark, one of India’s largest IT parks, around Kazhakkoottam. Coworking is popular both near the IT park and in central areas like Vazhuthacaud and Pattom that are convenient for the city’s institutions and agencies.',
                'Spaces here range from hot desks for freelancers and part-time use to dedicated desks and private cabins for teams. High-speed internet with power backup, meeting rooms and a professional setting make them a practical alternative to working from home.',
            ],
            sections: [
                {
                    heading: 'Coworking spaces near Technopark, Trivandrum',
                    body: [
                        'The Kazhakkoottam belt around Technopark is Trivandrum’s main coworking cluster and the natural choice for IT, product and startup teams working close to the park. Options here run from hot desks for individuals to private cabins for full teams, with the fast internet and reliable power backup that development work depends on.',
                    ],
                },
                {
                    heading: 'Coworking in central Trivandrum',
                    body: [
                        'If your work ties into the city’s institutions, agencies or government offices, central neighbourhoods like Vazhuthacaud and Pattom are better connected and easier for client visits. These areas suit consultants, freelancers and small teams who value a central address over proximity to the IT park.',
                    ],
                },
                {
                    heading: 'Hot desks, dedicated desks and private cabins',
                    body: [
                        'Most Trivandrum coworking spaces offer three plan types: hot desks for flexible, part-time use, dedicated desks for a fixed daily spot, and private cabins for teams that need quiet and confidentiality. Hot desks are the most affordable, while cabins are priced per team — so you only pay for the space you actually need.',
                    ],
                },
                {
                    heading: 'Amenities to expect from a Trivandrum coworking space',
                    body: [
                        'Beyond a desk, look for high-speed internet with power backup, bookable meeting rooms, printing, tea and coffee, and a professional, distraction-free setting. Many spaces also run community events — a practical way to build a local network as you grow in the city.',
                    ],
                },
            ],
            faqs: [
                {
                    question: 'How much does a coworking space cost in Trivandrum?',
                    answer: 'Pricing depends on the desk type — hot desks are cheapest, dedicated desks cost more, and private cabins are priced per team. Spaces near Technopark can differ from central ones. Share your needs and we’ll send current rates.',
                },
                {
                    question: 'Are there coworking spaces near Technopark, Trivandrum?',
                    answer: 'Yes — the Kazhakkoottam area around Technopark is the main cluster and suits IT and product teams working near the park. Central neighbourhoods like Vazhuthacaud and Pattom are alternatives with easier city access.',
                },
                {
                    question: 'Can I rent a coworking desk short-term in Trivandrum?',
                    answer: 'Yes. Hot-desk plans support flexible and single-day use, so you can work from a professional space without a long-term commitment. Tell us your dates and we’ll suggest spaces with day passes.',
                },
            ],
        },
        'virtual-office': {
            metaTitle:
                'Virtual Office in Trivandrum | GST Address',
            metaDescription:
                'Get a GST-compliant virtual office in Trivandrum with documents and mail handling. Great for startups and remote teams. Enquire with CoWork Kerala.',
            heading: 'Virtual office in Trivandrum',
            intro: [
                'A virtual office gives you a professional Trivandrum address without leasing desk space — a practical fit in the state capital, where founders often want a registered presence near the seat of government and the Technopark ecosystem while their team works remotely. It’s widely used for GST, company registration and official correspondence.',
                'Look for a Trivandrum plan that bundles the paperwork to register the address — a rent or service agreement, a No Objection Certificate and address proof — with mail handling and optional meeting-room access in Kazhakkoottam or central areas like Vazhuthacaud for the occasional client or investor meeting.',
            ],
            faqs: [
                {
                    question: 'Can I register for GST with a virtual office in Trivandrum?',
                    answer: 'Yes — a virtual office can serve as your principal place of business for GST in Thiruvananthapuram when you don’t have your own premises, provided it comes with the rent agreement, NOC and address proof. If you’re a Technopark-linked or first-time product company, walk the documents through your CA before filing.',
                },
                {
                    question: 'What’s included in a Trivandrum virtual office?',
                    answer: 'A commercial Trivandrum address for your registrations and invoices, day-to-day mail handling, and the full document set needed to register that address. Many capital-city plans add meeting-room hours you can draw on for investor or government meetings — confirm how many are included.',
                },
                {
                    question: 'How much does a virtual office in Trivandrum cost?',
                    answer: 'Trivandrum virtual offices are generally priced annually, with the rate depending on whether registration documents and mail handling are part of the plan. Address-only options are cheaper but usually can’t back a GST application. Share what you need and we’ll quote current rates.',
                },
            ],
        },
        'private-office': {
            metaTitle:
                'Private Office in Trivandrum | Team Cabins',
            metaDescription:
                'Rent a private office in Trivandrum — furnished cabins for teams near Technopark and the city. Scale as you grow. Enquire with CoWork Kerala.',
            heading: 'Private office space in Trivandrum',
            intro: [
                'A private office suits Trivandrum teams that need their own quiet, secure space — for calls, confidential product work, or simply because they’ve outgrown a shared floor. In the capital the split is usually between the Kazhakkoottam / Technopark belt for IT and product teams and central areas like Vazhuthacaud for teams that deal with the city’s institutions.',
                'These are generally fully serviced cabins: furniture, fast internet with power backup, meeting rooms, reception and housekeeping are taken care of, so your team can focus on the work. Many Technopark-area spaces let you start with one cabin and add more as you hire.',
            ],
            faqs: [
                {
                    question: 'How much does a private office in Trivandrum cost?',
                    answer: 'Private offices in Trivandrum are priced per cabin, so the cost depends on team size and location — a cabin inside or near Technopark can differ from a central one in Vazhuthacaud. For small teams the per-person cost often sits close to dedicated desks. Share your team size for a quote.',
                },
                {
                    question: 'Is there private office space near Technopark?',
                    answer: 'Yes — private cabins are available in and around the Kazhakkoottam / Technopark area, convenient for teams working close to the park and its clients, as well as in more central parts of the capital. Tell us which side of the city suits your commute and we’ll shortlist options.',
                },
                {
                    question: 'What’s included in a private office in Trivandrum?',
                    answer: 'A furnished, lockable cabin with high-speed internet, power backup, meeting-room access, reception and housekeeping. Technopark-campus buildings often add perks like cafeteria access and secure after-hours entry — confirm those, plus meeting-room hours and parking, before committing.',
                },
            ],
        },
    },

    calicut: {
        'coworking-space': {
            metaTitle:
                'Coworking Space in Calicut | Book Hot Desks & Cabins',
            metaDescription:
                'Find coworking spaces in Calicut (Kozhikode) near Cyberpark — affordable hot desks, dedicated desks and private cabins. Compare prices and book today.',
            heading: 'Coworking spaces in Calicut',
            intro: [
                'Kozhikode — Calicut — pairs a long trading heritage with a growing technology scene centred on Cyberpark. It’s a practical, lower-overhead base for SMEs, freelancers and satellite teams in northern Kerala, with coworking options near the IT park and around the city centre.',
                'You’ll find hot desks for flexible use, dedicated desks for daily work, and private cabins for teams, usually with high-speed internet, power backup and meeting rooms. For many Calicut businesses, coworking is a cost-effective step up from working at home.',
            ],
            faqs: [
                {
                    question: 'How much does a coworking space cost in Calicut?',
                    answer: 'Calicut tends to be more affordable than the larger Kerala cities. Cost still depends on desk type — hot desks are cheapest, dedicated desks and private cabins cost more. Tell us your requirements and we’ll share current pricing.',
                },
                {
                    question: 'Is there coworking space near Cyberpark, Kozhikode?',
                    answer: 'Yes — the area around Cyberpark is the main technology cluster in the city and a convenient base for IT and startup teams. The city centre around Mavoor Road and Nadakkavu offers alternatives with good connectivity.',
                },
                {
                    question: 'Can I book a coworking desk for a day in Kozhikode?',
                    answer: 'Yes. Hot-desk plans allow flexible, short-term and single-day use, so you can work from a professional setting without a long commitment. Share your dates and we’ll suggest spaces with day passes.',
                },
            ],
        },
        'virtual-office': {
            metaTitle:
                'Virtual Office in Calicut | GST Registration Address',
            metaDescription:
                'Get a GST-compliant virtual office in Calicut (Kozhikode) with documentation and mail handling. Ideal for startups and remote teams. Enquire with CoWork Kerala.',
            heading: 'Virtual office in Calicut',
            intro: [
                'A virtual office gives your business a professional Calicut address without renting premises — a sensible option in a city with a deep trading heritage in timber, spices and textiles, where many SMEs and online sellers want a registered Kozhikode presence for GST or company registration without carrying office overheads.',
                'Choose a Calicut plan that includes the documents needed to register the address — a rent or service agreement, a No Objection Certificate and address proof — along with mail handling and, when you need it, meeting-room access near Cyberpark or the Mavoor Road business district.',
            ],
            faqs: [
                {
                    question: 'Can I use a virtual office for GST registration in Calicut?',
                    answer: 'Yes — a virtual office can establish a principal place of business for GST in Kozhikode when you don’t have your own premises, as long as it comes with the rent agreement, NOC and address proof. For trading businesses handling interstate supply, confirm the address details with your CA before filing.',
                },
                {
                    question: 'What documents come with a Kozhikode virtual office?',
                    answer: 'A rent or service agreement in your business name, a No Objection Certificate from the Kozhikode property owner, and address proof such as a utility bill. Traders registering multiple GSTINs or an import-export code should check the same address pack works across all of them.',
                },
                {
                    question: 'How much does a virtual office in Calicut cost?',
                    answer: 'Calicut is often more economical than Kochi or Trivandrum, and plans are usually billed annually. What you pay depends on whether registration documentation and mail handling are included — an address-only plan is cheapest but rarely GST-ready. Tell us your requirements for current rates.',
                },
            ],
        },
        'private-office': {
            metaTitle: 'Private Office in Calicut | Cabins for Small Teams',
            metaDescription:
                'Rent a private office in Calicut (Kozhikode) — furnished, serviced cabins for teams near Cyberpark. Cost-effective and scalable. Enquire with CoWork Kerala.',
            heading: 'Private office space in Calicut',
            intro: [
                'A private office gives your Calicut team a secure, furnished space of its own — useful for confidential work, teams on calls throughout the day, or businesses that have outgrown a shared floor. Options cluster around Cyberpark for IT teams and the Mavoor Road / Nadakkavu stretch for the city’s traders and SMEs.',
                'These are typically serviced cabins with furniture, fast internet, power backup, meeting rooms, reception and housekeeping included. Kozhikode’s lower overheads make a private cabin here noticeably more economical than in Kochi or Trivandrum, and you can scale from a small room as you grow.',
            ],
            faqs: [
                {
                    question: 'How much does a private office in Kozhikode cost?',
                    answer: 'Private offices in Kozhikode are priced per cabin, so cost depends on team size and location — but the city’s lower rents generally make it better value than the larger Kerala metros. A Cyberpark-area cabin may differ from one in the city centre. Share your team size and we’ll send a quote.',
                },
                {
                    question: 'Can I get a private office for a small team in Calicut?',
                    answer: 'Yes. Cabins in Calicut start small enough for two or three people and scale up as you hire, so an early-stage SME or satellite team can get privacy near Cyberpark or the city centre without a full office lease.',
                },
                {
                    question: 'What’s included in a private office in Calicut?',
                    answer: 'A furnished, lockable cabin with high-speed internet, power backup, meeting-room access, reception and housekeeping — typically at a lower monthly figure than comparable space in Kochi. Confirm meeting-room hours, parking and after-hours access before you commit.',
                },
            ],
        },
    },

    thrissur: {
        'coworking-space': {
            metaTitle:
                'Coworking Space in Thrissur | Book Hot Desks & Cabins',
            metaDescription:
                'Find coworking spaces in Thrissur near Swaraj Round — flexible hot desks, dedicated desks and private cabins. Compare prices and enquire online today.',
            heading: 'Coworking spaces in Thrissur',
            intro: [
                'Thrissur, the cultural capital of Kerala, is also one of the state’s most active business and banking centres — several banks and large gold and textile trades are based here. That steady commercial base supports a growing market for professional workspace, much of it around Swaraj Round and the surrounding city.',
                'Coworking spaces in Thrissur offer hot desks for flexible use, dedicated desks for daily work, and private cabins for teams, typically with high-speed internet, power backup and meeting rooms. They’re a practical option for freelancers, small businesses and remote employees in the district.',
            ],
            faqs: [
                {
                    question: 'How much does a coworking space cost in Thrissur?',
                    answer: 'Cost depends on the desk type — hot desks are the most affordable, dedicated desks and private cabins cost more. Thrissur is generally well-priced compared with the larger cities. Tell us what you need for current rates.',
                },
                {
                    question: 'Where can I find coworking spaces in Thrissur?',
                    answer: 'Most options are in and around the city centre near Swaraj Round, with others in areas like Ollur and Punkunnam. These are well connected for the district’s businesses and professionals.',
                },
                {
                    question: 'Can I use a coworking space part-time in Thrissur?',
                    answer: 'Yes. Hot-desk plans are built for flexible, part-time and single-day use, so you only pay for the time you need. Share your schedule and we’ll suggest suitable spaces.',
                },
            ],
        },
        'virtual-office': {
            metaTitle:
                'Virtual Office in Thrissur | GST & Company Address',
            metaDescription:
                'Get a GST-compliant virtual office address in Thrissur with documentation and mail handling. Ideal for startups and traders. Enquire with CoWork Kerala.',
            heading: 'Virtual office in Thrissur',
            intro: [
                'A virtual office gives your business a credible Thrissur address without renting premises. In a city known as Kerala’s banking capital — home to major bank head offices and a large gold and textile trade — a registered local address helps consultants, jewellers, online sellers and remote teams hold a professional presence for GST or company registration while keeping overheads low.',
                'A complete Thrissur virtual office includes the paperwork to register the address — a rent or service agreement, a No Objection Certificate and address proof — plus mail handling and, often, meeting-room access around Swaraj Round for client meetings.',
            ],
            faqs: [
                {
                    question: 'Can I use a virtual office for GST registration in Thrissur?',
                    answer: 'Yes — a virtual office can serve as your principal place of business for GST in Thrissur when you don’t have your own premises, provided it includes the rent agreement, NOC and address proof. Given the district’s strong trading base, many businesses register here specifically for a Thrissur GSTIN — confirm the specifics with your CA before filing.',
                },
                {
                    question: 'What documents do I get with a Thrissur virtual office?',
                    answer: 'A rent or service agreement in your business name, a No Objection Certificate from the property owner, and address proof such as a utility bill. If you run a jewellery or textile business registering under more than one head, check that a single address pack covers each registration.',
                },
                {
                    question: 'How much does a virtual office in Thrissur cost?',
                    answer: 'Thrissur plans are usually annual, and the price depends on whether registration documentation and mail handling are bundled in. Address-only plans are cheaper but often can’t be used for GST. Share your needs and we’ll send current rates.',
                },
            ],
        },
        'private-office': {
            metaTitle: 'Private Office in Thrissur | Furnished Team Cabins',
            metaDescription:
                'Rent a private office in Thrissur — furnished, serviced cabins for teams near Swaraj Round. Start small and scale up. Enquire with CoWork Kerala today.',
            heading: 'Private office space in Thrissur',
            intro: [
                'A private office gives your Thrissur team a secure, furnished space of its own — well suited to confidential work, teams that spend the day on calls, or businesses that have outgrown a shared floor. In a city built on banking, gold and textiles, most options sit around Swaraj Round and the central belt, close to the trades that drive local demand.',
                'These are generally fully serviced cabins with furniture, fast internet, power backup, meeting rooms, reception and housekeeping included. You can start with a small cabin near Swaraj Round and move to a larger one as your team grows.',
            ],
            faqs: [
                {
                    question: 'How much does a private office in Thrissur cost?',
                    answer: 'Private offices in Thrissur are priced per cabin, so the cost depends on team size and location, and the district generally offers good value against the larger cities. A central Swaraj Round cabin may differ from one in Ollur or Punkunnam. Share your team size and we’ll send a quote.',
                },
                {
                    question: 'Can I get a private office for a small team in Thrissur?',
                    answer: 'Yes. Cabins in Thrissur start small enough for two or three people and scale up as you hire — a good fit for the district’s family-run trades and early-stage teams that need privacy without a conventional lease.',
                },
                {
                    question: 'What’s included in a private office in Thrissur?',
                    answer: 'A furnished, lockable cabin with high-speed internet, power backup, meeting-room access, reception and housekeeping. For businesses handling cash or valuables, it’s worth confirming building security and after-hours access alongside meeting-room hours and parking before you commit.',
                },
            ],
        },
    },
};

export const SERVICE_LABEL: Record<ServiceSlug, string> = {
    'coworking-space': 'Coworking Spaces',
    'virtual-office': 'Virtual Office',
    'private-office': 'Private Office',
};

/** Singular service label for inline links ("Private office in Kochi"). */
export const SERVICE_LABEL_SINGULAR: Record<ServiceSlug, string> = {
    'coworking-space': 'Coworking space',
    'virtual-office': 'Virtual office',
    'private-office': 'Private office',
};

export const ALL_SERVICES: ServiceSlug[] = [
    'coworking-space',
    'private-office',
    'virtual-office',
];

type FallbackBody = Omit<CityServiceContent, 'metaTitle' | 'metaDescription'>;

/**
 * Deterministically pick one phrasing variant from a city slug. The same city
 * always resolves to the same variant (stable for caching and SEO), while
 * different cities spread across the set — so two fallback cities don't render
 * word-for-word identical copy, and none of them mirror the bespoke entries
 * above. It's a stopgap until a city gets hand-written copy, not a substitute
 * for it.
 */
function pickVariant<T>(slug: string, variants: T[]): T {
    let sum = 0;
    for (let i = 0; i < slug.length; i++) sum += slug.charCodeAt(i);
    return variants[sum % variants.length];
}

/**
 * Phrasing variants for cities without bespoke copy. Each service carries a few
 * distinct intros + FAQ sets so fallback pages stay unique from one another and
 * from the hand-written city entries. `${displayName}` is woven in per city.
 */
function fallbackVariants(displayName: string): Record<ServiceSlug, FallbackBody[]> {
    const d = displayName;
    return {
        'coworking-space': [
            {
                heading: `Coworking spaces in ${d}`,
                intro: [
                    `Looking for a coworking space in ${d}? Flexible workspaces here give freelancers, startups and remote teams a professional base without the cost or lock-in of a conventional office.`,
                    `Expect a mix of hot desks for part-time use, dedicated desks for daily work and private cabins for teams, backed by high-speed internet, power backup and meeting rooms. Compare the options and pick what fits your budget and schedule.`,
                ],
                faqs: [
                    {
                        question: `How much does a coworking space cost in ${d}?`,
                        answer: `It comes down to the desk type — hot desks are the cheapest, dedicated desks sit in the middle, and private cabins are priced per team. Tell us your requirements and we’ll share current ${d} rates.`,
                    },
                    {
                        question: `Can I book a coworking desk short-term in ${d}?`,
                        answer: `Yes — hot-desk plans cover flexible, part-time and single-day use, so you only pay for the days you need. Send us your dates and we’ll suggest spaces with day passes.`,
                    },
                ],
            },
            {
                heading: `Coworking spaces in ${d}`,
                intro: [
                    `Coworking spaces in ${d} suit anyone who wants to get out of the house without signing a long lease — solo founders, remote employees and small teams alike. You get a quiet, professional setting and the infrastructure to match.`,
                    `Most spaces offer three tiers: a hot desk you can grab as needed, a dedicated desk that’s always yours, and a lockable cabin for a whole team. Reliable internet, backup power and bookable meeting rooms come as standard.`,
                ],
                faqs: [
                    {
                        question: `What does a coworking desk in ${d} include?`,
                        answer: `Typically fast internet with power backup, a bookable meeting room, printing and refreshments, plus secure access. Exact inclusions vary by space in ${d}, so it’s worth confirming the essentials before you commit.`,
                    },
                    {
                        question: `Do ${d} coworking spaces offer day passes?`,
                        answer: `Many do. Hot-desk plans are built for flexible, single-day use, which is the easiest way to try a space before committing. Share your dates and we’ll point you to the ones offering passes in ${d}.`,
                    },
                ],
            },
            {
                heading: `Coworking spaces in ${d}`,
                intro: [
                    `A coworking space is often the practical middle ground in ${d} — more focused than working from home, far lighter than leasing your own office. It’s a popular choice for freelancers, growing teams and anyone splitting time between clients.`,
                    `Plans usually range from flexible hot desks to fixed dedicated desks and private team cabins, each with high-speed internet, power backup and access to meeting rooms. Weigh up a few and book the setup that matches how you work.`,
                ],
                faqs: [
                    {
                        question: `Is coworking cheaper than renting an office in ${d}?`,
                        answer: `For most small teams, yes — you share amenities instead of paying for a whole floor, and you can start with a single desk. Costs in ${d} scale with desk type and team size, so tell us your needs for a comparison.`,
                    },
                    {
                        question: `Can a team share a coworking space in ${d}?`,
                        answer: `Absolutely. Private cabins are priced per team and give you a lockable space of your own, while dedicated desks work well for smaller groups. Let us know your headcount and we’ll shortlist suitable ${d} spaces.`,
                    },
                ],
            },
        ],
        'virtual-office': [
            {
                heading: `Virtual office in ${d}`,
                intro: [
                    `A virtual office gives your business a professional ${d} address without renting premises — handy for founders, consultants and online sellers who need a registered address for GST or company registration while working remotely.`,
                    `Pick a plan that bundles the paperwork to register the address — a rent or service agreement, a No Objection Certificate and address proof — with mail handling and optional meeting-room access for the odd in-person meeting.`,
                ],
                faqs: [
                    {
                        question: `Can I use a virtual office for GST registration in ${d}?`,
                        answer: `Yes — a virtual office can establish a principal place of business for GST in ${d} when you don’t hold your own premises, as long as it comes with the rent agreement, NOC and address proof. Check the specifics with your CA before filing.`,
                    },
                    {
                        question: `How much does a virtual office in ${d} cost?`,
                        answer: `Pricing is usually annual and depends on whether registration documents and mail handling are included. Address-only plans are cheaper but often can’t back a GST application. Share your needs for current ${d} rates.`,
                    },
                ],
            },
            {
                heading: `Virtual office in ${d}`,
                intro: [
                    `Want a credible ${d} business address without the overhead of an office? A virtual office provides exactly that — a commercial address you can put on registrations, invoices and your website, while your team keeps working wherever it likes.`,
                    `A complete plan includes the documents needed to register the address (rent or service agreement, NOC and address proof), routine mail handling, and meeting rooms you can book when a client wants to meet face to face.`,
                ],
                faqs: [
                    {
                        question: `What documents come with a ${d} virtual office?`,
                        answer: `Usually a rent or service agreement in your company’s name, a No Objection Certificate from the property owner, and address proof such as a utility bill. Ask upfront which documents are included and that each is issued in your business’s name.`,
                    },
                    {
                        question: `Is a virtual office enough for company registration in ${d}?`,
                        answer: `In most cases yes — the same address pack that supports GST can typically be used to register a company in ${d}, provided the documents are in order. Confirm the exact requirements with your CA or company secretary.`,
                    },
                ],
            },
            {
                heading: `Virtual office in ${d}`,
                intro: [
                    `A virtual office is the low-cost way to plant a professional flag in ${d}. Instead of leasing space, you get a registered commercial address plus mail handling — enough to satisfy GST, invoices and correspondence without paying for a desk you won’t use.`,
                    `Look closely at what each plan includes: the agreement, NOC and address proof you’ll need to register the address, how post is handled, and whether meeting-room time is bundled for client visits.`,
                ],
                faqs: [
                    {
                        question: `Who uses a virtual office in ${d}?`,
                        answer: `Mostly remote-first teams, consultants, freelancers and online sellers who need a ${d} address for GST or registration but don’t want the cost of full-time premises. It’s also common for out-of-state businesses opening a local GSTIN.`,
                    },
                    {
                        question: `How much does a virtual office in ${d} cost?`,
                        answer: `Plans are generally billed yearly, and the rate turns on whether registration paperwork and mail handling are included. A bare address is cheapest but usually isn’t GST-ready. Tell us what you need and we’ll quote current ${d} rates.`,
                    },
                ],
            },
        ],
        'private-office': [
            {
                heading: `Private office space in ${d}`,
                intro: [
                    `A private office gives your ${d} team a secure, furnished space of its own — a good fit for confidential work, all-day calls, or simply a team that’s outgrown a shared floor.`,
                    `These are typically serviced cabins: furniture, fast internet, power backup, meeting rooms, reception and housekeeping are handled for you. Start with a small cabin and scale up as you hire.`,
                ],
                faqs: [
                    {
                        question: `How much does a private office in ${d} cost?`,
                        answer: `Private offices are priced per cabin rather than per seat, so the cost tracks team size and location. For small teams the per-person figure often lands close to dedicated desks. Share your headcount for a ${d} quote.`,
                    },
                    {
                        question: `Can I get a private office for a small team in ${d}?`,
                        answer: `Yes — cabins start small enough for two or three people and grow as you hire, so early-stage teams get privacy without committing to a conventional lease.`,
                    },
                ],
            },
            {
                heading: `Private office space in ${d}`,
                intro: [
                    `Once a shared desk no longer cuts it, a private office in ${d} gives your team four walls, a lockable door and room to concentrate — ideal for handling sensitive work or spending the day on calls.`,
                    `Most are fully serviced, so furniture, high-speed internet, backup power, meeting rooms and reception are already in place. You can begin with a compact cabin and move to a larger one as the team expands.`,
                ],
                faqs: [
                    {
                        question: `What’s included in a private office in ${d}?`,
                        answer: `Generally a furnished, lockable cabin with high-speed internet, power backup, meeting-room access, reception and housekeeping. Inclusions vary between ${d} spaces, so confirm meeting-room hours, parking and after-hours access before signing.`,
                    },
                    {
                        question: `Is a private office worth it for a small ${d} team?`,
                        answer: `Often, yes — you get privacy and a fixed base without leasing a whole floor, and per-person costs can rival dedicated desks once a team reaches a handful of people. Tell us your size and we’ll compare options.`,
                    },
                ],
            },
            {
                heading: `Private office space in ${d}`,
                intro: [
                    `A private office turns ${d} workspace into something that’s genuinely yours — a dedicated, furnished room your team can lock, brand and settle into, away from the bustle of an open floor.`,
                    `Because these cabins are serviced, the essentials — internet, power backup, meeting rooms, reception, housekeeping — are taken care of. It’s a move-in-ready setup you can grow into over time.`,
                ],
                faqs: [
                    {
                        question: `How much does a private office in ${d} cost?`,
                        answer: `Cost depends on cabin size and location, since pricing is per cabin, not per seat. For a small ${d} team it can work out close to dedicated desks per head. Send your team size for a tailored quote.`,
                    },
                    {
                        question: `Can we expand our private office as the team grows in ${d}?`,
                        answer: `Yes — most providers let you start in a small cabin and move to a larger one, or add adjacent space, as you hire. It’s one of the main reasons teams pick a private office over a fixed lease.`,
                    },
                ],
            },
        ],
    };
}

/** Generic-but-valid content for a city we don't have bespoke copy for yet. */
function fallbackContent(
    service: ServiceSlug,
    displayName: string,
    citySlug: string
): CityServiceContent {
    const label = SERVICE_LABEL[service];
    const base = pickVariant(citySlug.toLowerCase(), fallbackVariants(displayName)[service]);

    return {
        metaTitle: `${label} in ${displayName} | CoWork Kerala`,
        metaDescription: base.intro[0],
        ...base,
    };
}

/**
 * Resolve the content for a city/service pair. Falls back to generic content
 * (built from `displayName`) for cities without bespoke copy.
 */
export function getCityServiceContent(
    citySlug: string,
    service: ServiceSlug,
    displayName: string
): CityServiceContent {
    const entry = CITY_CONTENT[citySlug.toLowerCase()];
    return entry?.[service] ?? fallbackContent(service, displayName, citySlug);
}
