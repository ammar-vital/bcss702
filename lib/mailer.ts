import { Buffer } from 'node:buffer';
import net from 'node:net';
import tls from 'node:tls';

/** Abort a silent SMTP server rather than waiting for the platform to kill us. */
const IDLE_TIMEOUT_MS = 8_000;
/** Ceiling for the whole exchange, comfortably inside the route's maxDuration. */
const TOTAL_TIMEOUT_MS = 20_000;

export interface MailMessage {
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
}

export function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  if (!host) {
    // SMTP2GO HTTP API path: return a sentinel so callers treat mail as configured.
    if (process.env.SMTP2GO_API_KEY) {
      return {
        host: 'smtp2go-api',
        port: 0,
        secure: true,
        from: process.env.MAIL_FROM ?? "Butler's Construction Website <noreply@baseagentai.com>",
      };
    }
    return null;
  }
  const port = Number(process.env.SMTP_PORT ?? 587);
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    ...(process.env.SMTP_USER ? { user: process.env.SMTP_USER } : {}),
    ...(process.env.SMTP_PASSWORD ? { pass: process.env.SMTP_PASSWORD } : {}),
    from: process.env.MAIL_FROM ?? process.env.SMTP_USER ?? 'no-reply@bcss702.com',
  };
}

/** Reject values that could inject extra SMTP headers. */
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function encodeSubject(subject: string): string {
  // RFC 2047 encoded-word keeps non-ASCII subjects intact.
  if (/^[\x00-\x7F]*$/.test(subject)) return subject;
  return `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
}

/**
 * Minimal SMTP client. The WordPress site sent mail through Post SMTP; this
 * keeps the same behaviour without pulling in a dependency, and is a no-op
 * (logging only) when no SMTP host is configured.
 */
async function sendViaSmtp2go(message: MailMessage): Promise<void> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  if (!apiKey) throw new Error('SMTP2GO_API_KEY is not set');
  const sender =
    process.env.MAIL_FROM ?? "Butler's Construction Website <noreply@baseagentai.com>";
  const customHeaders = message.replyTo
    ? [{ header: 'Reply-To', value: sanitizeHeaderValue(message.replyTo) }]
    : [];
  const response = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      sender,
      to: message.to,
      subject: message.subject,
      text_body: message.text,
      ...(customHeaders.length ? { custom_headers: customHeaders } : {}),
    }),
  });
  const data = (await response.json().catch(() => ({}))) as {
    data?: { succeeded?: number; failures?: unknown };
  };
  if (!response.ok || !data?.data?.succeeded) {
    throw new Error(
      `SMTP2GO send failed: ${response.status} ${JSON.stringify(data?.data?.failures ?? data)}`,
    );
  }
}

export async function sendMail(message: MailMessage): Promise<void> {
  // Preferred transport on serverless: SMTP2GO's HTTPS API. Raw SMTP sockets are
  // frequently blocked or throttled on serverless platforms, so use the API when
  // its key is present and fall back to the raw SMTP client otherwise.
  if (process.env.SMTP2GO_API_KEY) {
    await sendViaSmtp2go(message);
    return;
  }

  const config = readSmtpConfig();

  if (!config) {
    throw new Error('SMTP is not configured (set SMTP_HOST in the environment)');
  }

  const socket: net.Socket = config.secure
    ? tls.connect({ host: config.host, port: config.port, servername: config.host })
    : net.connect({ host: config.host, port: config.port });

  socket.setEncoding('utf8');
  socket.setTimeout(IDLE_TIMEOUT_MS);

  let buffer = '';
  const waiters: Array<{ expect: number; resolve: (line: string) => void; reject: (e: Error) => void }> = [];

  function fail(error: Error) {
    while (waiters.length) waiters.shift()!.reject(error);
    socket.destroy();
  }

  // Serverless platforms kill a function that overruns its budget, which would
  // lose the submission without a log line. Give up first, so the route can
  // report the failure and record what was sent.
  const deadline = setTimeout(
    () => fail(new Error('SMTP exchange exceeded the time budget')),
    TOTAL_TIMEOUT_MS,
  );

  socket.on('data', (chunk: string) => {
    buffer += chunk;
    let index = buffer.indexOf('\n');
    while (index !== -1) {
      const line = buffer.slice(0, index).trimEnd();
      buffer = buffer.slice(index + 1);
      // Multiline replies use "250-"; only the final "250 " completes a step.
      if (/^\d{3} /.test(line)) {
        const waiter = waiters.shift();
        if (waiter) {
          const code = Number(line.slice(0, 3));
          if (code !== waiter.expect) {
            waiter.reject(new Error(`SMTP error: ${line}`));
            socket.destroy();
          } else {
            waiter.resolve(line);
          }
        }
      }
      index = buffer.indexOf('\n');
    }
  });

  socket.on('error', (error) => fail(error instanceof Error ? error : new Error(String(error))));
  socket.on('timeout', () => fail(new Error('SMTP connection timed out')));

  const expect = (code: number) =>
    new Promise<string>((resolve, reject) => waiters.push({ expect: code, resolve, reject }));

  const send = (line: string, code: number) => {
    socket.write(`${line}\r\n`);
    return expect(code);
  };

  try {
    await expect(220);
    const greeting = await send(`EHLO ${config.host}`, 250);

    if (!config.secure && /STARTTLS/i.test(greeting)) {
      // Upgrading mid-stream needs a second socket; fall back to plain auth
      // rather than silently sending credentials in the clear.
      if (config.user) {
        throw new Error('SMTP server requires STARTTLS; set SMTP_PORT=465 and SMTP_SECURE=true');
      }
    }

    if (config.user && config.pass) {
      await send('AUTH LOGIN', 334);
      await send(Buffer.from(config.user, 'utf8').toString('base64'), 334);
      await send(Buffer.from(config.pass, 'utf8').toString('base64'), 235);
    }

    await send(`MAIL FROM:<${sanitizeHeaderValue(config.from)}>`, 250);
    for (const recipient of message.to) {
      await send(`RCPT TO:<${sanitizeHeaderValue(recipient)}>`, 250);
    }
    await send('DATA', 354);

    const headers = [
      `From: ${sanitizeHeaderValue(config.from)}`,
      `To: ${message.to.map(sanitizeHeaderValue).join(', ')}`,
      `Subject: ${encodeSubject(sanitizeHeaderValue(message.subject))}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
    ];
    if (message.replyTo) headers.push(`Reply-To: ${sanitizeHeaderValue(message.replyTo)}`);

    // Dot-stuffing so a line of "." cannot terminate the message early.
    const body = message.text.replace(/\r?\n/g, '\r\n').replace(/^\./gm, '..');
    socket.write(`${headers.join('\r\n')}\r\n\r\n${body}\r\n.\r\n`);
    await expect(250);
    await send('QUIT', 221).catch(() => undefined);
  } finally {
    clearTimeout(deadline);
    socket.destroy();
  }
}
