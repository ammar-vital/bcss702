import type { Metadata } from 'next';
import Link from 'next/link';

import { InnerPage } from '@/components/layout/InnerPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { InnerHero } from '@/components/sections/InnerHero';
import { RichText } from '@/components/ui/RichText';
import { aboutPage } from '@/data/pages';
import { siteConfig } from '@/data/site';
import { breadcrumbSchema, pageGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(aboutPage.seo);

export default function AboutUsPage() {
  return (
    <InnerPage>
      <InnerHero
        image={aboutPage.heroImage}
        badge={aboutPage.heroBadge}
        heading={aboutPage.heroHeading}
        subtitle={aboutPage.heroSubtitle}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: aboutPage.breadcrumbLabel }]}
      >
        <div className="hero-btns">
          <Link href="/contact-us/" className="btn-primary">
            Get in Touch
          </Link>
          <a href={siteConfig.phone.href} className="btn-secondary">
            {siteConfig.phone.display}
          </a>
        </div>
      </InnerHero>

      <section>
        <div className="container">
          <div className="content-layout">
            <div className="content-main">
              <RichText blocks={aboutPage.body} />
            </div>
            <aside>
              <div className="side-card">
                <h2>Ready to Talk?</h2>
                <p>Reach out about your project. We respond within 24 hours.</p>
                <Link href="/contact-us/" className="btn-primary">
                  Contact Us
                </Link>
                <span className="side-phone">
                  or call <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <JsonLd
        json={pageGraph(aboutPage.seo, [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: aboutPage.breadcrumbLabel, path: aboutPage.seo.path },
          ]),
        ])}
      />
    </InnerPage>
  );
}
