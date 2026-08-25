import { QuoteForm } from '@/components/forms/QuoteForm';
import { ContactDetails, homeContactItems } from '@/components/sections/ContactDetails';
import { contactFormServices } from '@/data/home';

export function HomeContact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-info">
            <div className="section-tag">Contact Us</div>
            <h2>Let&rsquo;s Build Something Together</h2>
            <p>
              Whether you&rsquo;re planning a custom home, a major remodel, or a commercial upgrade
              our team is ready to help. Reach out and we&rsquo;ll guide you through the process.
            </p>
            <ContactDetails items={homeContactItems} />
          </div>
          <QuoteForm
            source="Homepage Contact Section"
            heading="Request a Free Quote"
            serviceOptions={contactFormServices}
            submitLabel="Send Request It's Free"
          />
        </div>
      </div>
    </section>
  );
}
