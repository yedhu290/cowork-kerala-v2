import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPostDate, type PostMeta } from '@/lib/blog';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';

/** Summary card for a blog post, used on the index and in related posts. */
export default function PostCard({ post }: { post: PostMeta }) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 transition-colors hover:border-primary-100">
            <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-100">
                    <Image
                        src={post.image || DEFAULT_OG_IMAGE}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTimeMinutes} min read</span>
                    </div>

                    <h3 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-primary-700">
                        {post.title}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600">
                        {post.description}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                            {post.tags.slice(0, 3).map((tag) => (
                                <li
                                    key={tag}
                                    className="rounded-full bg-primary-50 px-3 py-1 text-xs text-zinc-700"
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Link>
        </article>
    );
}
