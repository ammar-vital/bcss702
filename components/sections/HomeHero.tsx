import { QuoteForm } from '@/components/forms/QuoteForm';
import { heroFormServices, homeHero } from '@/data/home';
import { siteConfig } from '@/data/site';

export function HomeHero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge">{homeHero.badge}</div>
          <h1>
            <span>
              {homeHero.headingHighlightLines[0]}
              <br />
              {homeHero.headingHighlightLines[1]}
            </span>
            <br />
            {homeHero.headingRestLines[0]}
            <br />
            {homeHero.headingRestLines[1]}
          </h1>
          <p>{homeHero.subtitle}</p>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">
              Get a Free Quote
            </a>
            <a href={siteConfig.phone.href} className="btn-secondary">
              {siteConfig.phone.display}
            </a>
          </div>
        </div>
        <QuoteForm
          variant="hero"
          headingLevel="h2"
          source={homeHero.formSource}
          heading="Get a Free Inspection"
          intro="We respond within 24 hours."
          serviceOptions={heroFormServices}
          submitLabel="Request Free Quote →"
          noteVariant="hero"
          textareaLabel="Project Details"
          textareaName="Details"
          textareaPlaceholder="Briefly describe your project..."
          textareaRows={2}
        />
      </div>
    </section>
  );
}
