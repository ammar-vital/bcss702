import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { InnerPage } from '@/components/layout/InnerPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { InnerHero } from '@/components/sections/InnerHero';
import { ServiceContact } from '@/components/sections/ServiceContact';
import { ServiceFaq } from '@/components/sections/ServiceFaq';
import { RichText } from '@/components/ui/RichText';
import { blogPosts, getBlogPost } from '@/data/blog';
import { siteConfig } from '@/data/site';
import { blogPostingSchema, breadcrumbSchema, faqPageSchema, pageGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata(post.seo);
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <InnerPage>
      <InnerHero
        variant="blog"
        image={post.heroImage}
        badge={post.heroBadge}
        heading={post.title}
        subtitle={post.heroSubtitle}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog/' },
          { label: post.heroBadge },
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
              <p className="blog-meta">Published {post.date}</p>
              <RichText blocks={post.body} />
              <p className="blog-back">
                <Link href="/blog/">&larr; Back to all articles</Link>
              </p>
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
                <ul className="side-trust">
                  <li>Licensed &amp; Insured &middot; {siteConfig.licenseShort}</li>
                  <li>Serving Las Vegas since {siteConfig.foundingYear}</li>
                  <li>Free, no-obligation estimates</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ServiceFaq items={post.faqs} />

      <ServiceContact
        heading="Ready to Start Your Project?"
        intro="Tell us what you have in mind and we will give you an honest, detailed estimate."
        formSource={`blog-${post.slug}`}
      />

      <JsonLd
        json={pageGraph(post.seo, [
          blogPostingSchema({
            title: post.title,
            description: post.seo.description,
            path: post.seo.path,
            datePublished: post.datePublished,
            image: post.heroImage,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog/' },
            { name: post.heroBadge, path: post.seo.path },
          ]),
          faqPageSchema(post.faqs),
        ])}
      />
    </InnerPage>
  );
}
