import { SmartLink } from '@/components/ui/SmartLink';
import {
  footerBrandBlurbHome,
  footerBrandBlurbInner,
  homeFooterColumns,
  innerFooterColumns,
} from '@/data/navigation';
import { siteConfig } from '@/data/site';

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
      </a>
    </div>
  );
}

function BottomBar() {
  return (
    <div className="footer-bottom">
      <span>{siteConfig.copyright}</span>
      <span className="powered-by">
        {siteConfig.poweredBy.prefix} <span>{siteConfig.poweredBy.name}</span>{' '}
        {siteConfig.poweredBy.suffix}
      </span>
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
