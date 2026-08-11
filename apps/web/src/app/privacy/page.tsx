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
    title: 'Privacy Policy | CoWork Kerala',
    description:
        'How CoWork Kerala collects, uses, and protects your personal information when you enquire about coworking spaces, private offices, or virtual offices in Kerala.',
    openGraph: {
        title: 'Privacy Policy | CoWork Kerala',
        description:
            'How CoWork Kerala collects, uses, and protects your personal information.',
        type: 'website',
        locale: 'en_IN',
        siteName: SITE_NAME,
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy | CoWork Kerala',
        description:
            'How CoWork Kerala collects, uses, and protects your personal information.',
        images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
        canonical: '/privacy',
    },
};

const PrivacyPolicyPage = () => {
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
                            { name: 'Privacy Policy', url: '/privacy' },
                        ]}
                    />

                    <header className="flex flex-col gap-3">
                        <h1 className="heading-page text-zinc-900">
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-zinc-500">Last updated: {LAST_UPDATED}</p>
                        <p className="max-w-3xl text-zinc-600 leading-relaxed">
                            This policy explains what information {SITE_NAME} collects when you use
                            our website, why we collect it, and the choices you have. We only
                            collect what we need to help you find and book a workspace.
                        </p>
                    </header>

                    <div className="flex max-w-3xl flex-col gap-8">
                        <Section title="1. Who we are">
                            <p>
                                {SITE_NAME} helps people find and book coworking spaces, private
                                offices, and virtual offices across {REGION}. We operate the website
                                at coworkkerala.com. If you have questions about this policy or your
                                data, contact us using the details in the “Contact us” section
                                below.
                            </p>
                        </Section>

                        <Section title="2. Information we collect">
                            <p>
                                <strong className="text-zinc-800">Enquiry details.</strong> When you
                                submit an enquiry or contact form, we collect the information you
                                provide: your name, email address, and phone number, along with
                                details about what you are looking for — the type of space, the
                                workspace or location you enquired about, the number of seats you
                                need, your preferred date, and any message you write. Your name,
                                email, and phone number are required to respond to you; the rest is
                                optional.
                            </p>
                            <p>
                                <strong className="text-zinc-800">Usage data.</strong> We use
                                analytics to understand how the site is used — for example, which
                                pages are viewed, which links are clicked, and general information
                                such as approximate location, referring site, and device or browser
                                type. See “Cookies and analytics” below.
                            </p>
                            <p>
                                We do not ask for, and you should not send us, sensitive personal
                                information such as government identifiers, financial account
                                details, or health information. The website does not process
                                payments and does not require you to create an account.
                            </p>
                        </Section>

                        <Section title="3. How we use your information">
                            <p>We use the information we collect to:</p>
                            <ul className="ml-5 list-disc space-y-2">
                                <li>respond to your enquiry and answer your questions;</li>
                                <li>
                                    shortlist suitable workspaces, arrange visits, and help you
                                    complete a booking;
                                </li>
                                <li>
                                    follow up about the enquiry you made and keep records of our
                                    communications with you;
                                </li>
                                <li>
                                    understand how our website is used so we can improve it and fix
                                    problems;
                                </li>
                                <li>
                                    comply with our legal obligations and protect against fraud or
                                    misuse.
                                </li>
                            </ul>
                            <p>
                                We do not sell your personal information, and we do not use your
                                enquiry details to send you unrelated marketing.
                            </p>
                        </Section>

                        <Section title="4. Cookies and analytics">
                            <p>
                                <strong className="text-zinc-800">Plausible Analytics.</strong> We
                                use a self-hosted instance of Plausible to measure site traffic.
                                Plausible is privacy-friendly: it does not use cookies and does not
                                collect personal information or track you across other websites.
                            </p>
                            <p>
                                <strong className="text-zinc-800">Google Analytics.</strong> We also
                                use Google Analytics, which sets cookies and collects usage data to
                                help us understand site performance. This data is processed by
                                Google. You can opt out using Google’s{' '}
                                <a
                                    href="https://tools.google.com/dlpage/gaoptout"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline transition-colors hover:text-primary-700"
                                >
                                    browser opt-out add-on
                                </a>
                                , or by blocking cookies in your browser settings. Blocking these
                                cookies will not stop you from using the site.
                            </p>
                        </Section>

                        <Section title="5. Sharing your information">
                            <p>
                                We share your information only where it is needed to provide our
                                service or where we are required to:
                            </p>
                            <ul className="ml-5 list-disc space-y-2">
                                <li>
                                    <strong className="text-zinc-800">Workspace operators.</strong>{' '}
                                    When you enquire about a specific space, we may share the
                                    details necessary to arrange a visit or booking with the
                                    operator of that space.
                                </li>
                                <li>
                                    <strong className="text-zinc-800">Service providers.</strong>{' '}
                                    Companies that help us run the website and our systems — such as
                                    our hosting and analytics providers — process data on our behalf
                                    and only as needed to provide their service.
                                </li>
                                <li>
                                    <strong className="text-zinc-800">Legal reasons.</strong> If we
                                    are required to by law, or to protect our rights, safety, or
                                    property.
                                </li>
                            </ul>
                        </Section>

                        <Section title="6. How long we keep your information">
                            <p>
                                We keep enquiry details for as long as needed to respond to you, to
                                provide the service you asked about, and to maintain reasonable
                                business records — after which we delete them or keep them only
                                where the law requires. If you would like your enquiry details
                                removed sooner, contact us and we will do so unless we are required
                                to keep them.
                            </p>
                        </Section>

                        <Section title="7. Your rights and choices">
                            <p>
                                You can ask us to access, correct, or delete the personal
                                information you have given us, and you can ask us to stop contacting
                                you at any time. To make a request, email us at{' '}
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="underline transition-colors hover:text-primary-700"
                                >
                                    {CONTACT_EMAIL}
                                </a>
                                . We may need to verify your identity before acting on a request.
                                Depending on where you live, you may have additional rights under
                                local data protection law.
                            </p>
                        </Section>

                        <Section title="8. Security">
                            <p>
                                We take reasonable technical and organisational measures to protect
                                your information, including restricting access to the systems that
                                hold enquiry data. No method of transmission or storage is completely
                                secure, so we cannot guarantee absolute security.
                            </p>
                        </Section>

                        <Section title="9. Links to other websites">
                            <p>
                                Our site may link to websites we do not operate — for example,
                                workspace operators or partners. We are not responsible for their
                                content or privacy practices, and we encourage you to read their
                                privacy policies.
                            </p>
                        </Section>

                        <Section title="10. Children’s privacy">
                            <p>
                                Our website is intended for people looking for workspace and is not
                                directed at children. We do not knowingly collect personal
                                information from children.
                            </p>
                        </Section>

                        <Section title="11. Changes to this policy">
                            <p>
                                We may update this policy from time to time. When we do, we will
                                revise the “Last updated” date at the top of this page. Please check
                                back occasionally to stay informed.
                            </p>
                        </Section>

                        <Section title="12. Contact us">
                            <p>
                                If you have questions about this policy or how we handle your
                                information, get in touch:
                            </p>
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

export default PrivacyPolicyPage;
