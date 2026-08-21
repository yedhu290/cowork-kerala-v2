export default function Loading() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex min-h-screen items-center justify-center"
        >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600" />
            <span className="sr-only">Loading…</span>
        </div>
    );
}
