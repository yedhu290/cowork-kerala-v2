import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="text-6xl font-bold text-primary-600">404</p>
            <h1 className="heading-page text-zinc-900">Page not found</h1>
            <p className="max-w-md text-zinc-600">
                The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you
                back to finding your ideal workspace.
            </p>
            <div className="flex gap-4">
                <Link href="/" className="btn-dark">
                    Back to home
                </Link>
                <Link href="/coworking-space" className="btn-primary">
                    Browse workspaces
                </Link>
            </div>
        </div>
    );
}
