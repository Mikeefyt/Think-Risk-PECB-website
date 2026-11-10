'use client';
/* Contact form: sends the enquiry straight to Think Risk via /api/enquiry.
   If it can't be sent, it keeps what the visitor typed and shows an error so they can try again. */
import { useEffect, useRef, useState } from 'react';
import { catalogue, EMAIL, isMarket, levels, markets, money, type Market } from '@/lib/courses';
import { LIMITS, type EnquiryFields } from '@/lib/enquiry';
import { Arrow } from './icons';
import { basketTotal, useSite } from './SiteProvider';

const PLAN = 'My learning plan';
const INTERESTS = ['ISO 22301 Business Continuity', 'ISO/IEC 42001 AI Management Systems', 'ISO/IEC 27001 Information Security', 'Corporate / team training', 'Other PECB courses'];

function BasketSummary() {
  const { basket, market, openDrawer } = useSite();
  if (!basket.length) return <div className="basket-summary" id="basket-summary" hidden></div>;
  const { total, quotes } = basketTotal(basket, market);
  return (
    <div className="basket-summary" id="basket-summary">
      <div className="bs-head"><b>Your learning plan</b><button type="button" className="link-btn" data-basket-open="" onClick={openDrawer}>Edit</button></div>
      <ul>{basket.map(i => { const p = catalogue[i.id]; return <li key={i.id}><span>{p.title}{i.qty > 1 ? ` × ${i.qty}` : ''}</span><b>{p.price ? money(p.price[market] * i.qty, market) : 'Quote'}</b></li>; })}</ul>
      <div className="bs-total"><span>Listed fees{quotes ? ' + quote' : ''}</span><b>{money(total, market)}</b></div>
    </div>
  );
}

type Status = 'form' | 'sending' | 'sent';

export function EnquiryForm() {
  const { basket, loaded, market, setMarket } = useSite();
  const [status, setStatus] = useState<Status>('form');
  const [f, setF] = useState<EnquiryFields>({ name: '', email: '', organisation: '', market: 'AU', interest: '', message: '' });
  const [error, setError] = useState<React.ReactNode>('');
  const honeypot = useRef<HTMLInputElement>(null);
  const sentHeading = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const prefilled = useRef(false);

  // Keep the currency select in step with the currency switch
  useEffect(() => { setF(v => ({ ...v, market })); }, [market]);

  // Pre-fill from links such as /contact?interest=...&level=... or the learning plan's "Request enrolment"
  useEffect(() => {
    if (!loaded || prefilled.current) return;
    prefilled.current = true;
    const q = new URLSearchParams(location.search), interest = q.get('interest'), lvl = q.get('level'), qm = q.get('market');
    if (isMarket(qm)) setMarket(qm);
    if (q.get('basket') === '1' && basket.length) {
      setF(v => ({ ...v, interest: PLAN, message: 'I would like to enrol in the courses in my learning plan. Please confirm availability, inclusions and final pricing.' }));
    } else if (interest && INTERESTS.includes(interest)) {
      setF(v => ({ ...v, interest, message: levels.some(l => l.name === lvl) ? `I am interested in the ${interest} ${lvl} course. Please confirm availability, pricing and inclusions.` : `I would like more information about ${interest}.` }));
    }
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status === 'sent') sentHeading.current?.focus();
  }, [status]);

  const set = (k: keyof EnquiryFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(v => ({ ...v, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const plan = basket.map(i => ({ id: i.id, qty: i.qty }));
    setStatus('sending');
    let res: Response | undefined;
    try {
      res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, plan, website: honeypot.current?.value || '' }) });
      if (res.ok) { setStatus('sent'); return; }
    } catch { /* network error: handled below */ }
    setStatus('form');
    const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;
    if (res?.status === 400) setError('Please check your name, email address and area of interest, then try again.');
    else if (res?.status === 429) setError(<>You’ve sent several enquiries in a short time. Please wait a few minutes and try again, or email us at {mail}.</>);
    else setError(<>Sorry, we couldn’t send your enquiry just now. Please try again in a moment, or email us at {mail}.</>);
    setTimeout(() => errorRef.current?.focus());
  };

  const restart = () => { setF(v => ({ ...v, organisation: '', interest: '', message: '' })); setStatus('form'); setTimeout(() => nameRef.current?.focus()); };

  return (
    <div className="form-card" id="enquiry">
      <BasketSummary />
      <form className="form" id="enquiry-form" hidden={status === 'sent'} onSubmit={onSubmit}>
        <div className="form-row">
          <div><label htmlFor="f-name">Full name <span className="req" aria-hidden="true">*</span></label><input ref={nameRef} id="f-name" name="name" autoComplete="name" placeholder="Your full name" required maxLength={LIMITS.name} value={f.name} onChange={set('name')} /></div>
          <div><label htmlFor="f-email">Work email <span className="req" aria-hidden="true">*</span></label><input id="f-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={LIMITS.email} value={f.email} onChange={set('email')} /></div>
        </div>
        <div className="form-row">
          <div><label htmlFor="f-org">Organisation</label><input id="f-org" name="organisation" autoComplete="organization" placeholder="Company name" maxLength={LIMITS.organisation} value={f.organisation} onChange={set('organisation')} /></div>
          <div><label htmlFor="form-market">Pricing currency</label><select id="form-market" name="market" value={f.market} onChange={e => setMarket(e.target.value as Market)}>{markets.map(m => <option key={m.id} value={m.id}>{m.code} — {m.name}</option>)}</select></div>
        </div>
        <div><label htmlFor="interest">What are you interested in? <span className="req" aria-hidden="true">*</span></label><select id="interest" name="interest" required value={f.interest} onChange={set('interest')}><option value="">Select a course or team training</option>{basket.length > 0 && <option>{PLAN}</option>}{INTERESTS.map(i => <option key={i}>{i}</option>)}</select></div>
        <div><label htmlFor="f-msg">Your goals</label><textarea id="f-msg" name="message" rows={4} placeholder="Your preferred level, goals, country and time zone. For teams, include participant numbers…" maxLength={LIMITS.message} value={f.message} onChange={set('message')}></textarea></div>
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}><label htmlFor="f-website">Leave this field empty</label><input ref={honeypot} id="f-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        {error && <p ref={errorRef} tabIndex={-1} className="form-note form-error" role="alert">{error}</p>}
        <button className="btn btn-coral" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : <>Submit enquiry <Arrow /></>}</button>
        <p className="form-note"><span className="req" aria-hidden="true">*</span> Required. Submitting emails your enquiry straight to Think Risk — nothing is stored on this website.</p>
      </form>

      <div id="email-sent" className="email-result" hidden={status !== 'sent'} aria-live="polite">
        <span className="kicker">Enquiry sent</span>
        <h3 ref={sentHeading} tabIndex={-1}>Thank you, we’ve received your enquiry.</h3>
        <p>Think Risk will be in touch at <strong>{f.email}</strong> to help you explore suitable courses and enrolment options.</p>
        <button type="button" className="link-btn" onClick={restart}>← Send another enquiry</button>
      </div>

    </div>
  );
}
