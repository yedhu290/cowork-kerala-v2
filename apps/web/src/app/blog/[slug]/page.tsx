import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/ui/HeaderServer';
import Footer from '@/components/ui/Footer';
import Fixedw from '@/components/ui/Fixedw';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import MdxContent from '@/components/blog/MdxContent';
import PostCard from '@/components/blog/PostCard';
import { getAllPostMeta, getPostBySlug, getRelatedPosts, formatPostDate } from '@/lib/blog';
import { DEFAULT_OG_IMAGE, SITE_NAME, blogPostingJsonLd } from '@/lib/seo';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return getAllPostMeta().map((post) => ({ slug: post.slug }));
}

/**
 * Every post is known at build time, so any other slug is a genuine 404.
 * Without this, unknown slugs render the not-found UI with a 200 status —
 * a soft 404 that search engines may index.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found | CoWork Kerala' };
    }

    const image = post.image || DEFAULT_OG_IMAGE;

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            locale: 'en_IN',
            siteName: SITE_NAME,
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
            images: [image],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [image],
        },
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
    };
}

const BlogPostPage = async ({ params }: Props) => {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const related = getRelatedPosts(slug);
    const heroImage = post.image || DEFAULT_OG_IMAGE;

    return (
        <>
            <Fixedw className="container mx-auto md:px-8 flex flex-col">
                <Header />
            </Fixedw>
            <main>
                <Fixedw className="container mx-auto md:px-8 flex flex-col gap-8 pt-4 mb-12 md:mb-24">
                    <JsonLd
                        data={blogPostingJsonLd({
                            title: post.title,
                            description: post.description,
                            date: post.date,
                            author: post.author,
                            image: post.image,
                            path: `/blog/${post.slug}`,
                        })}
                    />

                    <Breadcrumbs
                        items={[
                            { name: 'Home', url: '/' },
                            { name: 'Blog', url: '/blog' },
                            { name: post.title, url: `/blog/${post.slug}` },
                        ]}
                    />

                    <article className="flex max-w-3xl flex-col">
                        <header className="flex flex-col gap-4">
                            <h1 className="heading-page text-zinc-900">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                                <span>{post.author}</span>
                                <span aria-hidden="true">·</span>
                                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                                <span aria-hidden="true">·</span>
                                <span>{post.readingTimeMinutes} min read</span>
                            </div>

                            <p className="text-lg leading-relaxed text-zinc-600">
                                {post.description}
                            </p>
                        </header>

                        <div className="relative mt-8 aspect-16/10 w-full overflow-hidden rounded-2xl bg-zinc-100">
                            <Image
                                src={heroImage}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 768px"
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="mt-4">
                            <MdxContent source={post.content} />
                        </div>

                        {post.tags && post.tags.length > 0 && (
                            <ul className="mt-10 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <li
                                        key={tag}
                                        className="rounded-full bg-primary-50 px-3 py-1 text-xs text-zinc-700"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </article>

                    {related.length > 0 && (
                        <section className="flex flex-col gap-6 border-t border-zinc-200 pt-10">
                            <h2 className="text-2xl font-semibold text-zinc-900">
                                Related reading
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {related.map((item) => (
                                    <PostCard key={item.slug} post={item} />
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

export default BlogPostPage;
