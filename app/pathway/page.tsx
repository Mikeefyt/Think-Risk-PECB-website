import type { Metadata } from 'next';
import Link from 'next/link';
import { CourseFinder, FinderProvider, PathwayPicker } from '@/components/Finder';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "Certification Pathway | Think Risk International",
  description: "Plan your PECB certification pathway: choose a standard and level, study online at your own pace, then follow the PECB examination and credential process.",
  path: '/pathway',
});

export default function Page() {
  return (
    <FinderProvider>
      <div className="page-hero" id="pathway"><div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Pathway</span></nav>
        <div className="page-hero-grid">
          <div><span className="kicker">Your certification journey</span><h1>A clear path.<br /><em>A purposeful next step.</em></h1><p className="hero-lead">Choose what you want to learn, build your knowledge at your pace, then follow the PECB examination and certification process.</p>
            <div className="hero-cta"><a className="btn btn-coral" href="#course-finder">Find your course <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></a><a className="btn btn-ghost" href="#credential-steps">How certification works</a></div></div>
          <div className="glass">
            <div className="glass-item"><b>01</b><div><h3>Find your standard</h3><p>Business continuity, AI management systems or information security.</p></div></div>
            <div className="glass-item"><b>02</b><div><h3>Choose your level</h3><p>Learn the foundations, build implementation skills or develop auditing knowledge.</p></div></div>
            <div className="glass-item"><b>03</b><div><h3>Learn on your terms</h3><p>Self-paced online training around your commitments.</p></div></div>
            <div className="glass-item"><b>04</b><div><h3>Follow the certification path</h3><p>Prepare for the exam and apply for the credential that fits your experience.</p></div></div>
          </div>
        </div>
      </div></div>

      <section id="training-pathways"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Professional development</span><h2>Choose your pathway.<br /><em>Build your expertise.</em></h2></div>
          <p>Learn the fundamentals, develop implementation knowledge or strengthen your audit skills. Choose the pathway that fits the work you want to do.</p>
        </div>
        <PathwayPicker />
        <p className="fine">These are learning options, not a mandatory sequence. Confirm prerequisites for your selected course. Completing training alone does not guarantee certification.</p>
      </div></section>

      <section className="section-white" id="course-finder"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">A practical place to start</span><h2>Your goal.<br /><em>Your next step.</em></h2></div>
          <p>You may be exploring a standard for the first time, taking responsibility for a management system or developing your audit skills. Start with the work you want to do.</p>
        </div>
        <CourseFinder text={{ heading: 'Course finder', intro: 'Choose your area of focus and what you’d like to do.', stdLabel: '01 — Your area of focus', lvlLabel: '02 — What would you like to do?', resultLabel: 'A pathway to explore' }} />
        <p className="fine">Confirm prerequisites, current fees and inclusions before enrolling. Certification is subject to PECB’s examination and credential requirements.</p>
      </div></section>

      <section id="compare-pathways"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Choose your direction</span><h2>Match the learning<br /><em>to your role.</em></h2></div>
          <div><p>The levels have different purposes. Use your responsibilities and existing knowledge to guide your choice.</p><Link className="text-link" href="/courses">View the course catalogue →</Link></div>
        </div>
        <div className="table-wrap reveal" role="region" aria-label="Learning pathway comparison" tabIndex={0}>
          <table>
            <caption>Compare the three learning levels</caption>
            <thead><tr><th scope="col">Your goal</th><th scope="col">Pathway</th><th scope="col">Learning focus</th></tr></thead>
            <tbody>
              <tr><th scope="row">Understand the standard</th><td><span className="tag">Foundation</span></td><td>Main concepts, terminology and management system requirements.</td></tr>
              <tr><th scope="row">Establish or manage a system</th><td><span className="tag">Lead Implementer</span></td><td>Planning, implementation, monitoring and continual improvement.</td></tr>
              <tr><th scope="row">Assess a system against requirements</th><td><span className="tag">Lead Auditor</span></td><td>Audit principles, preparation, evidence, findings and reporting.</td></tr>
            </tbody>
          </table>
        </div>
        <p className="fine">Lead course entry requirements vary. Review your selected course’s prerequisites and discuss your existing knowledge with Think Risk.</p>
      </div></section>

      <section className="section-white" id="study-preparation"><div className="wrap split">
        <div className="reveal"><span className="kicker">Study at your pace</span><h2>Make room for<br /><em>your learning.</em></h2><p className="lede">Self-paced learning works best with a realistic study plan. The catalogue’s day counts describe course structure; your own study schedule may take longer.</p>
          <ul className="checklist">
            <li>Set regular study sessions around your work and other commitments.</li>
            <li>Review the course access period and learning format before enrolling.</li>
            <li>Keep notes on concepts you want to apply in your role.</li>
            <li>Allow time for revision before booking an examination.</li>
          </ul></div>
        <aside className="panel-navy reveal"><span className="eyebrow">Before your online exam</span><h3>Prepare your setup early.</h3><p>Read the instructions for your selected examination, check the required equipment and run the PECB Exams application compatibility check before exam day.</p><p>The check includes your camera, microphone and screen sharing. Leave time to resolve any issues.</p><a className="btn btn-coral" style={{'marginTop':'26px','alignSelf':'flex-start'}} href="https://help.pecb.com/mypecb-member/pecb-exams-application/how-do-i-check-if-my-system-is-compatible-with-the-pecb-exams-application/" target="_blank" rel="noopener">PECB compatibility guidance ↗<span className="visually-hidden"> (opens in a new tab)</span></a></aside>
      </div></section>

      <section id="credential-steps"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">After your training</span><h2>Understand the<br /><em>credential process.</em></h2></div>
          <p>Course completion and certification are separate steps. PECB sets the examination, experience and application requirements for each credential.</p>
        </div>
        <div className="steps">
          <div className="step reveal"><div className="step-n">1</div><h3>Demonstrate your knowledge</h3><span>EXAMINATION</span><p>Schedule your online examination through myPECB. Choose an available session and follow the instructions for your course.</p></div>
          <div className="step reveal"><div className="step-n">2</div><h3>Apply for the right credential</h3><span>APPLICATION</span><p>After passing, submit an application that meets the requirements for the credential you seek.</p></div>
          <div className="step reveal"><div className="step-n">3</div><h3>Keep your credential current</h3><span>MAINTENANCE</span><p>Review PECB’s maintenance rules, including any professional development and renewal requirements.</p></div>
          <div className="step reveal"><div className="step-n">✓</div><h3>Keep growing</h3><span>NEXT STEP</span><p>Build on your credential with another level or standard when you’re ready.</p></div>
        </div>
        <div className="link-list reveal"><span>OFFICIAL PECB GUIDANCE</span>
          <a className="chip" href="https://help.pecb.com/mypecb-member/examination/how-do-i-schedule-a-pecb-online-exam-after-attending-a-training/" target="_blank" rel="noopener">Online exam booking ↗<span className="visually-hidden"> (opens in a new tab)</span></a>
          <a className="chip" href="https://pecb.com/en/certification-rules-and-policies" target="_blank" rel="noopener">Certification rules ↗<span className="visually-hidden"> (opens in a new tab)</span></a>
          <a className="chip" href="https://pecb.com/en/certification-maintenance-policy" target="_blank" rel="noopener">Credential maintenance ↗<span className="visually-hidden"> (opens in a new tab)</span></a>
          <a className="chip" href="https://pecb.com" target="_blank" rel="noopener">Explore PECB ↗<span className="visually-hidden"> (opens in a new tab)</span></a>
        </div>
      </div></section>

      <section className="tight-top" id="getting-started"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Where to start</span><h2>A learning goal.<br /><em>A practical next step.</em></h2></div>
          <div><p>Not sure yet? Work through these three questions, then talk to us.</p><a className="text-link" href="#compare-pathways">Compare your learning pathways →</a></div>
        </div>
        <div className="grid-3">
          <div className="tile reveal"><span className="num">01</span><h3>Identify your focus</h3><p>Which area matters to your role: continuity, AI management or information security?</p></div>
          <div className="tile reveal"><span className="num">02</span><h3>Consider your experience</h3><p>Are you building awareness, supporting implementation or evaluating a system?</p></div>
          <div className="tile reveal"><span className="num">03</span><h3>Confirm before you enrol</h3><p>Discuss the learning format, current fees, course access and examination arrangements with Think Risk.</p></div>
        </div>
      </div></section>
      <div className="cta"><div className="wrap"><div className="cta-box reveal">
        <div><h2>Let’s find your way forward.</h2><p>Tell us what you want to achieve and we’ll help you find the right course or team training pathway.</p></div>
        <Link className="btn btn-navy" href="/contact">Submit an enquiry <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
      </div></div></div>
    </FinderProvider>
  );
}
