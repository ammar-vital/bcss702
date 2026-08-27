import type { MetadataRoute } from 'next';

import {
  aboutPage,
  contactPage,
  galleryPage,
  homePage,
  privacyPage,
  servicesIndexPage,
} from '@/data/pages';
import { blogPosts } from '@/data/blog';
import { services } from '@/data/services';
import { absoluteUrl } from '@/data/site';
import type { PageSeo } from '@/types/seo';

/** Fallback for the pages WordPress never published, so they still carry a date. */
const FALLBACK_MODIFIED = '2026-07-03T20:50:05.000Z';

function entry(seo: PageSeo, priority: number, changeFrequency: 'monthly' | 'yearly') {
  return {
    url: absoluteUrl(seo.path),
    lastModified: new Date(seo.dateModified ?? seo.datePublished ?? FALLBACK_MODIFIED),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry(homePage.seo, 1, 'monthly'),
    entry(servicesIndexPage.seo, 0.9, 'monthly'),
    entry(aboutPage.seo, 0.8, 'monthly'),
    entry(contactPage.seo, 0.8, 'monthly'),
    entry(galleryPage.seo, 0.7, 'monthly'),
    ...services.map((service) => entry(service.seo, 0.8, 'monthly')),
    {
      url: absoluteUrl('/blog/'),
      lastModified: new Date(blogPosts[0]?.datePublished ?? FALLBACK_MODIFIED),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...blogPosts.map((post) => entry(post.seo, 0.7, 'monthly')),
    {
      url: absoluteUrl('/site-map/'),
      lastModified: new Date(FALLBACK_MODIFIED),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    entry(privacyPage.seo, 0.3, 'yearly'),
  ];
}
