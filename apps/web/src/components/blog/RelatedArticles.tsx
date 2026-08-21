import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PostCard from '@/components/blog/PostCard';
import type { PostMeta } from '@/lib/blog';

/**
 * "Related articles" grid for service landing pages. Reuses the blog PostCard so
 * cards stay consistent with the blog index, and links through to the full blog.
 */
export default function RelatedArticles({
    posts,
    heading = 'Related articles',
    intro,
}: {
    posts: PostMeta[];
    heading?: string;
    intro?: string;
}) {
    if (!posts.length) return null;

    return (
        <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="heading-subsection text-zinc-900">{heading}</h2>
                {intro && <p className="max-w-2xl leading-relaxed text-zinc-600">{intro}</p>}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>

            <Link
                href="/blog"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
            >
                Read more from our blog
                <ArrowRight size={16} />
            </Link>
        </section>
    );
}
