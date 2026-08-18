import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, siteConfig } from '@/data/site';
import { graph, organizationSchema, websiteSchema } from '@/lib/schema';

import './globals.css';

// Playfair Display was linked on every WordPress page but never applied to any
// element, so it is not loaded here. Inter is the only face the design uses.
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.name,
    template: '%s',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  verification: { google: siteConfig.googleSiteVerification },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <JsonLd json={graph([organizationSchema(), websiteSchema()])} />
      </body>
    </html>
  );
}
