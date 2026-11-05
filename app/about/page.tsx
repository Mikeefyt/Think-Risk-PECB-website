import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "About Us | Think Risk International",
  description: "Think Risk International is a PECB Authorized Partner offering online training in business continuity, AI management systems and information security for individuals and teams worldwide.",
  path: '/about',
});

export default function Page() {
  return (
    <>
      <div className="page-hero" id="about"><div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About us</span></nav>
        <div className="page-hero-grid">
          <div><span className="kicker">Why Think Risk International</span><h1>Knowledge with<br /><em>real-world purpose.</em></h1><p className="hero-lead">Think Risk International Pty Ltd is an Australian-owned company helping organisations meet their compliance and risk management needs. As a PECB Authorized Partner, we also deliver accredited online training so clients and their teams stay current with international standards.</p>
            <div className="hero-cta"><Link className="btn btn-coral" href="/contact">Find the right fit for you <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link></div></div>
          <div className="glass">
            <div className="glass-item"><b>AU</b><div><h3>Australian-owned</h3><p>Australian oversight with the efficiency of regional support teams.</p></div></div>
            <div className="glass-item"><b>4</b><div><h3>Regional offices</h3><p>Australia, the Philippines, Malaysia and the Middle East.</p></div></div>
            <div className="glass-item"><b>✓</b><div><h3>Full training support</h3><p>From enrolment to exam preparation, supported by our training team.</p></div></div>
          </div>
        </div>
      </div></div>

      <section id="who-we-are"><div className="wrap split">
        <div className="reveal"><span className="kicker">Who we are</span><h2>Risk and compliance<br /><em>experts first.</em></h2>
          <p className="lede">We specialise in supporting organisations across high-risk and highly regulated industries. Our team understands the operational pressures and compliance challenges in these sectors — and brings that practical perspective to every PECB course we deliver.</p>
          <a className="text-link" href="https://thinkrisk.com.au/about" target="_blank" rel="noopener">More about Think Risk International ↗<span className="visually-hidden"> (opens in a new tab)</span></a></div>
        <div className="reveal">
          <p className="list-title">Industries we serve</p>
          <ul className="chips"><li>Mining</li><li>Oil &amp; Gas</li><li>Marine Construction</li><li>Maritime / Shipping Compliance</li><li>Logistics</li><li>Aviation</li><li>Sub-Sea Mooring Systems</li><li>Manufacturing</li></ul>
          <p className="list-title">What we deliver</p>
          <ul className="checklist cols-2"><li>HSSEQ specialist resourcing</li><li>Compliance auditing</li><li>Management system gap assessments</li><li>Document management programs</li><li>Remote root cause analysis</li><li>Virtual administration services</li><li>PECB accredited online training</li><li>NEBOSH courses</li></ul>
        </div>
      </div></section>

      <section className="section-white" id="testimonials"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Trusted by industry leaders</span><h2>What our clients<br /><em>say about us.</em></h2></div>
          <p>From mining to maritime, clients rely on Think Risk International to keep their operations safe, compliant and resilient.</p>
        </div>
        <div className="grid-3">
          <figure className="quote reveal"><blockquote>“Think Risk International guided us through a complex compliance audit with professionalism and clarity. Their insights helped us close gaps we didn’t even know existed.”</blockquote><figcaption><b>Michael Tan</b>Compliance Director, Pacific Marine Construction</figcaption></figure>
          <figure className="quote reveal"><blockquote>“Their HSSEQ specialists integrated seamlessly with our team and helped lift our safety performance across the board.”</blockquote><figcaption><b>Emily Wright</b>Safety Superintendent, Northern Gas Pty Ltd</figcaption></figure>
          <figure className="quote reveal"><blockquote>“The document management program they implemented transformed how we handle compliance records. Everything is easier to track, retrieve, and maintain.”</blockquote><figcaption><b>Rachel O’Connor</b>Operations Manager, AeroLink Aviation Services</figcaption></figure>
        </div>
        <p className="fine">Testimonials from clients of Think Risk International’s risk, compliance and HSSEQ services.</p>
      </div></section>

      <section id="our-focus"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Our training focus</span><h2>Three disciplines.<br /><em>Everyday business relevance.</em></h2></div>
          <p>Each discipline is offered at Foundation, Lead Implementer and Lead Auditor level.</p>
        </div>
        <div className="grid-3">
          <Link className="tile reveal" href="/courses#course-22301"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" /></svg></span><span className="num">ISO 22301</span><h3>Business continuity</h3><p>Understand how a management system helps an organisation prepare for disruption and maintain its critical activities.</p><span className="text-link">Explore courses →</span></Link>
          <Link className="tile reveal" href="/courses#course-42001"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="3" /><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" /></svg></span><span className="num">ISO/IEC 42001</span><h3>AI management systems</h3><p>Explore the governance, responsibilities and risk considerations involved in managing AI within an organisation.</p><span className="text-link">Explore courses →</span></Link>
          <Link className="tile reveal" href="/courses#course-27001"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg></span><span className="num">ISO/IEC 27001</span><h3>Information security</h3><p>Build understanding of a systematic approach to information security risk, management and assurance.</p><span className="text-link">Explore courses →</span></Link>
        </div>
      </div></section>

      <section className="section-white" id="people-and-teams"><div className="wrap split">
        <div className="reveal"><span className="kicker">For people and teams</span><h2>Professional growth<br /><em>with a clear purpose.</em></h2><p className="lede">Think Risk’s online training pathways support professionals and organisations worldwide. Choose your next step around your current role, your knowledge and the capabilities you want to develop.</p></div>
        <div className="benefits">
          <div className="benefit reveal"><b>01</b><div><h3>For individual professionals</h3><p>Explore the catalogue, compare the learning levels and discuss which pathway fits your development goals.</p><Link className="text-link" href="/pathway" style={{'marginTop':'10px'}}>Plan your pathway →</Link></div></div>
          <div className="benefit reveal"><b>02</b><div><h3>For organisations</h3><p>Consider the knowledge your team needs to support implementation, management and assurance responsibilities.</p><Link className="text-link" href="/training" style={{'marginTop':'10px'}}>Explore team training →</Link></div></div>
        </div>
      </div></section>

      <section id="training-and-certification"><div className="wrap">
        <div className="panel-navy reveal" style={{'padding':'48px'}}>
          <span className="eyebrow">Training &amp; certification</span>
          <h3 style={{'maxWidth':'640px','fontSize':'clamp(26px,3vw,36px)'}}>Know what each step means.</h3>
          <p style={{'maxWidth':'720px','fontSize':'16px'}}>Think Risk is your contact for the training enquiry. PECB sets the examination and credential requirements. Completing a course builds knowledge; the credential you can obtain depends on meeting the applicable requirements.</p>
          <Link className="btn btn-coral" style={{'marginTop':'26px','alignSelf':'flex-start'}} href="/pathway#credential-steps">Understand the process <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
        </div>
      </div></section>

      <section className="tight-top" id="learning-purpose"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Learning with purpose</span><h2>Bring better questions<br /><em>to your work.</em></h2></div>
          <p>Management system knowledge helps you understand responsibilities, assess evidence and make informed decisions.</p>
        </div>
        <div className="grid-3">
          <div className="tile reveal"><span className="num">01</span><h3>Understand the requirements</h3><p>Connect a standard’s concepts with the processes, responsibilities and records used in an organisation.</p></div>
          <div className="tile reveal"><span className="num">02</span><h3>Build confidence in your role</h3><p>Choose learning that supports your contribution to implementation, management or assurance.</p></div>
          <div className="tile reveal"><span className="num">03</span><h3>Plan your professional development</h3><p>Identify your current knowledge, your next learning goal and the credential requirements relevant to you.</p></div>
        </div>
      </div></section>
      <div className="cta"><div className="wrap"><div className="cta-box reveal">
        <div><h2>Let’s find the right fit for you.</h2><p>Tell us what you want to achieve and we’ll help you find the right course or team training pathway.</p></div>
        <Link className="btn btn-navy" href="/contact">Submit an enquiry <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
      </div></div></div>
    </>
  );
}
