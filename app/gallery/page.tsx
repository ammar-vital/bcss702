import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { InnerPage } from '@/components/layout/InnerPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { InnerHero } from '@/components/sections/InnerHero';
import { galleryImages } from '@/data/gallery';
import { galleryPage } from '@/data/pages';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(galleryPage.seo);

export default function GalleryPage() {
  return (
    <InnerPage>
      <InnerHero
        image={galleryPage.heroImage}
        heading={galleryPage.heroHeading}
        subtitle={galleryPage.heroSubtitle}
        minHeight="40vh"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: galleryPage.breadcrumbLabel }]}
      />

      <section>
        <div className="container">
          <div className="gallery-page-grid">
            {galleryImages.map((image, index) => (
              <a
                className="gallery-card"
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                key={image.src}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </a>
            ))}
          </div>
          <div className="gallery-cta">
            <Link href="/contact-us/" className="btn-primary">
              Start Your Project →
            </Link>
          </div>
        </div>
      </section>

      <JsonLd
        json={graph([
          webPageSchema(galleryPage.seo),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: galleryPage.breadcrumbLabel, path: galleryPage.seo.path },
          ]),
        ])}
      />
    </InnerPage>
  );
}
