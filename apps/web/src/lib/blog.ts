/**
 * Blog content layer.
 *
 * Posts are MDX files in `src/content/blog`. The filename (minus extension) is
 * the URL slug. Everything here runs at build time on the server, so blog pages
 * can be generated statically.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

/** Average adult reading speed, used to estimate read time. */
const WORDS_PER_MINUTE = 200;

export type PostFrontmatter = {
    title: string;
    description: string;
    /** ISO date string, e.g. "2026-07-18". */
    date: string;
    author: string;
    /** Site-relative or absolute image URL used for OG and the post card. */
    image?: string;
    tags?: string[];
    /** Set to true to keep a post out of listings, the sitemap, and routing. */
    draft?: boolean;
};

export type PostMeta = PostFrontmatter & {
    slug: string;
    readingTimeMinutes: number;
};

export type Post = PostMeta & {
    /** Raw MDX body, compiled by the page that renders it. */
    content: string;
};

function isMdxFile(filename: string): boolean {
    return filename.endsWith('.mdx') || filename.endsWith('.md');
}

function slugFromFilename(filename: string): string {
    return filename.replace(/\.mdx?$/, '');
}

function estimateReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Validate frontmatter at build time. A typo in a post's frontmatter should
 * fail the build loudly rather than render a page with "undefined" in it.
 */
function assertFrontmatter(data: Record<string, unknown>, slug: string): PostFrontmatter {
    const required = ['title', 'description', 'date', 'author'] as const;
    for (const key of required) {
        if (typeof data[key] !== 'string' || !(data[key] as string).trim()) {
            throw new Error(
                `Blog post "${slug}" is missing required frontmatter field "${key}".`
            );
        }
    }

    const date = data.date as string;
    if (Number.isNaN(Date.parse(date))) {
        throw new Error(`Blog post "${slug}" has an invalid date: "${date}".`);
    }

    return {
        title: data.title as string,
        description: data.description as string,
        date,
        author: data.author as string,
        image: typeof data.image === 'string' ? data.image : undefined,
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
        draft: data.draft === true,
    };
}

function readPost(filename: string): Post {
    const slug = slugFromFilename(filename);
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
    const { data, content } = matter(raw);
    const frontmatter = assertFrontmatter(data, slug);

    return {
        ...frontmatter,
        slug,
        readingTimeMinutes: estimateReadingTime(content),
        content,
    };
}

/** Every published post, newest first. Drafts are excluded. */
export function getAllPosts(): Post[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    return fs
        .readdirSync(BLOG_DIR)
        .filter(isMdxFile)
        .map(readPost)
        .filter((post) => !post.draft)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

/** Post metadata only (no MDX body) — enough to render listings. */
export function getAllPostMeta(): PostMeta[] {
    return getAllPosts().map(({ content: _content, ...meta }) => meta);
}

/** A single published post, or null if the slug does not exist. */
export function getPostBySlug(slug: string): Post | null {
    return getAllPosts().find((post) => post.slug === slug) ?? null;
}

/**
 * Up to `limit` other posts, preferring ones that share a tag with the given
 * post so "related reading" is actually related.
 */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
    const posts = getAllPostMeta();
    const current = posts.find((post) => post.slug === slug);
    if (!current) return posts.slice(0, limit);

    const currentTags = new Set(current.tags ?? []);
    const others = posts.filter((post) => post.slug !== slug);

    return others
        .map((post) => ({
            post,
            shared: (post.tags ?? []).filter((tag) => currentTags.has(tag)).length,
        }))
        .sort((a, b) => b.shared - a.shared || Date.parse(b.post.date) - Date.parse(a.post.date))
        .slice(0, limit)
        .map((entry) => entry.post);
}

/**
 * Up to `limit` posts, ordered so those whose tags match `preferred` come
 * first (then most recent). Useful for "related articles" on non-blog pages
 * like the service landing pages, where there is no current post slug.
 */
export function getPostsPreferringTags(preferred: string[], limit = 3): PostMeta[] {
    const wanted = new Set(preferred.map((tag) => tag.toLowerCase()));

    return getAllPostMeta()
        .map((post) => ({
            post,
            score: (post.tags ?? []).filter((tag) => wanted.has(tag.toLowerCase())).length,
        }))
        .sort((a, b) => b.score - a.score || Date.parse(b.post.date) - Date.parse(a.post.date))
        .slice(0, limit)
        .map((entry) => entry.post);
}

/** Format an ISO date for display, e.g. "18 July 2026". */
export function formatPostDate(date: string): string {
    return new Date(date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}
