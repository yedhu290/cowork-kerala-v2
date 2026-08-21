'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Surface the error for monitoring; replace with your logger of choice.
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
            <h1 className="heading-page text-zinc-900">
                Something went wrong
            </h1>
            <p className="max-w-md text-zinc-600">
                An unexpected error occurred while loading this page. Please try again — if the
                problem persists, contact us and we&apos;ll help.
            </p>
            <div className="flex gap-4">
                <button onClick={reset} className="btn-dark">
                    Try again
                </button>
                <a href="/" className="btn-primary">
                    Back to home
                </a>
            </div>
        </div>
    );
}
