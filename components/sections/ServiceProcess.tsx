import { FadeIn } from '@/components/ui/FadeIn';

/** Universal five-step delivery process shown on every service page. */
const STEPS = [
  {
    title: 'Free Consultation',
    body: 'We talk through your project, budget, and timeline at no cost and no pressure.',
  },
  {
    title: 'Written Estimate',
    body: 'You get a clear, written estimate with no hidden costs and no surprises.',
  },
  {
    title: 'Permits & Scheduling',
    body: 'We pull the permits your project needs and lock in a start date that works for you.',
  },
  {
    title: 'Construction',
    body: 'Our licensed crew does the work to code, keeping you updated at every stage.',
  },
  {
    title: 'Final Walkthrough',
    body: 'We walk the finished project with you and do not call it done until you are satisfied.',
  },
] as const;

export function ServiceProcess() {
  return (
    <section className="process">
      <div className="container">
        <div className="process-head">
          <div className="section-tag">How We Work</div>
          <h2 className="section-title">Our Process, Start to Finish</h2>
        </div>
        <ol className="process-steps">
          {STEPS.map((step, index) => (
            <FadeIn className="process-step" as="li" key={step.title}>
              <div className="process-num" aria-hidden="true">
                {index + 1}
              </div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-body">{step.body}</p>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
