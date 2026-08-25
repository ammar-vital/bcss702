import type { Metadata } from 'next';

import { QuoteForm } from '@/components/forms/QuoteForm';
import { InnerPage } from '@/components/layout/InnerPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { ContactDetails, contactPageItems } from '@/components/sections/ContactDetails';
import { InnerHero } from '@/components/sections/InnerHero';
import { contactFormServiceOptions, contactPage } from '@/data/pages';
import { siteConfig } from '@/data/site';
import { breadcrumbSchema, pageGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(contactPage.seo);

export default function ContactUsPage() {
  return (
    <InnerPage>
      <InnerHero
        image={contactPage.heroImage}
        badge={contactPage.heroBadge}
        heading={contactPage.heroHeading}
        subtitle={contactPage.heroSubtitle}
        minHeight="42vh"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: contactPage.breadcrumbLabel }]}
      />

      <section className="contact" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="contact-inner">
            <div className="contact-info">
              <div className="contact-eyebrow">Contact Details</div>
              <h2>
                Let&rsquo;s Build
                <br />
                Something Together
              </h2>
              <p>Three ways to reach us. Whichever works best for you.</p>
              <ContactDetails items={contactPageItems} emojiIcons />
            </div>
            <QuoteForm
              source={contactPage.formSource}
              heading="Send Us a Message"
              serviceOptions={contactFormServiceOptions}
              submitLabel="Send Message It's Free"
              textareaRows={5}
              textareaPlaceholder="Tell us about your project location, timeline, budget range, any special requirements..."
            />
          </div>
        </div>
      </section>

      <section className="map-section">
        <iframe
          src={siteConfig.googleMapsEmbed}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Butler's Construction office location Google Maps"
        />
        <div className="map-directions">
          <a href={siteConfig.googleMapsDirections} target="_blank" rel="noopener noreferrer">
            📍 Get Directions to Our Office →
          </a>
        </div>
      </section>

      <JsonLd
        json={pageGraph(contactPage.seo, [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: contactPage.breadcrumbLabel, path: contactPage.seo.path },
          ]),
        ])}
      />
    </InnerPage>
  );
}
