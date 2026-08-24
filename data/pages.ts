import pagesJson from '@/content/pages.json';
import type { ContentBlock } from '@/types/content';
import type { PageSeo } from '@/types/seo';

interface RawPage {
  heroImage: string | null;
  heroBadge: string | null;
  heroHeading: string | null;
  heroSubtitle: string | null;
  breadcrumbLabel: string | null;
  formSource: string | null;
  body: ContentBlock[];
  seo: {
    title: string | null;
    description: string | null;
    robots: string | null;
    datePublished?: string | null;
    dateModified?: string | null;
  };
}

const raw = pagesJson as unknown as Record<string, RawPage>;

function page(key: string): RawPage {
  const value = raw[key];
  if (!value) throw new Error(`Missing migrated content for page "${key}"`);
  return value;
}

function seo(key: string, path: string, overrides: Partial<PageSeo> = {}): PageSeo {
  const source = page(key).seo;
  const title = overrides.title ?? source.title;
  const description = overrides.description ?? source.description;
  if (!title || !description) throw new Error(`Missing SEO metadata for page "${key}"`);
  return {
    title,
    description,
    path,
    ogType: 'article',
    ...(source.datePublished ? { datePublished: source.datePublished } : {}),
    ...(source.dateModified ? { dateModified: source.dateModified } : {}),
    ...overrides,
  };
}

export const homePage = {
  seo: seo('home', '/', { ogType: 'website' }),
};

export const aboutPage = {
  heroImage: page('about-us').heroImage!,
  heroBadge: page('about-us').heroBadge!,
  heroHeading: page('about-us').heroHeading!,
  heroSubtitle: page('about-us').heroSubtitle!,
  breadcrumbLabel: page('about-us').breadcrumbLabel!,
  body: page('about-us').body,
  seo: seo('about-us', '/about-us/'),
};

export const galleryPage = {
  heroImage: page('gallery').heroImage!,
  heroHeading: page('gallery').heroHeading!,
  heroSubtitle: page('gallery').heroSubtitle!,
  breadcrumbLabel: page('gallery').breadcrumbLabel!,
  seo: seo('gallery', '/gallery/'),
};

export const contactPage = {
  heroImage: page('contact-us').heroImage!,
  heroBadge: page('contact-us').heroBadge!,
  heroHeading: page('contact-us').heroHeading!,
  heroSubtitle: page('contact-us').heroSubtitle!,
  breadcrumbLabel: page('contact-us').breadcrumbLabel!,
  formSource: page('contact-us').formSource!,
  seo: seo('contact-us', '/contact-us/'),
};

export const privacyPage = {
  heroHeading: page('privacy-policy').heroHeading!,
  breadcrumbLabel: page('privacy-policy').breadcrumbLabel!,
  body: page('privacy-policy').body,
  seo: seo('privacy-policy', '/privacy-policy/', {
    // WordPress never published this page, so Rank Math had no values for it.
    title: "Privacy Policy | Butler's Construction",
    description:
      "How Butler's Construction & Service Solutions collects, uses, and protects the information you share through this website.",
  }),
};

export const servicesIndexPage = {
  heroHeading: page('services').heroHeading!,
  intro:
    "Complete property solutions from Las Vegas's licensed general contractor. 37 services under one roof. Residential, commercial, plumbing, and property maintenance.",
  seo: seo('services', '/services/', {
    // Rank Math had no custom title here, so WordPress fell back to the
    // placeholder site name ("Services - bcs7022"). Replaced with a title
    // matching the pattern used by every other page.
    title: "All Services | Butler's Construction",
    description:
      "Butler's Construction offers 37 Las Vegas services: remodeling, new construction, commercial build-outs, plumbing, restoration, and property maintenance.",
  }),
};

export const contactFormServiceOptions = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Home Remodeling',
  'Commercial Remodeling',
  'Commercial Contractor',
  'New Home Construction',
  'Custom Home Building',
  'Design-Build',
  'Tenant Improvements',
  'Plumbing Services',
  'Water Damage Restoration',
  'Fire & Smoke Damage Restoration',
  'Handyman / Property Maintenance',
  'Other',
] as const;
