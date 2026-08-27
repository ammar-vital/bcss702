import type { Metadata } from 'next';
import Link from 'next/link';

import { InnerPage } from '@/components/layout/InnerPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { InnerHero } from '@/components/sections/InnerHero';
import { blogPosts } from '@/data/blog';
import { absoluteUrl } from '@/data/site';
import { breadcrumbSchema, pageGraph } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import type { PageSeo } from '@/types/seo';

const blogSeo: PageSeo = {
  title: "Blog | Butler's Construction Las Vegas",
  description:
    'Remodeling and construction guides for Las Vegas homeowners: kitchen and bath costs, outdoor living, and how to hire the right contractor.',
  path: '/blog/',
  ogType: 'website',
};

export const metadata: Metadata = buildMetadata(blogSeo);

export default function BlogIndexPage() {
  const blogListSchema = {
    '@type': 'Blog',
    '@id': `${absoluteUrl('/blog/')}#blog`,
    name: "Butler's Construction Blog",
    url: absoluteUrl('/blog/'),
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: absoluteUrl(post.seo.path),
      datePublished: post.datePublished,
    })),
  };

  return (
    <InnerPage>
      <InnerHero
        variant="blog"
        image="/images/gallery/gallery-09.jpg"
        badge="Butler's Construction"
        heading="Remodeling & Construction Guides for Las Vegas"
        subtitle="Straight answers on costs, planning, and hiring from a licensed local contractor."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section>
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <span className="blog-card-badge">{post.heroBadge}</span>
                <h2>
                  <Link href={post.seo.path}>{post.title}</Link>
                </h2>
                <p className="blog-card-date">{post.date}</p>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <Link href={post.seo.path} className="blog-card-link">
                  Read the article &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        json={pageGraph(blogSeo, [
          blogListSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog/' },
          ]),
        ])}
      />
    </InnerPage>
  );
}
