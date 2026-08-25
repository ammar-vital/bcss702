import Link from 'next/link';

import { FadeIn } from '@/components/ui/FadeIn';
import { groupServices, services } from '@/data/services';

/** The complete service menu, grouped by category, so the homepage shows the
 * full breadth of what Butler's does rather than a six-card sample. */
export function ServicesByCategory() {
  const groups = groupServices();
  return (
    <section className="svc-cats">
      <div className="container">
        <div className="svc-cats-head">
          <div className="section-tag">Full Service Menu</div>
          <h2 className="section-title">Everything We Build &amp; Repair</h2>
          <p className="section-sub">
            One licensed team for your whole property, {services.length} services across{' '}
            {groups.length} categories.
          </p>
        </div>
        <div className="svc-cats-grid">
          {groups.map((group) => (
            <FadeIn className="svc-cat" key={group.category}>
              <h3 className="svc-cat-title">{group.category}</h3>
              <ul className="svc-cat-list">
                {group.services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/${service.slug}/`}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
