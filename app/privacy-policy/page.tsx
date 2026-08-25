import type { Metadata } from 'next';

import { InnerPage } from '@/components/layout/InnerPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { InnerHero } from '@/components/sections/InnerHero';
import { RichText } from '@/components/ui/RichText';
import { privacyPage } from '@/data/pages';
import { breadcrumbSchema, pageGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(privacyPage.seo);

export default function PrivacyPolicyPage() {
  return (
    <InnerPage>
      <InnerHero
        heading={privacyPage.heroHeading}
        minHeight="30vh"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: privacyPage.breadcrumbLabel }]}
      />

      <section>
        <div className="container content-narrow">
          <div className="content-main">
            <RichText blocks={privacyPage.body} />
          </div>
        </div>
      </section>

      <JsonLd
        json={pageGraph(privacyPage.seo, [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: privacyPage.breadcrumbLabel, path: privacyPage.seo.path },
          ]),
        ])}
      />
    </InnerPage>
  );
}
