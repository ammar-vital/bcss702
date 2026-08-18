import Image from 'next/image';

import { FadeIn } from '@/components/ui/FadeIn';
import { aboutSection } from '@/data/home';

export function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-images">
            <div className="about-badge-float">
              <div className="num">{aboutSection.badge.value}</div>
              <div className="txt">
                {aboutSection.badge.lines[0]}
                <br />
                {aboutSection.badge.lines[1]}
              </div>
            </div>
            <Image
              className="about-img-main"
              src={aboutSection.mainImage.src}
              alt={aboutSection.mainImage.alt}
              width={640}
              height={480}
            />
            <Image
              className="about-img-float"
              src={aboutSection.floatImage.src}
              alt={aboutSection.floatImage.alt}
              width={200}
              height={160}
            />
          </div>
          <FadeIn className="about-text">
            <div className="section-tag">{aboutSection.tag}</div>
            <h2 className="section-title">
              {aboutSection.headingLine1}
              <br />
              {aboutSection.headingLine2}
            </h2>
            {aboutSection.paragraphs.map((paragraph) => (
              <p className="section-sub" key={paragraph}>
                {paragraph}
              </p>
            ))}
            <div className="about-features">
              {aboutSection.features.map((feature) => (
                <div className="about-feat" key={feature}>
                  {feature}
                </div>
              ))}
            </div>
            <a href={aboutSection.cta.href} className="btn-primary about-cta">
              {aboutSection.cta.label}
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
