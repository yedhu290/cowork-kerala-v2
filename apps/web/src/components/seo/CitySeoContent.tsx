import FaqSection from '@/components/seo/FaqSection';
import CityLocationSection from '@/components/seo/CityLocationSection';
import CityInternalLinks from '@/components/seo/CityInternalLinks';
import { getCityServiceContent, type ServiceSlug } from '@/lib/cityContent';

/**
 * Local intro copy + FAQ (with FAQPage schema) for a {service}/[city] page.
 * The content targets location-specific long-tail intent and is unique per
 * city/service pair.
 */
export default function CitySeoContent({
    citySlug,
    service,
    displayName,
}: {
    citySlug: string;
    service: ServiceSlug;
    displayName: string;
}) {
    const content = getCityServiceContent(citySlug, service, displayName);

    return (
        <section className="flex flex-col gap-12">
            <div className="flex max-w-3xl flex-col gap-4">
                <h2 className="heading-subsection text-zinc-900">{content.heading}</h2>
                {content.intro.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed text-zinc-600">
                        {paragraph}
                    </p>
                ))}
            </div>

            <CityLocationSection citySlug={citySlug} displayName={displayName} />

            {content.sections && content.sections.length > 0 && (
                <div className="flex max-w-3xl flex-col gap-10">
                    {content.sections.map((section) => (
                        <div key={section.heading} className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-zinc-900 md:text-2xl">
                                {section.heading}
                            </h3>
                            {section.body.map((paragraph, index) => (
                                <p key={index} className="leading-relaxed text-zinc-600">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            <div className="max-w-3xl">
                <FaqSection faqs={content.faqs} />
            </div>

            <CityInternalLinks citySlug={citySlug} service={service} displayName={displayName} />
        </section>
    );
}
