/**
 * Homepage content migrated from `front-page.php`. Every string here is the
 * literal copy the WordPress template rendered (the ACF fields it read were
 * never populated, so the template fallbacks were always what shipped).
 */
import { siteConfig } from '@/data/site';
import type { FaqEntry } from '@/lib/schema';

export const homeHero = {
  backgroundImage: '/images/gallery/gallery-02.jpg',
  badge: 'Licensed & Insured · NV Lic. #74507',
  headingHighlight: 'Las Vegas General Contractor',
  headingRest: 'Building One Project at a Time',
  subtitle:
    "From kitchen remodels to full commercial build-outs Butler's Construction brings 15+ years of craftsmanship, integrity, and precision to every project across the Las Vegas Valley.",
  formSource: 'Homepage Hero Form',
} as const;

export const heroFormServices = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Commercial Remodeling',
  'New Construction',
  'General Contracting',
  'Plumbing Services',
  'Property Maintenance',
  'Other',
] as const;

export const contactFormServices = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Commercial Remodeling',
  'New Home Construction',
  'General Contracting',
  'Plumbing Services',
  'Property Maintenance',
  'Water Damage Restoration',
  'Design-Build',
  'Other',
] as const;

export interface TrustItem {
  icon: 'trophy' | 'star' | 'shield' | 'clipboard' | 'tools';
  label: string;
  detail: string;
}

export const trustItems: TrustItem[] = [
  { icon: 'trophy', label: '15+ Years Experience', detail: 'Serving Las Vegas since 2009' },
  { icon: 'star', label: '5-Star Rated', detail: 'Google & Yelp verified reviews' },
  { icon: 'shield', label: 'Fully Licensed & Insured', detail: 'Nevada General Contractor' },
  { icon: 'clipboard', label: 'Free Estimates', detail: 'No obligation consultations' },
  { icon: 'tools', label: 'Complete Property Solutions', detail: 'Residential & commercial' },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 17, suffix: '+', label: 'Service Categories' },
];

export const aboutSection = {
  tag: "About Butler's",
  headingLine1: 'Building Las Vegas',
  headingLine2: 'Since 2009',
  paragraphs: [
    "Butler's Construction & Service Solutions has served Las Vegas homeowners and businesses for more than 15 years. We are a licensed Nevada general contractor, which means one team and one point of contact handles your whole project, from the first estimate to the final walkthrough.",
    'From kitchen and bathroom remodels to new construction, plumbing, and full commercial build-outs, we combine precision and dependability to deliver results that hold up. Your budget, your family, and your vision are part of the process from start to finish.',
  ],
  features: [
    'Licensed & Insured',
    'On-Time Delivery',
    'Transparent Pricing',
    'Quality Materials',
    'Commercial & Residential',
    'One Point of Contact',
  ],
  cta: { label: 'Get a Free Quote →', href: '#contact' },
  badge: { value: '15+', lines: ['Years in', 'Las Vegas'] },
  mainImage: {
    src: '/images/gallery/gallery-03.jpg',
    alt: "Butler's Construction & Service Solutions team on a Las Vegas job site",
  },
  floatImage: {
    src: '/images/gallery/gallery-06.jpg',
    alt: 'Construction crew working on a Las Vegas remodeling project',
  },
} as const;

export interface ServiceCard {
  href: string;
  image: string;
  imageAlt: string;
  icon: 'kitchen' | 'bath' | 'commercial' | 'construction' | 'plumbing' | 'maintenance';
  name: string;
  description: string;
}

