/**
 * Renders one or more JSON-LD structured-data blocks as <script> tags.
 * Server component — safe to embed directly in layouts and pages.
 */
type JsonLdProps = {
    data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: JsonLdProps) {
    const blocks = Array.isArray(data) ? data : [data];
    return (
        <>
            {blocks.map((block, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
                />
            ))}
        </>
    );
}
