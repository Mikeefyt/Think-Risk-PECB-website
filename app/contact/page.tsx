import type { Metadata } from 'next';
import Link from 'next/link';
import { EnquiryForm } from '@/components/EnquiryForm';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "Contact & Training Enquiries | Think Risk International",
  description: "Send a PECB training enquiry to Think Risk International. Tell us your goals and we’ll help you find the right course or team training pathway.",
  path: '/contact',
});

export default function Page() {
  return (
    <>
      <div className="page-hero" id="contact"><div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Contact</span></nav>
        <div className="page-hero-grid" style={{'alignItems':'start'}}>
          <div><span className="kicker">Take your next step</span><h1>Let’s find your<br /><em>way forward.</em></h1><p className="hero-lead">Enquire from any location. Tell us about your goals and we’ll help you explore suitable courses and team training options.</p>
            <div className="contact-points">
              <div className="contact-point"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg></span><div><small>EMAIL US DIRECTLY</small><a href="mailto:pecb@thinkrisk.com.au">pecb@thinkrisk.com.au</a></div></div>
              <div className="contact-point"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg></span><div><small>WHERE WE WORK</small><strong>Australia · Malaysia · Worldwide online</strong></div></div>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </div></div>

      <section id="enquiry-guide"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Help us understand your goals</span><h2>A few details make<br /><em>a useful enquiry.</em></h2></div>
        </div>
        <div className="grid-3">
          <div className="tile reveal"><span className="num">01</span><h3>For your own development</h3><p>Tell us your role, the standard that interests you and whether you want to build awareness, implementation knowledge or audit skills.</p></div>
          <div className="tile reveal"><span className="num">02</span><h3>For your organisation</h3><p>Include your team size, participant responsibilities and locations, relevant time zones and preferred start period.</p></div>
          <div className="tile reveal"><span className="num">03</span><h3>Before enrolling</h3><p>Ask about the current fees, course prerequisites, learning format, access period and examination arrangements.</p></div>
        </div>
      </div></section>

      <section className="section-white" id="send-your-enquiry"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">How to send</span><h2>Complete. Submit.<br /><em>Hear from Think Risk.</em></h2></div>
          <div><p>Still exploring? Our FAQs explain study formats, course levels and the enquiry process.</p><Link className="text-link" href="/faqs">Read the FAQs →</Link></div>
        </div>
        <div className="steps">
          <div className="step reveal"><div className="step-n">1</div><h3>Complete the form</h3><p>Add your contact details and training goals.</p></div>
          <div className="step reveal"><div className="step-n">2</div><h3>Select Submit enquiry</h3><p>Your enquiry is emailed straight to Think Risk.</p></div>
          <div className="step reveal"><div className="step-n">3</div><h3>Look for the confirmation</h3><p>You’ll see a message as soon as your enquiry has been sent.</p></div>
          <div className="step reveal"><div className="step-n">✓</div><h3>We’ll be in touch</h3><p>Think Risk will help you explore suitable courses and enrolment options.</p></div>
        </div>
      </div></section>
      <div className="cta"><div className="wrap"><div className="cta-box reveal">
        <div><h2>Prefer to browse first?</h2><p>Tell us what you want to achieve and we’ll help you find the right course or team training pathway.</p></div>
        <Link className="btn btn-navy" href="/courses">Explore the courses <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
      </div></div></div>
    </>
  );
}
