import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** True for anything the Next.js router should not handle (tel:, mailto:, absolute URLs). */
function isExternalHref(href: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
}

/**
 * Renders a client-routed `next/link` for internal paths and a plain anchor for
 * `tel:`, `mailto:`, in-page hashes and absolute URLs.
 */
export function SmartLink({ href, children, ...rest }: Props) {
  if (isExternalHref(href) || href.startsWith('#')) {
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
