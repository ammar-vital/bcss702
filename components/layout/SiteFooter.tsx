import { SmartLink } from '@/components/ui/SmartLink';
import {
  footerBrandBlurbHome,
  footerBrandBlurbInner,
  homeFooterColumns,
  innerFooterColumns,
} from '@/data/navigation';
import { siteConfig } from '@/data/site';

const SOCIAL_ICONS: Record<string, string> = {
  Facebook: 'M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z',
  Instagram:
    'M12 2c2.7 0 3 0 4.1.1 1 0 1.7.2 2.3.5.6.2 1.1.5 1.6 1 .5.5.8 1 1 1.6.3.6.5 1.3.5 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.7-.5 2.3-.2.6-.5 1.1-1 1.6-.5.5-1 .8-1.6 1-.6.3-1.3.5-2.3.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.7-.2-2.3-.5-.6-.2-1.1-.5-1.6-1-.5-.5-.8-1-1-1.6-.3-.6-.5-1.3-.5-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.7.5-2.3.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-1 .6-.3 1.3-.5 2.3-.5C9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zM17.8 6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z',
  LinkedIn:
    'M6.9 8.5H4V20h2.9V8.5zM5.4 4a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4zM20 20v-6.3c0-3.1-1.7-4.6-3.9-4.6-1.8 0-2.6 1-3 1.7V8.5H10V20h2.9v-6.1c0-1.6.3-3.1 2.3-3.1s1.9 1.8 1.9 3.2V20H20z',
  Google:
    'M12 11v2.9h4.1c-.2 1.1-1.4 3.1-4.1 3.1-2.5 0-4.5-2-4.5-4.6S9.5 7.8 12 7.8c1.4 0 2.4.6 2.9 1.1l2-1.9C17.6 5.9 15 4.8 12 4.8 7.6 4.8 4 8.4 4 12.8s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.8 0-.5 0-.9-.1-1.3H12z',
};

function SocialLinks() {
  const items = [
    { label: 'Facebook', href: siteConfig.social.facebook },
    { label: 'Instagram', href: siteConfig.social.instagram },
    { label: 'LinkedIn', href: siteConfig.social.linkedin },
    { label: 'Google', href: siteConfig.googleBusinessProfile },
  ];
  return (
    <div className="footer-social" aria-label="Butler's Construction on social media">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Butler's Construction on ${item.label}`}
          title={item.label}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d={SOCIAL_ICONS[item.label]} />
          </svg>
        </a>
      ))}
    </div>
  );
}

function LicenseBlock() {
  return (
    <div className="footer-license">
      {siteConfig.licenses.map((line) => (
        <span key={line}>
          {line}
          <br />
        </span>
      ))}
      {siteConfig.legalName}
      <br />
      {siteConfig.address.single}
      <br />
      <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>{' '}
      <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{' '}
      <a href={siteConfig.googleBusinessProfile} target="_blank" rel="noopener noreferrer">
        Google Business Profile →
      </a>{' '}
      <SmartLink href="/site-map/">Sitemap</SmartLink>
      <SocialLinks />
    </div>
  );
}

function BottomBar() {
  return (
    <div className="footer-bottom">
      <span>{siteConfig.copyright}</span>
    </div>
  );
}

/** Four-column footer used by the homepage (`front-page.php`). */
export function HomeFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-name">{siteConfig.shortName}</div>
            <div className="logo-sub">{siteConfig.brandLine}</div>
            <p>{footerBrandBlurbHome}</p>
            <div className="footer-brand-cta">
              <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
            </div>
          </div>
          {homeFooterColumns.map((column) => (
            <div className="footer-col" key={column.heading}>
              <h2>{column.heading}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <SmartLink href={link.href}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <LicenseBlock />
        <BottomBar />
      </div>
    </footer>
  );
}

/** Three-column footer used by every inner page. */
export function InnerFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-name">{siteConfig.shortName}</div>
            <div className="logo-sub">{siteConfig.brandLine}</div>
            <p>{footerBrandBlurbInner}</p>
          </div>
          {innerFooterColumns.map((column) => (
            <div className="footer-col" key={column.heading}>
              <h2>{column.heading}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <SmartLink href={link.href}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <LicenseBlock />
        <BottomBar />
      </div>
    </footer>
  );
}

/** Licence + copyright only, as the `/services/` index rendered it. */
export function MinimalFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <LicenseBlock />
        <BottomBar />
      </div>
    </footer>
  );
}
