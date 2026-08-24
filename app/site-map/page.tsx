import type { Metadata } from 'next';

import { InnerPage } from '@/components/layout/InnerPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { InnerHero } from '@/components/sections/InnerHero';
import { SmartLink } from '@/components/ui/SmartLink';
import {
  aboutPage,
  contactPage,
  galleryPage,
  privacyPage,
  servicesIndexPage,
} from '@/data/pages';
import { services } from '@/data/services';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import type { PageSeo } from '@/types/seo';

const sitemapSeo: PageSeo = {
  title: "Site Map | Butler's Construction",
  description:
    "Browse every page on the Butler's Construction site: all services, company info, gallery, and contact for our licensed Las Vegas general contractor.",
  path: '/site-map/',
};

export const metadata: Metadata = buildMetadata(sitemapSeo);

const mainPages = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: aboutPage.seo.path },
  { label: 'All Services', href: servicesIndexPage.seo.path },
  { label: 'Gallery', href: galleryPage.seo.path },
  { label: 'Contact Us', href: contactPage.seo.path },
  { label: 'Privacy Policy', href: privacyPage.seo.path },
];

export default function SiteMapPage() {
  const byCategory = new Map<string, (typeof services)[number][]>();
  for (const service of services) {
    const list = byCategory.get(service.category) ?? [];
    list.push(service);
    byCategory.set(service.category, list);
  }

  return (
    <InnerPage>
      <InnerHero
        heading="Site Map"
        minHeight="30vh"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Site Map' }]}
      />

      <section>
        <div className="container content-narrow">
          <div className="content-main">
            <p>
              Every page on the Butler&apos;s Construction &amp; Service Solutions website, in one
              place. Looking for a specific service in Las Vegas? Find it below.
            </p>

            <h2>Main Pages</h2>
            <ul>
              {mainPages.map((page) => (
                <li key={page.href}>
                  <SmartLink href={page.href}>{page.label}</SmartLink>
                </li>
              ))}
            </ul>

            <h2>Services</h2>
            {[...byCategory.entries()].map(([category, list]) => (
              <div key={category}>
                <h3>{category}</h3>
                <ul>
                  {list.map((service) => (
                    <li key={service.slug}>
                      <SmartLink href={service.seo.path}>{service.name}</SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        json={graph([
          webPageSchema(sitemapSeo),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Site Map', path: '/site-map/' },
          ]),
        ])}
      />
    </InnerPage>
  );
}
