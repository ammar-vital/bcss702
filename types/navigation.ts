export interface NavLink {
  label: string;
  href: string;
  /** Renders as the red "Free Quote" pill in the primary nav. */
  cta?: boolean;
}

export interface MegaMenuColumn {
  heading: string;
  links: NavLink[];
}

export interface MegaMenuItem {
  label: string;
  /** Where the top-level item points when it is followed rather than opened. */
  href: string;
  columns: MegaMenuColumn[];
  footerLink: NavLink;
}

export type PrimaryNavItem = NavLink | (MegaMenuItem & { megaMenu: true });

export function isMegaMenuItem(item: PrimaryNavItem): item is MegaMenuItem & { megaMenu: true } {
  return 'megaMenu' in item;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}
