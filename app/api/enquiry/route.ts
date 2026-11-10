/* Sends enquiries from the contact form straight to Think Risk by email, through Resend
   (https://resend.com). Settings come from environment variables; see .env.example.
   If sending isn't set up or fails, the form shows an error asking the visitor to try again. */
import { EMAIL, isMarket } from '@/lib/courses';
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
    market: isMarket(data.market) ? data.market : 'AU',
    interest: oneLine(str(data.interest, LIMITS.interest)),
    message: str(data.message, LIMITS.message),
  };
  if (!f.name || !f.interest || !isEmail(f.email)) return json({ ok: false, error: 'invalid' }, 400);

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (tooMany(ip)) return json({ ok: false, error: 'rate_limited' }, 429);

  const { RESEND_API_KEY, ENQUIRY_TO, ENQUIRY_FROM } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_FROM) {
    console.error('Enquiry email not sent: set RESEND_API_KEY and ENQUIRY_FROM (see .env.example).');
    return json({ ok: false, error: 'not_configured' }, 503);
  }

  const { subject, body } = buildEnquiry(f, cleanPlan(data.plan));
  const displayName = f.name.replace(/["\\]/g, '');
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `Think Risk PECB website <${ENQUIRY_FROM}>`,
        to: [ENQUIRY_TO || EMAIL],
        reply_to: `"${displayName}" <${f.email}>`,
        subject,
        text: body,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.error(`Enquiry email failed: Resend replied ${res.status}:`, await res.text().catch(() => ''));
      return json({ ok: false, error: 'send_failed' }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('Enquiry email failed:', err instanceof Error ? err.message : err);
    return json({ ok: false, error: 'send_failed' }, 502);
  }
}
