import { QuoteForm } from '@/components/forms/QuoteForm';
import { ContactDetails, serviceContactItems } from '@/components/sections/ContactDetails';

interface Props {
  heading: string;
  intro: string;
  formSource: string;
}

/** The contact block that closed every service page. */
export function ServiceContact({ heading, intro, formSource }: Props) {
  return (
    <section className="contact" id="contact-form">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-info">
            <div className="contact-eyebrow">Contact Us</div>
            <h2>{heading}</h2>
            <p>{intro}</p>
            <ContactDetails items={serviceContactItems} emojiIcons />
          </div>
          <QuoteForm
            source={formSource}
            heading="Request a Free Quote"
            submitLabel="Send Request It's Free"
          />
        </div>
      </div>
    </section>
  );
}
