import { absoluteUrl, siteConfig } from '@/data/site';
import type { PageSeo } from '@/types/seo';

type JsonObject = Record<string, unknown>;

const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/**
 * Organization + WebSite nodes. Rank Math emitted the same pair on every page,
 * typed as HomeAndConstructionBusiness.
 */
export function organizationSchema(): JsonObject {
  return {
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor', 'Organization'],
    '@id': ORGANIZATION_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: `${siteConfig.url}/`,
    telephone: siteConfig.phone.e164,
    email: siteConfig.email,
    logo: `${siteConfig.url}/images/logo.png`,
    image: `${siteConfig.url}/images/gallery/gallery-02.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: siteConfig.serviceArea.map((name) => ({
      '@type': 'City',
      name,
      containedInPlace: { '@type': 'State', name: 'Nevada' },
    })),
    openingHours: siteConfig.hours.schema,
    sameAs: [
      siteConfig.googleBusinessProfile,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
  };
}

export function websiteSchema(): JsonObject {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${siteConfig.url}/`,
    name: siteConfig.name,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-US',
  };
}

export function webPageSchema(seo: PageSeo): JsonObject {
  const url = absoluteUrl(seo.path);
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-US',
    ...(seo.datePublished ? { datePublished: seo.datePublished } : {}),
    ...(seo.dateModified ? { dateModified: seo.dateModified } : {}),
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]): JsonObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

/** A single service offered by the business, matching a `/service-slug/` page. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}): JsonObject {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.name,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: siteConfig.serviceArea.map((name) => ({ '@type': 'City', name })),
    url: absoluteUrl(input.path),
  };
}

export function graph(nodes: JsonObject[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
