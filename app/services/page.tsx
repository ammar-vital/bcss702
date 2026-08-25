import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { MinimalFooter } from '@/components/layout/SiteFooter';
import { TopBar } from '@/components/layout/TopBar';
import { SiteNav } from '@/components/navigation/SiteNav';
import { JsonLd } from '@/components/seo/JsonLd';
import { servicesIndexPage } from '@/data/pages';
import { servicesAlphabetical } from '@/data/services';
import { absoluteUrl } from '@/data/site';
import { breadcrumbSchema, pageGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(servicesIndexPage.seo);

export default function ServicesIndexPage() {
  return (
    <div className="page-services">
      <TopBar variant="services" />
      <SiteNav />
      <main id="main">
        <header className="svc-hero">
          <h1>{servicesIndexPage.heroHeading}</h1>
          <p>{servicesIndexPage.intro}</p>
        </header>
        <div className="svc-container">
          <div className="svc-grid">
            {servicesAlphabetical.map((service, index) => (
              <Link className="svc-card" href={`/${service.slug}/`} key={service.slug}>
                <div className="svc-card-media">
                  <Image
                    src={service.heroImage}
                    alt={service.name}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading={index < 8 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="svc-body">
                  <div className="svc-name">{service.name}</div>
                  <div className="svc-arrow" aria-hidden="true">
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <MinimalFooter />
      <JsonLd
        json={pageGraph(servicesIndexPage.seo, [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services/' },
          ]),
          {
            '@type': 'ItemList',
            '@id': `${absoluteUrl('/services/')}#services`,
            name: 'Services',
            numberOfItems: servicesAlphabetical.length,
            itemListElement: servicesAlphabetical.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: service.name,
              url: absoluteUrl(`/${service.slug}/`),
            })),
          },
        ])}
      />
    </div>
  );
}
