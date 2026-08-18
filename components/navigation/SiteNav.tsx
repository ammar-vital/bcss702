'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { primaryNavigation } from '@/data/navigation';
import { siteConfig } from '@/data/site';
import { isMegaMenuItem } from '@/types/navigation';
import { SmartLink } from '@/components/ui/SmartLink';

const MOBILE_QUERY = '(max-width: 900px)';

/**
 * Sticky header with the services mega menu and the slide-in mobile panel.
 * Replaces `template-parts/site-nav.php` and its inline jQuery-free script.
 */
export function SiteNav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const syncNavBottom = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    // The panel is anchored to <nav>; its height is the viewport minus wherever
    // the nav currently sits (the top bar is on screen until the page scrolls).
    nav.style.setProperty('--nav-bottom', `${Math.round(nav.getBoundingClientRect().bottom)}px`);
  }, []);

  const setPanelOpen = useCallback(
    (next: boolean) => {
      if (next) syncNavBottom();
      setOpen(next);
      if (!next) setDropdownOpen(false);
    },
    [syncNavBottom],
  );

  useEffect(() => {
    document.body.classList.toggle('nav-locked', open);
    return () => document.body.classList.remove('nav-locked');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => syncNavBottom();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanelOpen(false);
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setPanelOpen, syncNavBottom]);

  const isMobile = () =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;

  /** On mobile the "Services" button expands the panel instead of navigating. */
  const onDropdownClick = () => {
    if (isMobile()) {
      setDropdownOpen((value) => !value);
      return;
    }
    setPanelOpen(false);
  };

  return (
    <nav ref={navRef} className={`site-nav${open ? ' nav-open' : ''}`} aria-label="Primary">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <Image
            src="/images/logo.png"
            alt="Butler's Construction Logo"
            width={176}
            height={44}
            priority
            style={{ height: 44, width: 'auto' }}
          />
          <span className="logo-text">
            <span className="logo-name">{siteConfig.shortName}</span>
            <span className="logo-sub">{siteConfig.brandLine}</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="primary-nav-links"
          onClick={() => setPanelOpen(!open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <ul className="nav-links" id="primary-nav-links">
          {primaryNavigation.map((item) => {
            if (isMegaMenuItem(item)) {
              return (
                <li
                  key={item.label}
                  className={`has-dropdown${dropdownOpen ? ' is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="dropdown-trigger"
                    aria-expanded={dropdownOpen}
                    onClick={onDropdownClick}
                  >
                    {item.label}
                  </button>
                  <div className="mega-dropdown">
                    {item.columns.map((column) => (
                      <div className="mega-col" key={column.heading}>
                        <div className="mega-cat">{column.heading}</div>
                        {column.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setPanelOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <div className="mega-footer">
                      <Link href={item.footerLink.href} onClick={() => setPanelOpen(false)}>
                        {item.footerLink.label}
                      </Link>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <SmartLink
                  href={item.href}
                  className={item.cta ? 'nav-cta' : undefined}
                  onClick={() => setPanelOpen(false)}
                >
                  {item.label}
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
