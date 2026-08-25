import { FadeIn } from '@/components/ui/FadeIn';
import { reasons } from '@/data/home';

export function WhyUsSection() {
  return (
    <section className="why-us">
      <div className="container">
        <div className="section-tag">Why Choose Us</div>
        <h2 className="section-title">
          Why Las Vegas
          <br />
          Trusts Butler&rsquo;s
        </h2>
        <p className="section-sub">
          Not every contractor is created equal. Here&rsquo;s what makes Butler&rsquo;s the name
          people call first and call again.
        </p>
        <div className="why-grid">
          {reasons.map((reason) => (
            <FadeIn className="why-card" key={reason.number}>
              <div className="why-num">{reason.number}</div>
              <h3>{reason.title}</h3>
              <p>{reason.body}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
