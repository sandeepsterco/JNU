'use client'

export default function PageError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="container">
            <div className="error_state">
                <p>Something went wrong while loading this page.</p>
                <button onClick={() => reset()}>Try again</button>
            </div>
        </div>
    )
}