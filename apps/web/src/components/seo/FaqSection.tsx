import JsonLd from '@/components/seo/JsonLd';
import { faqPageJsonLd } from '@/lib/seo';
import type { FaqItem } from '@/lib/cityContent';

/**
 * Visible FAQ accordion plus matching FAQPage JSON-LD.
 *
 * Uses native <details>/<summary> so it works without client JS and stays
 * accessible. The structured data mirrors the visible questions and answers.
 */
export default function FaqSection({
    faqs,
    heading = 'Frequently asked questions',
}: {
    faqs: FaqItem[];
    heading?: string;
}) {
    if (!faqs.length) return null;

    return (
        <section className="flex flex-col gap-6">
            <JsonLd data={faqPageJsonLd(faqs)} />
            <h2 className="heading-subsection text-zinc-900">{heading}</h2>
            <div className="flex flex-col divide-y divide-zinc-200 border-y border-zinc-200">
                {faqs.map((faq) => (
                    <details key={faq.question} className="group py-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-zinc-900 [&::-webkit-details-marker]:hidden">
                            {faq.question}
                            <span
                                aria-hidden="true"
                                className="shrink-0 text-xl leading-none text-zinc-400 transition-transform duration-200 group-open:rotate-45"
                            >
                                +
                            </span>
                        </summary>
                        <p className="mt-3 leading-relaxed text-zinc-600">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
