import { FadeIn } from '@/components/ui/FadeIn';
import type { FaqEntry } from '@/lib/schema';

/** Accessible FAQ accordion (native <details>), mirrored by FAQPage schema. */
export function ServiceFaq({ items }: { items: FaqEntry[] }) {
  return (
    <section className="faq">
      <div className="container container-narrow">
        <div className="faq-head">
          <div className="section-tag">Questions & Answers</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {items.map((item) => (
            <FadeIn className="faq-item" as="details" key={item.question}>
              <summary className="faq-question">
                <h3>{item.question}</h3>
              </summary>
              <p className="faq-answer">{item.answer}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
