/**
 * Single source of truth for the business details that the WordPress theme
 * repeated across every template (top bar, contact blocks, footer, schema).
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bcss702.com';

/** Normalised origin with no trailing slash, e.g. `https://bcss702.com`. */
export const SITE_URL = rawSiteUrl.replace(/\/+$/, '');

export const siteConfig = {
  name: "Butler's Construction & Service Solutions",
  shortName: "Butler's Construction",
  legalName: "Butler's Construction and Service Solutions, LLC",
  brandLine: '& Service Solutions',
  url: SITE_URL,
  description:
    "Butler's Construction is a licensed Las Vegas general contractor for kitchen & bathroom remodeling, new home construction, plumbing, and commercial projects.",
  locale: 'en_US',
  themeColor: '#C0392B',
  googleSiteVerification: 'WH1b1JHHzKGwt4epsqthoYVHUcxg1W38tq7EDZFYs4E',

  phone: {
    display: '(702) 575-0781',
    href: 'tel:+17025750781',
    e164: '+1-702-575-0781',
  },
  email: 'info@bcss702.com',

  address: {
    street: '3255 Pepper Lane, Suite 109A',
    locality: 'Las Vegas',
    region: 'NV',
    postalCode: '89120',
    country: 'US',
    /** Two-line form used inside the contact cards. */
    lines: ['3255 Pepper Lane, Suite 109A', 'Las Vegas, NV 89120'],
    single: '3255 Pepper Lane, Suite 109A Las Vegas, NV 89120',
  },

  hours: {
    summary: 'Mon–Fri: 7AM–6PM | Sat: 8AM–4PM',
    lines: ['Mon–Fri: 7AM–6PM', 'Saturday: 8AM–4PM', 'Sunday: Closed'],
    /** schema.org openingHours strings. */
    schema: ['Mo-Fr 07:00-18:00', 'Sa 08:00-16:00'],
  },

  googleBusinessProfile: 'https://share.google/RlTXsX9Mf2oKONxKG',
  googleMapsEmbed:
    'https://maps.google.com/maps?q=3255+Pepper+Lane+Suite+109A+Las+Vegas+NV+89120&output=embed',
  googleMapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=3255+Pepper+Lane+Suite+109A+Las+Vegas+NV+89120',

  licenses: [
    'General B Nevada State Contractors Board License #74507 bid limit $1,000,000',
    'C-1 Plumbing Nevada State Contractors Board License #81481 bid limit $10,000',
  ],

  serviceArea: [
    'Las Vegas',
    'Henderson',
    'North Las Vegas',
    'Summerlin',
    'Paradise',
    'Enterprise',
    'Spring Valley',
  ],

  copyright: "© 2026 Butler's Construction & Service Solutions, LLC. All rights reserved.",
  poweredBy: { prefix: 'Optimized by', name: 'The Voice of Cash', suffix: 'AI Platform' },
} as const;

/** Build an absolute URL for canonicals, Open Graph and the sitemap. */
export function absoluteUrl(path: string): string {
  if (path === '/') return `${SITE_URL}/`;
  const clean = `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return `${SITE_URL}${clean}`;
}
