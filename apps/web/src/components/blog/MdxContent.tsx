import React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { MDXComponents } from 'mdx/types';

/**
 * Element map for MDX bodies so posts match the site's design rather than
 * relying on a generic prose stylesheet.
 */
const components: MDXComponents = {
    h2: (props) => (
        <h2
            className="mt-10 text-2xl font-semibold text-zinc-900 md:text-3xl"
            {...props}
        />
    ),
    h3: (props) => (
        <h3 className="mt-8 text-xl font-semibold text-zinc-900 md:text-2xl" {...props} />
    ),
    h4: (props) => (
        <h4 className="mt-6 text-lg font-semibold text-zinc-900" {...props} />
    ),
    p: (props) => <p className="mt-4 leading-relaxed text-zinc-600" {...props} />,
    a: ({ href = '', children, ...props }) => {
        const isInternal = href.startsWith('/');
        const className =
            'font-medium text-primary-700 underline underline-offset-2 transition-colors hover:opacity-80';

        if (isInternal) {
            return (
                <Link href={href} className={className} {...props}>
                    {children}
                </Link>
            );
        }

        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                {...props}
            >
                {children}
            </a>
        );
    },
    ul: (props) => (
        <ul className="mt-4 ml-5 list-disc space-y-2 text-zinc-600" {...props} />
    ),
    ol: (props) => (
        <ol className="mt-4 ml-5 list-decimal space-y-2 text-zinc-600" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    strong: (props) => <strong className="font-semibold text-zinc-800" {...props} />,
    blockquote: (props) => (
        <blockquote
            className="mt-6 border-l-4 border-primary-100 bg-zinc-50 px-5 py-4 text-zinc-700 italic"
            {...props}
        />
    ),
    hr: () => <hr className="my-10 border-zinc-200" />,
    code: (props) => (
        <code
            className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800"
            {...props}
        />
    ),
    pre: (props) => (
        <pre
            className="mt-6 overflow-x-auto rounded-xl bg-zinc-900 p-5 text-sm text-zinc-100"
            {...props}
        />
    ),
    table: (props) => (
        <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm" {...props} />
        </div>
    ),
    th: (props) => (
        <th
            className="border-b border-zinc-200 px-4 py-3 font-semibold text-zinc-900"
            {...props}
        />
    ),
    td: (props) => (
        <td className="border-b border-zinc-100 px-4 py-3 text-zinc-600" {...props} />
    ),
    // Authored images: lazy-loaded and constrained. Plain <img> because MDX
    // authors don't supply intrinsic dimensions for next/image.
    img: ({ src = '', alt = '' }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={typeof src === 'string' ? src : ''}
            alt={alt}
            loading="lazy"
            className="mt-6 w-full rounded-2xl border border-zinc-200"
        />
    ),
};

/** Renders an MDX post body. Server component — compiles at build time. */
export default function MdxContent({ source }: { source: string }) {
    return (
        <MDXRemote
            source={source}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
    );
}
