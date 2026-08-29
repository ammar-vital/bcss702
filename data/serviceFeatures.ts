import type { ServiceFeature } from '@/types/service';

/**
 * "What's Included" scope cards, shown high on each service page so visitors
 * see the full scope at a glance instead of reading through paragraphs.
 *
 * `defaultFeatures` is a general-contractor set that applies to any service and
 * renders wherever a slug has no bespoke list yet. Add slug-specific entries to
 * `serviceFeatures` to override it (start with the flagship services).
 */
export const defaultFeatures: ServiceFeature[] = [
  { title: 'Licensed & Permitted', detail: 'NV licensed general contractor. We pull the permits your project needs.' },
  { title: 'Written, Itemized Quotes', detail: 'Clear scope and pricing up front, with no hidden costs or surprises.' },
  { title: 'In-House Crews', detail: 'Our own trained crews on every job, not rotating day-labor subs.' },
  { title: 'Built to Code', detail: 'Work that is inspected and passes, done right the first time.' },
  { title: 'On-Schedule Delivery', detail: 'A real start date and a timeline you can actually plan around.' },
  { title: 'Clean, Finished Result', detail: 'We protect your space and leave it better than we found it.' },
];

export const serviceFeatures: Record<string, ServiceFeature[]> = {
  'kitchen-remodeling': [
    { title: 'Custom Cabinetry', detail: 'Semi-custom to fully custom cabinets with soft-close, built for your layout.' },
    { title: 'Countertops', detail: 'Quartz, granite, and solid-surface tops, templated and installed in-house.' },
    { title: 'Flooring & Tile', detail: 'Tile, luxury vinyl, and hardwood that stand up to a busy kitchen.' },
    { title: 'Lighting & Electrical', detail: 'Recessed, pendant, and under-cabinet lighting, wired to code.' },
    { title: 'Islands & Layouts', detail: 'Open-concept redesigns, islands, and a smarter kitchen work triangle.' },
    { title: 'Sink, Faucet & Appliances', detail: 'Plumbing and appliance hookups handled by our own licensed crew.' },
  ],
};

export function getServiceFeatures(slug: string): ServiceFeature[] {
  return serviceFeatures[slug] ?? defaultFeatures;
}
