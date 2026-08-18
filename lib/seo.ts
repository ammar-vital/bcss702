import type { Metadata } from 'next';

import { absoluteUrl, siteConfig } from '@/data/site';
import type { PageSeo } from '@/types/seo';

/**
 * Builds Next.js metadata from the values Rank Math served on the WordPress
 * site, so titles, descriptions, canonicals and Open Graph stay identical.
 */
export function buildMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.path);

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    robots: seo.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: seo.ogType ?? 'article',
      title: seo.title,
      description: seo.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(seo.dateModified ? { modifiedTime: seo.dateModified } : {}),
      ...(seo.datePublished ? { publishedTime: seo.datePublished } : {}),
      images: [
        {
          url: absoluteUrl('/').replace(/\/$/, '') + '/images/gallery/gallery-02.jpg',
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [absoluteUrl('/').replace(/\/$/, '') + '/images/gallery/gallery-02.jpg'],
    },
  };
}
