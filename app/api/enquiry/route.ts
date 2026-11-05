/* Sends enquiries from the contact form straight to Think Risk by email (SMTP).
   Settings come from environment variables; see .env.example. If SMTP is not set up,
   or sending fails, the form falls back to preparing an email draft in the browser. */
import nodemailer from 'nodemailer';
import { EMAIL } from '@/lib/courses';
import { buildEnquiry, cleanPlan, isEmail, LIMITS, type EnquiryFields } from '@/lib/enquiry';

export const runtime = 'nodejs';

// Basic protection against floods: at most 5 enquiries per visitor (IP address) every 10 minutes
const WINDOW_MS = 10 * 60 * 1000, MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter(t => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');
const json = (body: object, status = 200) => Response.json(body, { status });

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try { data = await req.json(); } catch { return json({ ok: false, error: 'invalid' }, 400); }

  // Hidden "website" field: people never see it, so anything typed there is a bot. Pretend it worked.
  if (str(data.website, 200)) return json({ ok: true });

  const f: EnquiryFields = {
    name: oneLine(str(data.name, LIMITS.name)),
    email: oneLine(str(data.email, LIMITS.email)),
    organisation: oneLine(str(data.organisation, LIMITS.organisation)),
    market: data.market === 'MY' ? 'MY' : 'AU',
    interest: oneLine(str(data.interest, LIMITS.interest)),
    message: str(data.message, LIMITS.message),
  };
  if (!f.name || !f.interest || !isEmail(f.email)) return json({ ok: false, error: 'invalid' }, 400);

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (tooMany(ip)) return json({ ok: false, error: 'rate_limited' }, 429);

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, ENQUIRY_TO, ENQUIRY_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return json({ ok: false, error: 'not_configured' }, 503);

  const port = Number(SMTP_PORT || 465);
  const { subject, body } = buildEnquiry(f, cleanPlan(data.plan));
  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: { name: 'Think Risk PECB website', address: ENQUIRY_FROM || SMTP_USER },
      to: ENQUIRY_TO || EMAIL,
      replyTo: { name: f.name, address: f.email },
      subject,
      text: body,
    });
    return json({ ok: true });
  } catch (err) {
    console.error('Enquiry email failed:', err instanceof Error ? err.message : err);
    return json({ ok: false, error: 'send_failed' }, 502);
  }
}
