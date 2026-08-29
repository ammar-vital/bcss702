import { FadeIn } from '@/components/ui/FadeIn';
import { getServiceFeatures } from '@/data/serviceFeatures';

export function ServiceFeatures({ slug, serviceName }: { slug: string; serviceName: string }) {
  const features = getServiceFeatures(slug);
  return (
    <section className="svc-features">
      <div className="container">
        <div className="section-tag">What&rsquo;s Included</div>
        <h2 className="section-title">What Your {serviceName} Includes</h2>
        <div className="svc-features-grid">
          {features.map((feature) => (
            <FadeIn className="svc-feature" as="div" key={feature.title}>
              <span className="svc-feature-check" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <h3 className="svc-feature-title">{feature.title}</h3>
                <p className="svc-feature-detail">{feature.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
