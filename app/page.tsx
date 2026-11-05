import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Bento, LevelFilterProvider, LevelToggle } from '@/components/Catalogue';
import { CourseFinder, FinderProvider } from '@/components/Finder';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "PECB Training | Think Risk International",
  description: "Self-paced online PECB certification training in business continuity, AI management systems and information security, for professionals and teams worldwide.",
  path: '/',
});

export default function Page() {
  return (
    <LevelFilterProvider><FinderProvider>
      <Hero>
        <div className="wrap hero-center">
          <span className="pill hero-fade" style={{'--d':'.05s'} as React.CSSProperties}><i>✓</i> PECB Authorized Partner · Certification training</span>
          <h1 className="split" aria-label="Build capability. Lead with confidence."><span aria-hidden="true"><span className="w" style={{'--i':'0'} as React.CSSProperties}>Build</span> <span className="w" style={{'--i':'1'} as React.CSSProperties}>capability.</span><br /><span className="w" style={{'--i':'2'} as React.CSSProperties}>Lead</span> <span className="w" style={{'--i':'3'} as React.CSSProperties}>with</span> <em className="w" style={{'--i':'4'} as React.CSSProperties}>confidence.</em></span></h1>
          <p className="hero-lead hero-fade" style={{'--d':'.85s'} as React.CSSProperties}>Self-paced PECB certification training in business continuity, AI management and information security.</p>
          <div className="hero-cta hero-fade" style={{'--d':'1.05s'} as React.CSSProperties}>
            <Link className="btn btn-coral btn-lg" href="/courses">Explore courses <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>    </div>
          <ul className="ticks hero-fade" style={{'--d':'1.2s'} as React.CSSProperties}>
            <li><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>Self-paced online</li>
            <li><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>Foundation to Lead Auditor</li>
            <li><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>Australia · Malaysia · Worldwide</li>
          </ul>
        </div>
      </Hero>

      <div className="puzzle-band"><div className="wrap reveal">
        <p>With <strong>Think Risk International</strong>, you learn from a <span className="accent">PECB Authorized Partner</span> offering online training in business continuity, AI management systems and information security — helping individuals and teams worldwide choose learning that supports their roles.</p>
      </div></div>

      <div className="wrap rail"><div className="rail-inner">
        <Link href="/courses#course-22301"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" /></svg></span><div><small>ISO 22301</small><strong>Business Continuity</strong></div><span className="arrow" aria-hidden="true">↗</span></Link>
        <Link href="/courses#course-42001"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="3" /><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" /></svg></span><div><small>ISO/IEC 42001</small><strong>AI Management Systems</strong></div><span className="arrow" aria-hidden="true">↗</span></Link>
        <Link href="/courses#course-27001"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg></span><div><small>ISO/IEC 27001</small><strong>Information Security</strong></div><span className="arrow" aria-hidden="true">↗</span></Link>
      </div></div>

      <section id="courses"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Course catalogue</span><h2>Choose your focus.<br /><em>Build your expertise.</em></h2></div>
          <div><p>Three standards, three levels. Pick the level that matches your role — prices update to your selected currency.</p>
            <LevelToggle style={{ marginTop: '18px' }} />
          </div>
        </div>
        <Bento page="index" />
        <p className="fine">Listed durations describe the course structure; self-paced study time may vary. Certification is subject to PECB examination and credential requirements.</p>
      </div></section>

      <section className="section-white" id="pathway"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Your certification pathway</span><h2>A clear path to<br /><em>your next step.</em></h2></div>
          <div><p>Start with the fundamentals, then build towards implementing or auditing a management system — at your own pace.</p><Link className="text-link" href="/pathway">See the full pathway →</Link></div>
        </div>
        <div className="steps">
          <div className="step reveal"><div className="step-n">1</div><h3>Foundation</h3><span>2-DAY STRUCTURE</span><p>Understand the standard and its main management system concepts.</p></div>
          <div className="step reveal"><div className="step-n">2</div><h3>Lead Implementer</h3><span>5-DAY STRUCTURE</span><p>Plan, implement and maintain a management system in your organisation.</p></div>
          <div className="step reveal"><div className="step-n">3</div><h3>Lead Auditor</h3><span>5-DAY STRUCTURE</span><p>Plan and conduct management system audits with confidence.</p></div>
          <div className="step reveal"><div className="step-n">✓</div><h3>Exam &amp; certification</h3><span>PECB CREDENTIAL</span><p>Sit the PECB exam online and apply for your professional credential.</p></div>
        </div>

        <CourseFinder id="finder" style={{ marginTop: '64px' }} text={{ heading: 'Not sure where to start?', intro: 'Choose a standard and level to see the course at a glance.', stdLabel: 'Standard', lvlLabel: 'Level', resultLabel: 'Recommended course' }} />
      </div></section>

      <section id="teams"><div className="wrap split split-center">
        <div className="reveal"><span className="kicker">For organisations</span><h2>A shared language.<br /><em>A stronger team.</em></h2><p className="lede">Give your people a common understanding of risk, governance and assurance. We’ll help you build a training pathway around the capabilities your organisation needs.</p><Link className="btn btn-navy" href="/training" style={{'marginTop':'30px'}}>Plan team training <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link></div>
        <div className="benefits">
          <div className="benefit reveal"><b>01</b><div><h3>A shared foundation</h3><p>Build understanding of the standards, concepts and responsibilities relevant to your organisation.</p></div></div>
          <div className="benefit reveal"><b>02</b><div><h3>Role-based pathways</h3><p>Match learning to the people implementing, managing and auditing your systems.</p></div></div>
          <div className="benefit reveal"><b>03</b><div><h3>Flexible online learning</h3><p>Develop capability across locations and time zones with self-paced study.</p></div></div>
        </div>
      </div></section>

      <section className="tight-top" id="why"><div className="wrap"><div className="why reveal">
        <span className="kicker">Why Think Risk</span>
        <h2>Knowledge with a <em>practical purpose.</em></h2>
        <div className="why-grid">
          <div className="why-item"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z" /></svg></span><h3>Australian-owned specialists</h3><p>Think Risk International Pty Ltd delivers risk, compliance and HSSEQ services to high-risk, highly regulated industries.</p></div>
          <div className="why-item"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M5 21v-1a7 7 0 0 1 14 0v1" /></svg></span><h3>PECB-accredited training</h3><p>Internationally recognised PECB courses, with full support from enrolment to exam preparation.</p></div>
          <div className="why-item"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg></span><h3>Regional presence</h3><p>Offices in Australia, the Philippines, Malaysia and the Middle East, with online learning available worldwide.</p></div>
          <div className="why-item"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 19V5m0 14h16M8 15l4-4 3 3 5-6" /></svg></span><h3>Industry experience</h3><p>Trusted from mining to maritime, including oil &amp; gas, aviation, logistics and manufacturing.</p></div>
        </div>
        <Link className="btn btn-ghost" href="/about">About Think Risk <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
      </div></div></section>

      <section className="tight-top" id="testimonials"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Trusted by industry leaders</span><h2>What our clients<br /><em>say about us.</em></h2></div>
          <div><p>From mining to maritime, clients rely on Think Risk International to keep their operations safe, compliant and resilient.</p><Link className="text-link" href="/about#who-we-are">About Think Risk International →</Link></div>
        </div>
        <div className="grid-3">
          <figure className="quote reveal"><blockquote>“Think Risk International guided us through a complex compliance audit with professionalism and clarity. Their insights helped us close gaps we didn’t even know existed.”</blockquote><figcaption><b>Michael Tan</b>Compliance Director, Pacific Marine Construction</figcaption></figure>
          <figure className="quote reveal"><blockquote>“Their HSSEQ specialists integrated seamlessly with our team and helped lift our safety performance across the board.”</blockquote><figcaption><b>Emily Wright</b>Safety Superintendent, Northern Gas Pty Ltd</figcaption></figure>
          <figure className="quote reveal"><blockquote>“The document management program they implemented transformed how we handle compliance records. Everything is easier to track, retrieve, and maintain.”</blockquote><figcaption><b>Rachel O’Connor</b>Operations Manager, AeroLink Aviation Services</figcaption></figure>
        </div>
        <p className="fine">Testimonials from clients of Think Risk International’s risk, compliance and HSSEQ services.</p>
      </div></section>

      <section className="tight-top" id="faq"><div className="wrap faq-grid">
        <div className="reveal"><span className="kicker">FAQs</span><h2>Questions before<br /><em>you enrol?</em></h2><p>Quick answers on study format, levels and examinations.</p><Link className="text-link" href="/faqs">See all FAQs →</Link></div>
        <div className="faq-list reveal">
          <details open><summary>How does self-paced online learning work?</summary><p>You study the course materials online at your own pace, around your work and other commitments. Listed durations describe the course structure; your study time may vary.</p></details>
          <details><summary>Which level should I start with?</summary><p>Foundation introduces the standard and its main concepts. Lead Implementer suits people who implement or manage a system; Lead Auditor suits those working in audit or assurance.</p></details>
          <details><summary>Does completing a course make me certified?</summary><p>Certification follows PECB’s examination and application process. Completing training alone does not guarantee certification.</p></details>
          <details><summary>Can you train a whole team?</summary><p>Yes. Tell us your team size, roles and locations and we’ll help you plan a pathway for your organisation.</p></details>
        </div>
      </div></section>
      <div className="cta"><div className="wrap"><div className="cta-box reveal">
        <div><h2>Ready to take your next step?</h2><p>Tell us what you want to achieve and we’ll help you find the right course or team training pathway.</p></div>
        <Link className="btn btn-navy" href="/contact">Submit an enquiry <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
      </div></div></div>
    </FinderProvider></LevelFilterProvider>
  );
}
