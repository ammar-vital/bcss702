'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Details stay server-side; the visitor only ever sees the digest.
    console.error(error);
  }, [error]);

  return (
    <div className="page-inner">
      <main id="main">
        <section>
          <div className="container notfound">
            <h1>Something went wrong</h1>
            <p>
              We hit an unexpected problem loading this page. Please try again, or call us at{' '}
              <a href="tel:+17025750781" style={{ color: 'var(--red)', fontWeight: 700 }}>
                (702) 575-0781
              </a>
              .
            </p>
            <div className="notfound-actions">
              <button type="button" className="btn-primary" onClick={reset}>
                Try again
              </button>
              <Link href="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
            {error.digest && (
              <p style={{ fontSize: 12, color: 'var(--gray)' }}>Reference: {error.digest}</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
