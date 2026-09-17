import { siteConfig } from '@/data/site';
import type { FaqEntry } from '@/lib/schema';

/**
 * Accurate, service-agnostic FAQs built from the real business facts in
 * siteConfig. The first and third questions fold in the service name so each
 * page's FAQ (and its FAQPage schema) is unique rather than 37 identical blocks.
 */
/**
 * Per-slug, service-specific FAQs that target the real search queries a page
 * ranks for. Prepended to the generic set so each page leads with questions
 * unique to that service (and its FAQPage schema).
 */
const SERVICE_FAQS: Record<string, FaqEntry[]> = {
  'medical-healthcare-facility-construction': [
    {
      question: 'Do you handle medical office remodeling in Las Vegas?',
      answer:
        'Yes. We remodel active and vacant medical offices across the Las Vegas Valley, including dental operatories, exam and treatment rooms, urgent care, imaging suites, and med spas, sequencing the work around your patient schedule and keeping the space ADA accessible.',
    },
    {
      question: 'How do you keep a medical office open during construction?',
      answer:
        'We phase the work, set up dust and infection-control barriers, protect egress and restrooms, and schedule the disruptive tasks around your hours so your practice can keep seeing patients wherever possible.',
    },
    {
      question: 'Do you manage healthcare code compliance and permits?',
      answer:
        'Yes. We build to the applicable healthcare and accessibility codes and coordinate the Nevada permits and inspections for your project, so the finished facility passes and is ready for use.',
    },
  ],
};

export function serviceFaqs(serviceName: string, slug?: string): FaqEntry[] {
  const custom = slug ? SERVICE_FAQS[slug] ?? [] : [];
  return [
    ...custom,
    {
      question: `Do you offer free estimates for ${serviceName}?`,
      answer: `Yes. Every ${serviceName} project starts with a free, no-obligation estimate. Call ${siteConfig.phone.display} or request a quote online and we respond within 24 hours.`,
    },
    {
      question: 'Is Butler’s Construction licensed and insured?',
      answer:
        'Yes. We are licensed by the Nevada State Contractors Board (General B #74507 and C-1 Plumbing #81481) and fully insured, so your project is handled by a licensed Las Vegas contractor.',
    },
    {
      question: `How does the ${serviceName} process work?`,
      answer:
        'It starts with a free consultation and a written estimate. Once you approve, we handle the permits and scheduling, complete the work, and finish with a final walkthrough so you sign off before we call it done.',
    },
    {
      question: 'What areas around Las Vegas do you serve?',
      answer:
        'We serve the entire Las Vegas Valley, including Henderson, North Las Vegas, Summerlin, Paradise, Enterprise, and Spring Valley.',
    },
    {
      question: 'How soon can you start my project?',
      answer:
        'Timing depends on the scope and any permits required. We give you a realistic timeline with your written estimate and start as soon as your schedule and approvals allow.',
    },
  ];
}
