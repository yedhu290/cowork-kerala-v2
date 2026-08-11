import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/ui/HeaderServer';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PostCard from '@/components/blog/PostCard';
import { getAllPostMeta } from '@/lib/blog';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo';

const TITLE = 'Coworking & Workspace Guides in Kerala | CoWork Blog';
const DESCRIPTION =
    'Guides on coworking spaces, virtual offices and private offices in Kerala — how to choose, what they cost and what to expect. Read the latest tips here.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
        'coworking blog Kerala',
        'workspace guides Kochi',
        'virtual office guide',
        'coworking tips',
        'office space advice Kerala',
    ],
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        type: 'website',
        locale: 'en_IN',
        siteName: SITE_NAME,
        images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
        canonical: '/blog',
    },
};

const BlogIndexPage = () => {
    const posts = getAllPostMeta();

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
                            { name: 'Blog', url: '/blog' },
                        ]}
                    />

                    <header className="flex max-w-3xl flex-col gap-3">
                        <h1 className="heading-page text-zinc-900">
                            Ideas &amp; guides for working in Kerala
                        </h1>
                        <p className="text-zinc-600 leading-relaxed">
                            Practical advice on finding and booking the right workspace in Kerala —
                            from comparing coworking options to setting up a virtual office for GST
                            registration.
                        </p>
                    </header>

                    {posts.length === 0 ? (
                        <p className="text-zinc-600">
                            No posts published yet. Check back soon.
                        </p>
                    ) : (
                        <section className="flex flex-col gap-6">
                            <h2 className="text-2xl font-semibold text-zinc-900 md:text-3xl">
                                Latest workspace guides
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.map((post) => (
                                    <PostCard key={post.slug} post={post} />
                                ))}
                            </div>
                        </section>
                    )}
                </Fixedw>
            </main>
            <Footer />
        </>
    );
};

export default BlogIndexPage;
