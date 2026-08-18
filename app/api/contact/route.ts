import { NextResponse } from 'next/server';

import { readSmtpConfig, sendMail } from '@/lib/mailer';
import { siteConfig } from '@/data/site';

// The SMTP client opens a raw socket, so this must not run on the edge runtime.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
/** Headroom for a slow SMTP handshake; the mailer gives up well before this. */
export const maxDuration = 30;

/** Fields the form posts for bookkeeping rather than for the message body. */
const IGNORED = new Set(['Website']);

/** Printed first, in this order, exactly as the WordPress handler did. */
const PRIORITY = ['Source', 'Name', 'First Name', 'Last Name', 'Email', 'Phone', 'Service'];

const MAX_FIELD_LENGTH = 5000;
const MAX_FIELDS = 40;

/** "FirstName" -> "First Name", "project_details" -> "Project Details". */
function humanise(key: string): string {
  return key
    .replace(/[-_]+/g, ' ')
    .replace(/(?<!^)([A-Z])/g, ' $1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const entries = Object.entries(payload as Record<string, unknown>);
  if (entries.length > MAX_FIELDS) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: bots fill it in. Answer 200 so they do not learn they were caught.
  const honeypot = (payload as Record<string, unknown>).Website;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const fields = new Map<string, string>();
  for (const [key, value] of entries) {
    if (IGNORED.has(key)) continue;
    if (typeof value !== 'string') continue;
    const clean = value.trim().slice(0, MAX_FIELD_LENGTH);
    if (clean) fields.set(humanise(key), clean);
  }

  if (fields.size === 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const source = fields.get('Source') ?? 'Website Contact Form';
  const email = fields.get('Email') ?? '';
  const name =
    [fields.get('First Name'), fields.get('Last Name')].filter(Boolean).join(' ') ||
    fields.get('Name') ||
    'Website Visitor';

  const lines: string[] = ['New website form submission', ''];
  const printed = new Set<string>();
  for (const label of PRIORITY) {
    const value = fields.get(label);
    if (value) {
      lines.push(`${label}: ${value}`);
      printed.add(label);
    }
  }
  for (const [label, value] of fields) {
    if (!printed.has(label)) lines.push(`${label}: ${value}`);
  }
  lines.push('', `Submitted: ${new Date().toISOString()}`);

  const recipients = (process.env.CONTACT_RECIPIENTS ?? siteConfig.email)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (!readSmtpConfig()) {
    // Without SMTP the site still works; the submission is logged so nothing
    // is lost while the mail transport is being configured.
    console.warn('[contact] SMTP not configured — submission not emailed:\n%s', lines.join('\n'));
    return NextResponse.json({ ok: false, reason: 'mail-not-configured' }, { status: 503 });
  }

  try {
    await sendMail({
      to: recipients,
      subject: `[BCSS702] ${source}`,
      text: lines.join('\n'),
      ...(isEmail(email) ? { replyTo: `${name} <${email}>` } : {}),
    });
  } catch (error) {
    console.error('[contact] failed to send submission', error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
