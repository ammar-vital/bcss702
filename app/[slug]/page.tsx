import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { InnerPage } from '@/components/layout/InnerPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { CrossLinks } from '@/components/sections/CrossLinks';
import { InnerHero } from '@/components/sections/InnerHero';
import { ServiceContact } from '@/components/sections/ServiceContact';
import { ServiceFaq } from '@/components/sections/ServiceFaq';
import { ServiceProcess } from '@/components/sections/ServiceProcess';
import { RichText } from '@/components/ui/RichText';
import { serviceFaqs } from '@/data/faq';
import { siteConfig } from '@/data/site';
import { getService, serviceSlugs } from '@/data/services';
import { breadcrumbSchema, faqPageSchema, pageGraph, serviceSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

/** Only the 37 known service slugs render; anything else is a real 404. */
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata(service.seo);
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const faqs = serviceFaqs(service.name);

  return (
    <InnerPage>
      <InnerHero
        image={service.heroImage}
        badge={service.heroBadge}
        heading={service.heroHeading}
        subtitle={service.heroSubtitle}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services/' },
          { label: service.breadcrumbLabel },
        ]}
      >
        <div className="hero-btns">
          <a href="#quote" className="btn-primary">
            Get a Free Quote
          </a>
          <a href={siteConfig.phone.href} className="btn-secondary">
            {siteConfig.phone.display}
          </a>
        </div>
      </InnerHero>

      <section>
        <div className="container">
          <div className="content-layout">
            <div className="content-main">
              <RichText blocks={service.body} />
            </div>
            <aside>
              <div className="side-card" id="quote">
                <h2>Get a Free Quote</h2>
                <p>Call now or fill out the form below. We respond within 24 hours.</p>
                <a href="#contact-form" className="btn-primary">
                  Request Quote
                </a>
                <span className="side-phone">
                  or call <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ServiceProcess />

      <ServiceFaq items={faqs} />

      <CrossLinks excludeSlug={service.slug} />

      <ServiceContact
        heading={service.contactHeading}
        intro={service.contactIntro}
        formSource={service.formSource}
      />

      <JsonLd
        json={pageGraph(service.seo, [
          serviceSchema({
            name: service.name,
            description: service.seo.description,
            path: service.seo.path,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services/' },
            { name: service.breadcrumbLabel, path: service.seo.path },
          ]),
          faqPageSchema(faqs),
        ])}
      />
    </InnerPage>
  );
}
