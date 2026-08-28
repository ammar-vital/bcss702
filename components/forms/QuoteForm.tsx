'use client';

import Script from 'next/script';
import { useId, useState } from 'react';

import { siteConfig } from '@/data/site';

/** Cloudflare Turnstile site key (public). When set, the form renders the widget
 *  and posts its token; the API verifies it. Unset means the widget is skipped. */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** `hero` is the white card in the homepage hero; `full` is every other form. */
type QuoteFormVariant = 'hero' | 'full';

interface Props {
  /** Hidden `Source` value, so submissions say which page they came from. */
  source: string;
  heading: string;
  intro?: string;
  submitLabel: string;
  /** Options for the "Service Needed" select; omitted renders no select. */
  serviceOptions?: readonly string[];
  variant?: QuoteFormVariant;
  /** Keeps the document outline valid: `h2` under an `h1`, `h3` under an `h2`. */
  headingLevel?: 'h2' | 'h3';
  className?: string;
  noteVariant?: 'hero' | 'guarantee';
  textareaLabel?: string;
  textareaName?: string;
  textareaPlaceholder?: string;
  textareaRows?: number;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Replaces the WordPress `admin-post.php` form handler. Posts JSON to
 * `/api/contact`, which mails the office. Keeps the theme's honeypot field.
 */
export function QuoteForm({
  source,
  heading,
  intro,
  submitLabel,
  serviceOptions,
  variant = 'full',
  headingLevel = 'h3',
  className,
  noteVariant = 'guarantee',
  textareaLabel = 'Project Description',
  textareaName = 'Description',
  textareaPlaceholder = 'Tell us about your project size, timeline, budget range, special requirements...',
  textareaRows = 4,
}: Props) {
  const id = useId();
  const [status, setStatus] = useState<Status>('idle');
  // Timestamp the render so the server can reject sub-3-second (bot) submissions.
  const [loadedAt] = useState(() => Date.now());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload: Record<string, string> = Object.fromEntries(
      Array.from(new FormData(form).entries(), ([key, value]) => [key, String(value)]),
    );
    payload.elapsedMs = String(Date.now() - loadedAt);
    const turnstileToken =
      (form.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement | null)?.value ?? '';
    if (turnstileToken) payload.turnstileToken = turnstileToken;

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      setStatus('success');
      form.reset();
      (window as unknown as { turnstile?: { reset?: () => void } }).turnstile?.reset?.();
    } catch {
      setStatus('error');
    }
  }

  const isHero = variant === 'hero';
  const Heading = headingLevel;

  return (
    <form
      className={className ?? (isHero ? 'hero-card' : 'contact-form-card')}
      onSubmit={onSubmit}
      noValidate={false}
    >
      <Heading>{heading}</Heading>

      {status === 'success' && (
        <div className="form-alert form-alert-success" role="status">
          Thanks. Your message was sent successfully, and we will get back to you within 24 hours.
        </div>
      )}
      {status === 'error' && (
        <div className="form-alert form-alert-error" role="alert">
          Sorry, your message could not be sent. Please call us at{' '}
          <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
        </div>
      )}

      {intro && <p>{intro}</p>}

      <input type="hidden" name="Source" value={source} />
      <label className="form-honeypot" aria-hidden="true">
        Leave this field empty
        <input type="text" name="Website" tabIndex={-1} autoComplete="off" />
      </label>

      {isHero ? (
        <>
          <div className="form-group">
            <label htmlFor={`${id}-name`}>Your Name</label>
            <input type="text" id={`${id}-name`} name="Name" placeholder="John Smith" required />
          </div>
          <div className="form-group">
            <label htmlFor={`${id}-email`}>Email</label>
            <input
              type="email"
              id={`${id}-email`}
              name="Email"
              placeholder="you@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`${id}-phone`}>Phone Number</label>
            <input
              type="tel"
              id={`${id}-phone`}
              name="Phone"
              placeholder="(702) 555-0000"
              required
            />
          </div>
        </>
      ) : (
        <>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`${id}-first`}>First Name</label>
              <input
                type="text"
                id={`${id}-first`}
                name="FirstName"
                placeholder="John"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`${id}-last`}>Last Name</label>
              <input type="text" id={`${id}-last`} name="LastName" placeholder="Smith" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`${id}-phone`}>Phone</label>
              <input
                type="tel"
                id={`${id}-phone`}
                name="Phone"
                placeholder="(702) 555-0000"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`${id}-email`}>Email</label>
              <input
                type="email"
                id={`${id}-email`}
                name="Email"
                placeholder="you@email.com"
                required
              />
            </div>
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor={`${id}-location`}>Project City &amp; ZIP</label>
        <input
          type="text"
          id={`${id}-location`}
          name="Location"
          placeholder="Las Vegas, 89101"
          autoComplete="address-level2"
          required
        />
      </div>

      {serviceOptions && (
        <div className="form-group">
          <label htmlFor={`${id}-service`}>Service Needed</label>
          <select id={`${id}-service`} name="Service" defaultValue="">
            <option value="">Select a service...</option>
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor={`${id}-details`}>{textareaLabel}</label>
        <textarea
          id={`${id}-details`}
          name={textareaName}
          rows={textareaRows}
          placeholder={textareaPlaceholder}
        />
      </div>

      <div className="form-consent">
        <label htmlFor={`${id}-consent`}>
          <input type="checkbox" id={`${id}-consent`} name="Consent" value="yes" required />
          <span>
            I agree to be contacted by Butler&apos;s Construction &amp; Service Solutions about my
            request. Your information is never shared or sold.
          </span>
        </label>
      </div>

      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div
            className="cf-turnstile"
            data-sitekey={TURNSTILE_SITE_KEY}
            data-theme="light"
            style={{ marginBottom: '1rem' }}
          />
        </>
      )}

      <button type="submit" className="form-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>

      {noteVariant === 'hero' ? (
        <p className="form-note">🔒 No spam. No pressure. Just results.</p>
      ) : (
        <p className="form-note">
          <span style={{ color: '#C0392B', fontWeight: 800 }}>✓</span> We respond within 24 hours
          &nbsp;|&nbsp; ✓ No spam, ever
        </p>
      )}
    </form>
  );
}
