import Image from 'next/image';
import Link from 'next/link';

import { FadeIn } from '@/components/ui/FadeIn';
import { groupServices, services } from '@/data/services';
import type { ServiceCategory } from '@/types/service';

/** One representative photo per category, drawn from the gallery set. */
const CATEGORY_IMAGES: Record<ServiceCategory, { src: string; alt: string }> = {
  Remodeling: { src: '/images/gallery/gallery-10.jpg', alt: 'Remodeled Las Vegas kitchen' },
  Construction: {
    src: '/images/gallery/gallery-08.jpg',
    alt: 'New home construction in Las Vegas',
  },
  Commercial: { src: '/images/gallery/gallery-14.jpg', alt: 'Commercial build-out in Las Vegas' },
  'Bathroom Specialty': {
    src: '/images/gallery/gallery-07.jpg',
    alt: 'Renovated bathroom in Las Vegas',
  },
  Plumbing: { src: '/images/gallery/gallery-11.jpg', alt: 'Plumbing service in Las Vegas' },
  'Restoration & Maintenance': {
    src: '/images/gallery/gallery-09.jpg',
    alt: 'Property maintenance and restoration work',
  },
};

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
              <Image
                className="svc-cat-img"
                src={CATEGORY_IMAGES[group.category].src}
                alt={CATEGORY_IMAGES[group.category].alt}
                width={420}
                height={200}
              />
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
