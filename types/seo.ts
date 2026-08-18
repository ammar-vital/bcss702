/** SEO values migrated from the Rank Math data that the WordPress site served. */
export interface PageSeo {
  /** Full <title>, exactly as Rank Math rendered it. */
  title: string;
  description: string;
  /** Absolute-from-root path, always with a trailing slash. */
  path: string;
  /** ISO timestamp of first publication, used for Article/WebPage schema. */
  datePublished?: string;
  /** ISO timestamp of the last edit. */
  dateModified?: string;
  /** Open Graph type; the WordPress pages all rendered `article`. */
  ogType?: 'website' | 'article';
  /** Set when a page should not be indexed. */
  noindex?: boolean;
}
