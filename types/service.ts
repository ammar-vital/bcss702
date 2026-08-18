import type { ContentBlock } from './content';
import type { PageSeo } from './seo';

/** The six groupings the WordPress theme used in its mega menu and cross-link grid. */
export type ServiceCategory =
  | 'Remodeling'
  | 'Construction'
  | 'Commercial'
  | 'Bathroom Specialty'
  | 'Plumbing'
  | 'Restoration & Maintenance';

export interface Service {
  /** URL segment; the page lives at `/{slug}/`. */
  slug: string;
  /** Short name used in menus, cards and cross-links. */
  name: string;
  category: ServiceCategory;
  heroImage: string;
  heroBadge: string;
  heroHeading: string;
  heroSubtitle: string;
  breadcrumbLabel: string;
  /** Hidden `Source` value submitted with the page's quote form. */
  formSource: string;
  contactHeading: string;
  contactIntro: string;
  body: ContentBlock[];
  seo: PageSeo;
}
