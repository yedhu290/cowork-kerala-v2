import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/ui/HeaderServer';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Section from '@/components/ui/LegalSection';
import {
    DEFAULT_OG_IMAGE,
    SITE_NAME,
    CONTACT_EMAIL,
    CONTACT_PHONE,
    LOCALITY,
    REGION,
} from '@/lib/seo';

const LAST_UPDATED = '17 July 2026';

export const metadata: Metadata = {
    title: 'Terms & Conditions | CoWork Kerala',
    description:
        'The terms for using the CoWork Kerala website to browse workspaces and submit enquiries for coworking spaces, private offices and virtual offices across Kerala.',
    openGraph: {
        title: 'Terms & Conditions | CoWork Kerala',
        description: 'The terms that apply when you use the CoWork Kerala website.',
        type: 'website',
        locale: 'en_IN',
        siteName: SITE_NAME,
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms & Conditions | CoWork Kerala',
        description: 'The terms that apply when you use the CoWork Kerala website.',
        images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
        canonical: '/terms',
    },
};

const TermsPage = () => {
    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col">
                <Header />
            </Fixedw>
            <main>
                <Fixedw className="container mx-auto md:px-8 flex flex-col gap-8 pt-4 mb-12 md:mb-24">
                    <Breadcrumbs
                        items={[
                            { name: 'Home', url: '/' },
                            { name: 'Terms & Conditions', url: '/terms' },
                        ]}
                    />

                    <header className="flex flex-col gap-3">
                        <h1 className="heading-page text-zinc-900">
                            Terms &amp; Conditions
                        </h1>
                        <p className="text-sm text-zinc-500">Last updated: {LAST_UPDATED}</p>
                        <p className="max-w-3xl text-zinc-600 leading-relaxed">
                            These terms apply when you use the {SITE_NAME} website. Please read them
                            before browsing listings or sending us an enquiry. If you do not agree
                            with them, please do not use the site.
                        </p>
                    </header>

                    <div className="flex max-w-3xl flex-col gap-8">
                        <Section title="1. About these terms">
                            <p>
                                By accessing or using coworkkerala.com (the “site”), you agree to
                                these terms. If you are using the site on behalf of a company or
                                other organisation, you confirm you have authority to accept these
                                terms for them.
                            </p>
                        </Section>

                        <Section title="2. What we do">
                            <p>
                                {SITE_NAME} is a discovery and enquiry platform. We list coworking
                                spaces, private offices, and virtual offices across {REGION}, and we
                                help you shortlist options, arrange visits, and get in touch with the
                                relevant workspace operator.
                            </p>
                            <p>
                                <strong className="text-zinc-800">
                                    We are not necessarily the owner or operator of every space
                                    listed.
                                </strong>{' '}
                                Unless we tell you otherwise in writing, any agreement for a desk,
                                office, or virtual office service is entered into between you and the
                                workspace operator. Their terms, house rules, and cancellation policy
                                will apply to that agreement.
                            </p>
                        </Section>

                        <Section title="3. Eligibility">
                            <p>
                                You must be able to enter into a legally binding contract to use the
                                site and submit enquiries. The site is intended for business and
                                professional use and is not directed at children.
                            </p>
                        </Section>

                        <Section title="4. Enquiries you submit">
                            <p>
                                When you submit an enquiry, you agree that the information you give
                                us — including your name, email, and phone number — is accurate and
                                that you are entitled to share it. You agree that we and, where
                                relevant, the workspace operator may contact you about your enquiry.
                            </p>
                            <p>
                                Submitting an enquiry does not reserve or guarantee a space. A
                                booking is only confirmed once the workspace operator (or we, where
                                we are providing the service) confirms it to you.
                            </p>
                            <p>
                                How we handle the information you send us is explained in our{' '}
                                <Link
                                    href="/privacy"
                                    className="underline transition-colors hover:text-primary-700"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </Section>

                        <Section title="5. Listings, pricing, and availability">
                            <p>
                                Listing details — including descriptions, photographs, amenities,
                                seat counts, prices, and availability — are provided to us by
                                workspace operators or compiled by us, and are shown for general
                                information. Prices are indicative, may exclude taxes and additional
                                charges, and can change without notice.
                            </p>
                            <p>
                                We take reasonable care to keep listings accurate, but we do not
                                warrant that any listing is complete, current, or error-free. Always
                                confirm the details, final price, and availability before you commit.
                            </p>
                        </Section>

                        <Section title="6. Acceptable use">
                            <p>You agree not to:</p>
                            <ul className="ml-5 list-disc space-y-2">
                                <li>
                                    use the site for any unlawful purpose or in breach of these
                                    terms;
                                </li>
                                <li>
                                    submit false, misleading, or someone else’s personal details;
                                </li>
                                <li>
                                    send spam, or attempt to interfere with, overload, or disrupt the
                                    site or its infrastructure;
                                </li>
                                <li>
                                    scrape, copy, or systematically extract listings or content from
                                    the site without our written permission;
                                </li>
                                <li>
                                    attempt to gain unauthorised access to any part of the site, our
                                    systems, or accounts.
                                </li>
                            </ul>
                        </Section>

                        <Section title="7. Intellectual property">
                            <p>
                                The site, its design, text, graphics, logos, and the {SITE_NAME} name
                                and branding are owned by us or our licensors and are protected by
                                intellectual property laws. Images and descriptions of individual
                                spaces may belong to the relevant workspace operator.
                            </p>
                            <p>
                                You may view and print pages of the site for your own use in
                                evaluating workspaces. You may not otherwise reproduce, republish, or
                                exploit any part of the site commercially without our permission.
                            </p>
                        </Section>

                        <Section title="8. Third-party links and services">
                            <p>
                                The site may link to websites and services we do not control,
                                including those of workspace operators and partners. We are not
                                responsible for their content, products, or practices, and a link
                                does not mean we endorse them. Your dealings with them are between
                                you and them.
                            </p>
                        </Section>

                        <Section title="9. Disclaimers">
                            <p>
                                The site is provided on an “as is” and “as available” basis. To the
                                extent permitted by law, we do not guarantee that the site will be
                                uninterrupted, secure, or error-free, or that the information on it
                                is accurate or complete.
                            </p>
                            <p>
                                We are not responsible for the acts or omissions of workspace
                                operators, including the condition, quality, safety, or availability
                                of any space, or their failure to honour a booking.
                            </p>
                        </Section>

                        <Section title="10. Limitation of liability">
                            <p>
                                To the fullest extent permitted by law, {SITE_NAME} will not be
                                liable for any indirect, incidental, or consequential loss, or for
                                loss of profits, business, data, or goodwill, arising out of your use
                                of the site or your dealings with a workspace operator.
                            </p>
                            <p>
                                Nothing in these terms excludes or limits liability that cannot be
                                excluded or limited under applicable law.
                            </p>
                        </Section>

                        <Section title="11. Indemnity">
                            <p>
                                You agree to indemnify us against reasonable claims, losses, and
                                costs arising from your misuse of the site or your breach of these
                                terms or of applicable law.
                            </p>
                        </Section>

                        <Section title="12. Changes to the site and these terms">
                            <p>
                                We may change, suspend, or discontinue any part of the site at any
                                time. We may also update these terms; when we do, we will revise the
                                “Last updated” date above. Continuing to use the site after a change
                                means you accept the updated terms.
                            </p>
                        </Section>

                        <Section title="13. Governing law">
                            <p>
                                These terms are governed by the laws of India, and the courts at{' '}
                                {LOCALITY}, {REGION} will have jurisdiction over any dispute arising
                                from them or from your use of the site.
                            </p>
                        </Section>

                        <Section title="14. Contact us">
                            <p>If you have questions about these terms, get in touch:</p>
                            <ul className="ml-5 list-disc space-y-2">
                                <li>
                                    Email:{' '}
                                    <a
                                        href={`mailto:${CONTACT_EMAIL}`}
                                        className="underline transition-colors hover:text-primary-700"
                                    >
                                        {CONTACT_EMAIL}
                                    </a>
                                </li>
                                <li>
                                    Phone:{' '}
                                    <a
                                        href={`tel:${CONTACT_PHONE}`}
                                        className="underline transition-colors hover:text-primary-700"
                                    >
                                        {CONTACT_PHONE}
                                    </a>
                                </li>
                                <li>
                                    Location: {LOCALITY}, {REGION}, India
                                </li>
                            </ul>
                            <p>
                                You can also reach us through our{' '}
                                <Link
                                    href="/contact"
                                    className="underline transition-colors hover:text-primary-700"
                                >
                                    contact page
                                </Link>
                                .
                            </p>
                        </Section>
                    </div>
                </Fixedw>
            </main>
            <Footer />
        </>
    );
};

export default TermsPage;
