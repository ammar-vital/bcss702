import Link from 'next/link';

import { groupServices } from '@/data/services';

/**
 * The "Browse All Services" grid that closed every service page. It lists the
 * other 36 services, grouped exactly as the theme grouped them.
 */
export function CrossLinks({ excludeSlug }: { excludeSlug: string }) {
  const groups = groupServices(excludeSlug);

  return (
    <section className="cross-links">
      <div className="container">
        <div className="section-tag">Browse All Services</div>
        <h2>Complete Property Solutions Under One Roof</h2>
        <p className="sub">
          From kitchen remodels to commercial build-outs, plumbing to full custom home construction
          we handle every service in-house.
        </p>
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
    </section>
  );
}
