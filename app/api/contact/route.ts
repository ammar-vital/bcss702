import { NextResponse } from 'next/server';

import { readSmtpConfig, sendMail } from '@/lib/mailer';
import { siteConfig } from '@/data/site';

// The SMTP client opens a raw socket, so this must not run on the edge runtime.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
/** Headroom for a slow SMTP handshake; the mailer gives up well before this. */
export const maxDuration = 30;

/** Fields the form posts for bookkeeping rather than for the message body. */
const IGNORED = new Set(['Website', 'Consent', 'elapsedMs']);

/**
 * Best-effort throttle: drop an identical submission repeated within the
 * window. Serverless containers are shared while warm, so this catches a bot
 * hammering the same payload without needing an external store.
 */
const recentSubmissions = new Map<string, number>();
const DEDUP_WINDOW_MS = 60_000;
function isDuplicateSubmission(signature: string): boolean {
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions) {
    if (now - timestamp > DEDUP_WINDOW_MS) recentSubmissions.delete(key);
  }
  if (recentSubmissions.has(signature)) return true;
  recentSubmissions.set(signature, now);
  return false;
}

/** Valid North American number: 10 digits, or 11 with a leading US country code. */
function isValidUsPhone(input: string): boolean {
  const digits = input.replace(/\D/g, '');
  const local = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits;
  if (local.length !== 10) return false;
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(local)) return false;
  // Reject obvious placeholder/fake numbers that pass the format check:
  // too few distinct digits (5555555555, 5551115555) or a long same-digit run.
  if (new Set(local).size <= 2) return false;
  if (/(\d)\1{4,}/.test(local)) return false;
  return true;
}

/** Trips on machine-like strings: very low character variety, heavy case-flipping, or long consonant runs. */
function looksLikeGibberish(input: string): boolean {
  const token = input.trim();
  // Low character diversity: real words and names use many letters, spam like
  // "ddwdawadwwa" or "ddwadwadwa" recycles two or three characters.
  const letters = token.toLowerCase().replace(/[^a-z]/g, '');
  if (letters.length >= 8 && new Set(letters).size <= 3) return true;
  if (token.length < 10 || /\s/.test(token)) return false;
  let caseFlips = 0;
  for (let i = 1; i < token.length; i++) {
    const a = token[i - 1];
    const b = token[i];
    if (a === undefined || b === undefined) continue;
    if (/[a-z]/i.test(a) && /[a-z]/i.test(b) && (a === a.toUpperCase()) !== (b === b.toUpperCase())) {
      caseFlips++;
    }
  }
  const longestConsonantRun = (token.match(/[bcdfghjklmnpqrstvwxyz]+/gi) ?? []).reduce(
    (max, run) => Math.max(max, run.length),
    0,
  );
  return caseFlips >= 5 || longestConsonantRun >= 5;
}

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

  const record = payload as Record<string, unknown>;

  // Honeypot: bots fill it in. Answer 200 so they do not learn they were caught.
  const honeypot = record.Website;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  // Timing gate: real people take longer than 3 seconds; bots submit instantly.
  const elapsedMs = Number(record.elapsedMs);
  if (Number.isFinite(elapsedMs) && elapsedMs < 3000) {
    return NextResponse.json({ ok: true });
  }

  // Consent checkbox is mandatory; enforce server-side so a bypassed client can't skip it.
  const consent = record.Consent;
  if (typeof consent !== 'string' || consent.trim() === '') {
    return NextResponse.json({ ok: false, reason: 'consent-required' }, { status: 400 });
  }

  // Require a valid US phone number, which blocks the overseas number spam.
  const phoneRaw = (record.Phone ?? '').toString();
  if (!isValidUsPhone(phoneRaw)) {
    return NextResponse.json({ ok: false, reason: 'invalid-phone' }, { status: 400 });
  }

  // Gibberish backstop: drop silently only when BOTH name and message look machine-generated.
  const nameStr =
    [record.FirstName, record.LastName].filter((v) => typeof v === 'string').join(' ').trim() ||
    (typeof record.Name === 'string' ? record.Name : '');
  // The project-details field is "Description" on most forms and "Details" on the hero form.
  const messageStr =
    (typeof record.Description === 'string' ? record.Description : '') ||
    (typeof record.Details === 'string' ? record.Details : '');
  if (looksLikeGibberish(nameStr) && looksLikeGibberish(messageStr)) {
    return NextResponse.json({ ok: true });
  }

  // Drop an identical submission repeated within the window (silent 200).
  const dedupeKey = `${(record.Email ?? '').toString().trim().toLowerCase()}|${phoneRaw.replace(/\D/g, '')}|${messageStr.trim().toLowerCase()}`;
  if (isDuplicateSubmission(dedupeKey)) {
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
