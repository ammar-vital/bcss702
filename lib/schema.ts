import { reviews } from '@/data/home';
import { services } from '@/data/services';
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
    foundingDate: siteConfig.foundingYear,
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
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.googleMapsDirections,
    priceRange: siteConfig.priceRange,
    areaServed: siteConfig.serviceArea.map((name) => ({
      '@type': 'City',
      name,
      containedInPlace: { '@type': 'State', name: 'Nevada' },
    })),
    openingHours: siteConfig.hours.schema,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    makesOffer: {
      '@type': 'OfferCatalog',
      name: 'Construction & Remodeling Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          url: absoluteUrl(service.seo.path),
        },
      })),
    },
    review: reviews.map((entry) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: entry.author },
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      reviewBody: entry.quote,
    })),
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

/** A Question/Answer pair rendered in a page's FAQ block and its FAQPage node. */
export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqPageSchema(entries: FaqEntry[]): JsonObject {
  return {
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

/**
 * One consolidated graph per page, led by the Organization (GeneralContractor)
 * node so search engines and inspectors read the business entity first, then
 * the WebSite, the page itself, and any page-specific nodes (breadcrumb,
 * service, FAQ). Replaces the old split of an org graph in the layout and a
 * separate page graph led by the thin WebPage node.
 */
export function pageGraph(seo: PageSeo, extraNodes: JsonObject[] = []): string {
  return graph([organizationSchema(), websiteSchema(), webPageSchema(seo), ...extraNodes]);
}
