import type { FooterColumn, MegaMenuItem, PrimaryNavItem } from '@/types/navigation';
import { siteConfig } from './site';

/**
 * The WordPress install had no menu assigned to the "Primary Menu" location,
 * so `bcss702_primary_menu()` always rendered the hard-coded mega menu from
 * `template-parts/nav-fallback-home.php`. That structure is reproduced here.
 */
export const servicesMegaMenu: MegaMenuItem = {
  label: 'Services',
  href: '#services',
  columns: [
    {
      heading: 'Remodeling',
      links: [
        { label: 'Kitchen Remodeling', href: '/kitchen-remodeling/' },
        { label: 'Bathroom Remodeling', href: '/bathroom-remodeling/' },
        { label: 'Home Remodeling', href: '/home-remodeling/' },
        { label: 'Commercial Remodeling', href: '/commercial-remodeling/' },
        { label: 'Room Additions', href: '/room-additions-las-vegas/' },
        { label: 'Outdoor Living', href: '/outdoor-living-spaces/' },
      ],
    },
    {
      heading: 'Construction',
      links: [
        { label: 'General Contracting', href: '/general-contracting/' },
        { label: 'New Home Construction', href: '/new-home-construction/' },
        { label: 'Custom Home Builders', href: '/custom-home-builders-las-vegas/' },
        { label: 'Design-Build', href: '/design-build/' },
        { label: 'Countertop Installation', href: '/countertop-installation/' },
        { label: 'Kitchen Flooring', href: '/kitchen-flooring/' },
      ],
    },
    {
      heading: 'Commercial',
      links: [
        { label: 'Tenant Improvements', href: '/tenant-improvements/' },
        { label: 'Office Build-Outs', href: '/office-build-outs/' },
        { label: 'Retail & Restaurant', href: '/retail-restaurant-build-outs/' },
        { label: 'Medical Facility', href: '/medical-healthcare-facility-construction/' },
        { label: 'Commercial Maintenance', href: '/commercial-maintenance/' },
        { label: 'Property Maintenance', href: '/property-maintenance-handyman/' },
      ],
    },
    {
      heading: 'Bathroom Specialty',
      links: [
        { label: 'Shower & Tub Conversions', href: '/shower-tub-conversions/' },
        { label: 'Walk-In Bathtubs', href: '/walk-in-bathtub-las-vegas/' },
        { label: 'Vanity & Cabinet Install', href: '/vanity-cabinet-installation/' },
        { label: 'Toilet Repair', href: '/toilet-repair-las-vegas/' },
      ],
    },
    {
      heading: 'Plumbing',
      links: [
        { label: 'Plumbing Services', href: '/plumbing-services/' },
        { label: 'Water Line Repairs', href: '/water-line-repairs/' },
        { label: 'Drain Cleaning', href: '/drain-cleaning/' },
        { label: 'Sewer Line Services', href: '/sewer-line-services/' },
        { label: 'Leak Detection', href: '/leak-detection/' },
        { label: 'Water Heater Services', href: '/water-heater-services/' },
      ],
    },
    {
      heading: 'Restoration',
      links: [
        { label: 'Water Damage Restoration', href: '/water-damage-restoration/' },
        { label: 'Fire & Smoke Damage', href: '/fire-smoke-damage-restoration/' },
        { label: 'Handyman Services', href: '/handyman-services/' },
        { label: 'Home Maintenance', href: '/home-maintenance/' },
      ],
    },
  ],
  footerLink: { label: 'View All 37 Services →', href: '/services/' },
};

export const primaryNavigation: PrimaryNavItem[] = [
  { ...servicesMegaMenu, megaMenu: true },
  { label: 'About', href: '/about-us/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact-us/' },
  { label: 'Free Quote', href: siteConfig.phone.href, cta: true },
];

/** Four-column footer used by the homepage. */
export const homeFooterColumns: FooterColumn[] = [
  {
    heading: 'Services',
    links: [
      { label: 'Kitchen Remodeling', href: '/kitchen-remodeling/' },
      { label: 'Bathroom Remodeling', href: '/bathroom-remodeling/' },
      { label: 'Commercial Remodeling', href: '/commercial-remodeling/' },
      { label: 'New Home Construction', href: '/new-home-construction/' },
      { label: 'General Contracting', href: '/general-contracting/' },
      { label: 'Plumbing Services', href: '/plumbing-services/' },
      { label: 'All 37 Services →', href: '/services/' },
    ],
  },
  {
    heading: 'Specialties',
    links: [
      { label: 'Custom Home Builders', href: '/custom-home-builders-las-vegas/' },
      { label: 'Walk-In Bathtubs', href: '/walk-in-bathtub-las-vegas/' },
      { label: 'Accessibility Remodels', href: '/accessibility-remodels/' },
      { label: 'Fire & Smoke Damage', href: '/fire-smoke-damage-restoration/' },
      { label: 'Water Damage Restoration', href: '/water-damage-restoration/' },
      { label: 'Shower & Tub Conversions', href: '/shower-tub-conversions/' },
      { label: 'Custom Tile & Stonework', href: '/custom-tile-stonework/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/#about' },
      { label: 'Gallery', href: '/gallery/' },
      { label: 'Reviews', href: '/#reviews' },
      { label: 'Contact', href: '/contact-us/' },
      { label: 'Privacy Policy', href: '/privacy-policy/' },
    ],
  },
];

/** Three-column footer used by every inner page. */
export const innerFooterColumns: FooterColumn[] = [
  {
    heading: 'Popular Services',
    links: [
      { label: 'Kitchen Remodeling', href: '/kitchen-remodeling/' },
      { label: 'Bathroom Remodeling', href: '/bathroom-remodeling/' },
      { label: 'Commercial Remodeling', href: '/commercial-remodeling/' },
      { label: 'New Home Construction', href: '/new-home-construction/' },
      { label: 'Plumbing Services', href: '/plumbing-services/' },
      { label: 'All Services →', href: '/services/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about-us/' },
      { label: 'Gallery', href: '/gallery/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact Us', href: '/contact-us/' },
      { label: 'Privacy Policy', href: '/privacy-policy/' },
    ],
  },
];

export const footerBrandBlurbHome =
  'Your budget, your family, and your vision all part of the design process from start to finish. Las Vegas’s trusted general contractor for residential and commercial projects.';

export const footerBrandBlurbInner =
  'Your budget, your family, and your vision all part of the process from start to finish. Las Vegas’s trusted general contractor for residential and commercial projects.';
