import type { Metadata } from 'next';

import { TopBar } from '@/components/layout/TopBar';
import { HomeFooter } from '@/components/layout/SiteFooter';
import { SiteNav } from '@/components/navigation/SiteNav';
import { JsonLd } from '@/components/seo/JsonLd';
import { AboutSection } from '@/components/sections/AboutSection';
import { CtaBand } from '@/components/sections/CtaBand';
import { HomeContact } from '@/components/sections/HomeContact';
import { HomeGallery } from '@/components/sections/HomeGallery';
import { HomeHero } from '@/components/sections/HomeHero';
import { ServiceArea } from '@/components/sections/ServiceArea';
import { ServiceFaq } from '@/components/sections/ServiceFaq';
import { ServiceProcess } from '@/components/sections/ServiceProcess';
import { ServicesByCategory } from '@/components/sections/ServicesByCategory';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsBar } from '@/components/sections/StatsBar';
import { Testimonials } from '@/components/sections/Testimonials';
import { TrustBar } from '@/components/sections/TrustBar';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { homeFaqs } from '@/data/home';
import { homePage } from '@/data/pages';
import { buildMetadata } from '@/lib/seo';
import { faqPageSchema, pageGraph } from '@/lib/schema';

export const metadata: Metadata = buildMetadata(homePage.seo);

export default function HomePage() {
  return (
    <div className="page-home">
      <TopBar variant="home" />
      <SiteNav />
      <main id="main">
        <HomeHero />
        <TrustBar />
        <StatsBar />
        <AboutSection />
        <ServicesSection />
        <ServicesByCategory />
        <ServiceProcess />
        <WhyUsSection />
        <ServiceArea />
        <ServiceFaq items={homeFaqs} />
        <HomeGallery />
        <Testimonials />
        <CtaBand />
        <HomeContact />
      </main>
      <HomeFooter />
      <JsonLd json={pageGraph(homePage.seo, [faqPageSchema(homeFaqs)])} />
    </div>
  );
}