export const featuredServices: ServiceCard[] = [
  {
    href: '/kitchen-remodeling/',
    image: '/images/gallery/gallery-10.jpg',
    imageAlt: "Remodeled kitchen in a Las Vegas home by Butler's Construction",
    icon: 'kitchen',
    name: 'Kitchen Remodeling',
    description:
      "Complete kitchen transformations custom cabinets, countertops, flooring, and full gut-and-rebuild projects. We handle it all so you don't have to.",
  },
  {
    href: '/bathroom-remodeling/',
    image: '/images/gallery/gallery-07.jpg',
    imageAlt: "Modern bathroom remodel in Las Vegas by Butler's Construction",
    icon: 'bath',
    name: 'Bathroom Remodeling',
    description:
      'Shower conversions, walk-in tubs, vanity upgrades, custom tile work, and full bathroom renovations.',
  },
  {
    href: '/commercial-remodeling/',
    image: '/images/gallery/gallery-14.jpg',
    imageAlt: "Commercial remodeling project in Las Vegas by Butler's Construction",
    icon: 'commercial',
    name: 'Commercial Remodeling',
    description:
      'Offices, retail spaces, restaurants, medical facilities we build the environments where business happens.',
  },
  {
    href: '/new-home-construction/',
    image: '/images/gallery/gallery-02.jpg',
    imageAlt: "New home construction in Las Vegas by Butler's Construction",
    icon: 'construction',
    name: 'New Construction',
    description:
      'Custom home builds, room additions, and ground-up commercial construction across the Las Vegas Valley.',
  },
  {
    href: '/water-line-repairs/',
    image: '/images/gallery/gallery-11.jpg',
    imageAlt: "Plumbing service and repair in Las Vegas by Butler's Construction",
    icon: 'plumbing',
    name: 'Plumbing Services',
    description:
      'Water line repairs, drain cleaning, sewer services, water heater installation full plumbing support.',
  },
  {
    href: '/property-maintenance-handyman/',
    image: '/images/gallery/gallery-09.jpg',
    imageAlt: "Property maintenance and handyman work by Butler's Construction",
    icon: 'maintenance',
    name: 'Property Maintenance',
    description:
      'Handyman services, home maintenance, commercial property upkeep we keep your investment in top condition.',
  },
];

export const specialtyLinks = [
  { label: 'Outdoor Living Spaces', href: '/outdoor-living-spaces/' },
  { label: 'Fire & Water Damage Restoration', href: '/fire-smoke-damage-restoration/' },
  { label: 'Accessibility Remodels', href: '/accessibility-remodels/' },
  { label: 'Custom Tile & Stonework', href: '/custom-tile-stonework/' },
  { label: 'Tenant Improvements', href: '/tenant-improvements/' },
  { label: 'Medical Facility Construction', href: '/medical-healthcare-facility-construction/' },
  { label: 'Restaurant Build-Outs', href: '/retail-restaurant-build-outs/' },
  { label: 'Walk-In Bathtubs', href: '/walk-in-bathtub-las-vegas/' },
];

export const reasons = [
  {
    number: '01',
    title: '15+ Years of Proven Experience',
    body: "We've seen every challenge Las Vegas construction can throw at a contractor. That experience means fewer surprises, better solutions, and a smoother process for you.",
  },
  {
    number: '02',
    title: 'Quick Response Time',
    body: 'Kenny and the team are known for being prompt and diligent. We pick up the phone, we show up when we say, and we finish what we start.',
  },
  {
    number: '03',
    title: 'All Under One Roof',
    body: 'From plumbing to tile to full commercial build-outs one contractor, one point of contact, one team that handles everything.',
  },
  {
    number: '04',
    title: 'Workers Who Take Pride',
    body: "Our crew doesn't just complete jobs. They care about the outcome. That's not something you can fake our reviews prove it.",
  },
  {
    number: '05',
    title: 'Transparent Process',
    body: 'Your budget, your family, your vision all part of our process from start to finish. No hidden surprises on the bill.',
  },
  {
    number: '06',
    title: 'Full Residential & Commercial',
    body: "Whether you're a homeowner, property manager, or business owner we've built it before and we'll build it better for you.",
  },
];

export interface GalleryTile {
  src: string;
  alt: string;
  /** Intrinsic pixel size, so the tiles keep their aspect ratio on mobile. */
  width: number;
  height: number;
}

