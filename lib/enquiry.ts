/* Builds the enquiry email. Used by the server (direct sending) and by the browser
   (the email-draft fallback), so both produce exactly the same text. */
import { catalogue, currencyCode, money, type Market } from './courses';

export interface EnquiryFields {
  name: string;
  email: string;
  organisation: string;
  market: Market;
  interest: string;
  message: string;
}

export interface PlanLine { id: string; qty: number }

export const LIMITS = { name: 120, email: 200, organisation: 160, interest: 120, message: 4000 } as const;

/** Keep only known learning-plan items with sensible seat numbers */
export function cleanPlan(plan: unknown): PlanLine[] {
  if (!Array.isArray(plan)) return [];
  return plan
    .filter((i): i is PlanLine => !!i && typeof i.id === 'string' && !!catalogue[i.id] && Number.isInteger(i.qty))
    .map(i => ({ id: i.id, qty: Math.max(1, Math.min(50, i.qty)) }))
    .slice(0, 20);
}

export function buildEnquiry(f: EnquiryFields, plan: PlanLine[]) {
  const m = f.market;
  const cur = currencyCode(m);
  const subject = `PECB training enquiry — ${f.interest}`;
  let total = 0, quotes = 0;
  const lines = plan.map(i => {
    const p = catalogue[i.id];
    if (p.price) total += p.price[m] * i.qty; else quotes++;
    return `- ${p.title} (${p.sub}) × ${i.qty}: ${p.price ? money(p.price[m] * i.qty, m) : 'quote requested'}`;
  });
  const body = `Name: ${f.name}\nEmail: ${f.email}\nOrganisation: ${f.organisation || 'Not provided'}\nPreferred pricing currency: ${cur}\nInterest: ${f.interest}\n\nGoals / questions:\n${f.message || 'Please send me more information about this training pathway.'}` +
    (plan.length ? `\n\nLearning plan (listed fees, ${cur}):\n${lines.join('\n')}\nTotal listed fees: ${money(total, m)}${quotes ? ' (plus quote items)' : ''}` : '');
  return { subject, body };
}

export const isEmail = (s: string) => /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/.test(s);
