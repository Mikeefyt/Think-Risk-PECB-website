import type { Metadata } from 'next';
import Link from 'next/link';
import { Bento, LevelFilterProvider, LevelToggle } from '@/components/Catalogue';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "PECB Courses | Think Risk International",
  description: "Self-paced online PECB courses in ISO 22301 business continuity, ISO/IEC 42001 AI management systems and ISO/IEC 27001 information security, with Foundation, Lead Implementer and Lead Auditor levels.",
  path: '/courses',
});

export default function Page() {
  return (
    <LevelFilterProvider>
      <div className="page-hero"><div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Courses</span></nav>
        <div className="page-hero-grid">
          <div><span className="kicker">Course catalogue</span><h1>Choose your focus.<br /><em>Build your expertise.</em></h1><p className="hero-lead">Self-paced online PECB training in business continuity, AI management systems and information security. Select a level to see its focus, who it’s for and the listed fee.</p></div>
          <div><p style={{'color':'#b8c4d6','fontSize':'14px','marginBottom':'12px'}}>Filter by level</p><LevelToggle /></div>
        </div>
      </div></div>

      <section id="courses" style={{'paddingTop':'0'}}><div className="wrap overlap">
        <Bento page="courses" />
        <p className="fine">Listed durations describe the course structure; self-paced study time may vary. Enquire about current fees and package inclusions. Certification is subject to PECB examination and credential requirements.</p>
      </div></section>

      <section className="section-white" id="course-focus"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Explore the standards</span><h2>Three areas of focus.<br /><em>Knowledge with a purpose.</em></h2></div>
          <p>The subject areas covered by Think Risk’s PECB course catalogue.</p>
        </div>
        <div className="rows reveal">
          <div className="row"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" /></svg></span><div><small>ISO 22301</small><h3>Business continuity</h3><p>Explore business continuity principles, business impact analysis, continuity strategies and planning. Build understanding of how a management system supports preparation for disruption and continual improvement.</p></div><a className="btn btn-outline btn-sm" href="#course-22301">View levels</a></div>
          <div className="row"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="3" /><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" /></svg></span><div><small>ISO/IEC 42001</small><h3>AI management systems</h3><p>Explore AI management concepts, governance, accountability and risk. Develop knowledge of the responsibilities and processes used to manage and evaluate an AI management system.</p></div><a className="btn btn-outline btn-sm" href="#course-42001">View levels</a></div>
          <div className="row"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg></span><div><small>ISO/IEC 27001</small><h3>Information security</h3><p>Explore information security principles, risk management and controls. Build knowledge of a systematic approach to managing information security and evaluating conformity.</p></div><a className="btn btn-outline btn-sm" href="#course-27001">View levels</a></div>
        </div>
        <div className="note reveal"><b aria-hidden="true">?</b><span>Need help choosing a level or planning your study? <Link href="/pathway#training-pathways">Explore your pathway</Link> or use the <Link href="/pathway#course-finder">course finder</Link>.</span></div>
      </div></section>

      <section id="course-enquiry"><div className="wrap">
        <div className="grid-3">
          <div className="tile reveal"><span className="num">01</span><h3>Choose a standard and level</h3><p>Select any level on a course card to see its focus, audience and listed fee.</p></div>
          <div className="tile reveal"><span className="num">02</span><h3>Send your enquiry</h3><p>Tell us the course you’re interested in. Think Risk can confirm current availability, fees and inclusions.</p></div>
          <div className="tile reveal"><span className="num">03</span><h3>Start learning</h3><p>Study online at your own pace, then follow PECB’s examination and certification process.</p></div>
        </div>
      </div></section>
      <div className="cta"><div className="wrap"><div className="cta-box reveal">
        <div><h2>Ask about your selected course.</h2><p>Tell us what you want to achieve and we’ll help you find the right course or team training pathway.</p></div>
        <Link className="btn btn-navy" href="/contact">Submit a course enquiry <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
      </div></div></div>
    </LevelFilterProvider>
  );
}