export const homeGallery: GalleryTile[] = [
  {
    src: '/images/gallery/gallery-08.jpg',
    alt: "Completed construction project in Las Vegas by Butler's Construction",
    width: 960,
    height: 720,
  },
  {
    src: '/images/gallery/gallery-15.jpg',
    alt: 'Commercial build-out project in Las Vegas',
    width: 768,
    height: 576,
  },
  {
    src: '/images/gallery/gallery-05.jpg',
    alt: 'Finished bathroom renovation in Las Vegas',
    width: 960,
    height: 720,
  },
  {
    src: '/images/gallery/gallery-04.jpg',
    alt: 'Completed home remodel in Las Vegas',
    width: 960,
    height: 720,
  },
  {
    src: '/images/gallery/gallery-13.jpg',
    alt: 'Commercial construction project in Las Vegas',
    width: 768,
    height: 576,
  },
  {
    src: '/images/gallery/gallery-12.jpg',
    alt: "Finished remodeling work by Butler's Construction",
    width: 720,
    height: 960,
  },
  {
    src: '/images/gallery/gallery-01.jpg',
    alt: 'Construction and remodeling project in Las Vegas',
    width: 720,
    height: 960,
  },
  {
    src: '/images/kitchen-remodel.jpg',
    alt: "Custom kitchen remodel in Las Vegas by Butler's Construction",
    width: 1200,
    height: 901,
  },
];

export interface Review {
  quote: string;
  author: string;
  platform: string;
}

export const reviews: Review[] = [
  {
    quote:
      "I use Butler's Construction through my property management and they are so amazing. Kenny and Dahlia both are very prompt and work so diligently. I would recommend Butler's to anyone needing services they offer.",
    author: 'Jason Bechtel',
    platform: '★ Google Review Las Vegas, NV',
  },
  {
    quote:
      'An amazing company with workers who take pride in their work and making customers happy. The quality of work is top-tier and the communication throughout the project was excellent.',
    author: 'Matthew Marsino',
    platform: '★ Google Review Las Vegas, NV',
  },
  {
    quote:
      "Butler's handled our complete kitchen and bathroom remodel and exceeded every expectation. On time, on budget, and the craftsmanship is outstanding. Will use them again for our commercial space.",
    author: 'Gabrielle Baker',
    platform: '★ Yelp Review Las Vegas, NV',
  },
];

export const serviceAreaSection = {
  tag: 'Where We Work',
  heading: 'Serving the Entire Las Vegas Valley',
  intro:
    "Butler's Construction is proud to serve homeowners, property managers, and business owners across Southern Nevada. Our office is at 3255 Pepper Lane, Suite 109A, and we work throughout:",
  cities: siteConfig.serviceArea,
} as const;

export const homeFaqs: FaqEntry[] = [
  {
    question: 'What does a general contractor do?',
    answer:
      'A general contractor manages your entire project from start to finish: planning, permits, scheduling, licensed trades, and the final walkthrough. With Butler’s you get one point of contact for the whole job instead of coordinating separate crews yourself.',
  },
  {
    question: 'Is Butler’s Construction licensed and insured?',
    answer:
      'Yes. We hold Nevada State Contractors Board licenses (General B #74507 and C-1 Plumbing #81481) and carry full insurance, so your project is handled by a licensed Las Vegas contractor.',
  },
  {
    question: 'Do you handle both residential and commercial projects?',
    answer:
      'Yes. We work with homeowners, property managers, and business owners across Las Vegas, from kitchen and bathroom remodels to commercial build-outs and tenant improvements.',
  },
  {
    question: 'Do you offer free estimates?',
    answer: `Yes, every estimate is free and no-obligation. Call ${siteConfig.phone.display} or request a quote online and we respond within 24 hours.`,
  },
  {
    question: 'What areas around Las Vegas do you serve?',
    answer:
      'We serve the entire Las Vegas Valley, including Henderson, North Las Vegas, Summerlin, Paradise, Enterprise, and Spring Valley.',
  },
  {
    question: 'How do I get started on my project?',
    answer:
      'Start with a free consultation. We talk through your project and budget, give you a written estimate, and once you approve we handle the permits, scheduling, and the build all the way through the final walkthrough.',
  },
];
