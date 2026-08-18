import Link from 'next/link';

import { InnerPage } from '@/components/layout/InnerPage';
import { groupServices } from '@/data/services';
import { siteConfig } from '@/data/site';

/**
 * WordPress had no 404 template, so it fell through to `index.php` and served a
 * blank page. This gives the same shell as every other page plus real routes
 * out, and returns a genuine 404 status.
 */
export default function NotFound() {
  const groups = groupServices();

  return (
    <InnerPage>
      <section>
        <div className="container notfound">
          <div className="notfound-code" aria-hidden="true">
            404
          </div>
          <h1>We couldn&rsquo;t find that page</h1>
          <p>
            The page you were looking for has moved or no longer exists. Browse our services below,
            or call us at{' '}
            <a href={siteConfig.phone.href} style={{ color: 'var(--red)', fontWeight: 700 }}>
              {siteConfig.phone.display}
            </a>{' '}
            and we&rsquo;ll point you in the right direction.
          </p>
          <div className="notfound-actions">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/contact-us/" className="btn-secondary">
              Contact Us
            </Link>
          </div>

          <div className="notfound-links">
            <div className="cross-grid">
              {groups.map((group) => (
                <div className="cross-col" key={group.category}>
                  <div className="cross-cat">{group.category}</div>
                  {group.services.map((service) => (
                    <Link href={`/${service.slug}/`} key={service.slug}>
                      {service.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
