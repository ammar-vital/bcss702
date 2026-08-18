import { siteConfig } from '@/data/site';

export function CtaBand() {
  return (
    <div className="cta-band">
      <div className="cta-inner">
        <div className="cta-text">
          <h2>Ready to Start Your Project?</h2>
          <p>
            Get a free consultation and quote from your licensed and insured Las Vegas general
            contractor. No pressure, no obligation.
          </p>
        </div>
        <div className="cta-actions">
          <a href="#contact" className="btn-white">
            Get Free Quote
          </a>
          <a href={siteConfig.phone.href} className="btn-outline-white">
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
