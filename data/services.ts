import servicesJson from '@/content/services.json';
import type { Service, ServiceCategory } from '@/types/service';
import type { PageSeo } from '@/types/seo';

/**
 * Five of the 37 service pages were never published in WordPress (their
 * templates existed and every page linked to them, but the pages 404'd), so
 * Rank Math had no metadata for them. Titles and descriptions below follow the
 * exact pattern Rank Math used on the published siblings and are derived from
 * each page's own copy.
 */
const seoFallbacks: Record<string, Pick<PageSeo, 'title' | 'description'>> = {
  'custom-tile-stonework': {
    title: "Custom Tile & Stonework Las Vegas | Butler's Construction",
    description:
      'Custom tile and stonework in Las Vegas, backsplashes, floors, showers, and feature walls installed by a licensed general contractor.',
  },
  'accessibility-remodels': {
    title: "Accessibility Remodels Las Vegas | Butler's Construction",
    description:
      'ADA and aging-in-place remodels in Las Vegas, walk-in tubs, curbless showers, grab bars, and wider doorways from a licensed contractor.',
  },
  'commercial-contractor-las-vegas': {
    title: "Commercial Contractor Las Vegas | Butler's Construction",
    description:
      'Licensed Las Vegas commercial contractor for build-outs, tenant improvements, remodels, and ground-up commercial construction.',
  },
  'water-heater-replacement-las-vegas': {
    title: "Water Heater Replacement Las Vegas | Butler's Construction",
    description:
      'Water heater replacement in Las Vegas, tank and tankless installation by a licensed C-1 plumbing contractor. Free estimates.',
  },
  'emergency-water-heater-repair': {
    title: "Emergency Water Heater Repair | Butler's Construction",
    description:
      'Emergency water heater repair in Las Vegas, fast diagnosis and repair of leaks, pilot failures, and no-hot-water calls.',
  },
};

/**
 * Rank Math served the sewer-line description on the shower & tub page, a
 * copy/paste slip that left two pages sharing one off-topic description. The
 * replacement below is written from that page's own copy. SEO_MIGRATION.md
 * records the original value.
 */
const seoCorrections: Record<string, Pick<PageSeo, 'description'>> = {
  'shower-tub-conversions': {
    description:
      'Tub-to-shower and shower-to-tub conversions in Las Vegas, design guidance, plumbing updates, and seamless installation by a licensed contractor.',
  },
};

interface RawService extends Omit<Service, 'category' | 'seo'> {
  category: string;
  seo: {
    title: string | null;
    description: string | null;
    robots: string | null;
    datePublished?: string | null;
    dateModified?: string | null;
  } | null;
}

function toService(raw: RawService): Service {
  const fallback = seoFallbacks[raw.slug];
  const title = raw.seo?.title ?? fallback?.title;
  const description =
    seoCorrections[raw.slug]?.description ?? raw.seo?.description ?? fallback?.description;

  if (!title || !description) {
    throw new Error(`Missing SEO metadata for service "${raw.slug}"`);
  }

  return {
    ...raw,
    category: raw.category as ServiceCategory,
    seo: {
      title,
      description,
      path: `/${raw.slug}/`,
      ogType: 'article',
      ...(raw.seo?.datePublished ? { datePublished: raw.seo.datePublished } : {}),
      ...(raw.seo?.dateModified ? { dateModified: raw.seo.dateModified } : {}),
    },
  };
}

/** All 37 services, ordered by category then by the theme's own link order. */
export const services: Service[] = (servicesJson as RawService[]).map(toService);

export const serviceSlugs: string[] = services.map((service) => service.slug);

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Category order as it appeared in the theme's cross-link grid. */
export const serviceCategories: ServiceCategory[] = [
  'Remodeling',
  'Construction',
  'Commercial',
  'Bathroom Specialty',
  'Plumbing',
  'Restoration & Maintenance',
];

export interface ServiceGroup {
  category: ServiceCategory;
  services: Service[];
}

/** Group services by category, optionally hiding the page you are already on. */
export function groupServices(excludeSlug?: string): ServiceGroup[] {
  return serviceCategories
    .map((category) => ({
      category,
      services: services.filter(
        (service) => service.category === category && service.slug !== excludeSlug,
      ),
    }))
    .filter((group) => group.services.length > 0);
}

/** Alphabetical listing used by the /services/ index, matching the old grid. */
export const servicesAlphabetical: Service[] = [...services].sort((a, b) =>
  a.name.localeCompare(b.name, 'en'),
);
