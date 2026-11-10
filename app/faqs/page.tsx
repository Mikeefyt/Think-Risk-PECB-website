import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions | Think Risk International",
  description: "Answers about choosing a PECB course level, self-paced online study, PECB examinations and certification, and sending a training enquiry to Think Risk International.",
  path: '/faqs',
});

export default function Page() {
  return (
    <>
      <div className="page-hero" id="faq"><div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">FAQs</span></nav>
        <div className="page-hero-grid">
          <div><span className="kicker">A few things to know</span><h1>Your questions,<br /><em>answered.</em></h1><p className="hero-lead">Choosing a level, studying online, booking your PECB exam and sending an enquiry — it’s all here.</p></div>
        </div>
      </div></div>

      <section><div className="wrap faq-grid">
        <aside className="faq-side">
          <span className="kicker">Topics</span>
          <nav aria-label="FAQ topics"><a href="#choosing">Choosing &amp; planning</a><a href="#studying">Studying &amp; examination</a><a href="#enquiries">Enquiries &amp; next steps</a></nav>
          <div className="help-card"><strong>Need help choosing?</strong><p>Tell us your role and goals and we’ll suggest a pathway.</p><a className="btn btn-coral btn-sm" href="mailto:pecb@thinkrisk.com.au">Talk to Think Risk ↗</a></div>
        </aside>
        <div className="faq-list">
          <div className="faq-group" id="choosing"><h2>Choosing &amp; planning your training</h2>
            <details><summary>Which course level should I choose?</summary><p>Foundation introduces the standard and key concepts. Lead Implementer focuses on establishing and managing the system. Lead Auditor focuses on assessing conformity and auditing. Tell us about your role and experience so we can help you choose.</p></details>
            <details><summary>How are the courses delivered?</summary><p>The courses in this catalogue are self-paced and online. You can study around your commitments. Ask us to confirm the learning format, access period and available support for your chosen course.</p></details>
            <details><summary>Does completing a course make me certified?</summary><p>Certification follows PECB’s examination and application process. The credential awarded depends on the relevant requirements, which can include work experience and project or audit experience. Completing training alone does not guarantee certification.</p></details>
            <details><summary>Can we arrange training for a team?</summary><p>Yes. For team training, include your participant numbers, roles and learning goals in your enquiry. <Link href="/training">Explore team training</Link></p></details>
            <details><summary>What is included in the course price?</summary><p>Enquire about the fees and package inclusions for your selected course.</p></details>
          </div>
          <div className="faq-group" id="studying"><h2>Studying &amp; examination</h2>
            <details><summary>How long can I access the course materials?</summary><p>Course material access and examination deadlines are separate. Enquire about the access terms for your selected course.</p></details>
            <details><summary>How much time should I allow for self-paced study?</summary><p>The day counts in the catalogue describe the course structure. Your study time will depend on your experience and schedule. Allow time to work through the material, revisit difficult topics and prepare for the examination. Confirm the access period before enrolling.</p></details>
            <details><summary>Do I have to complete Foundation before a Lead course?</summary><p>Foundation can be useful when you are new to a standard. Entry requirements for a Lead course depend on the selected training. Review the prerequisites and discuss your existing knowledge with Think Risk.</p></details>
            <details><summary>How do I book an online PECB examination?</summary><p>Schedule your examination through myPECB and choose an available language, date and session. Follow PECB’s booking instructions for your selected course. <a href="https://help.pecb.com/mypecb-member/examination/how-do-i-schedule-a-pecb-online-exam-after-attending-a-training/" target="_blank" rel="noopener">Read the booking guidance ↗<span className="visually-hidden"> (opens in a new tab)</span></a></p></details>
            <details><summary>Where can I check the examination format?</summary><p>Use PECB’s official exam list to check the format, duration, language and other details for your selected standard and level. Confirm the applicable exam arrangements before booking. <a href="https://help.pecb.com/list-of-pecb-exams/" target="_blank" rel="noopener">View the PECB exam list ↗<span className="visually-hidden"> (opens in a new tab)</span></a></p></details>
            <details><summary>How do I prepare my device for an online examination?</summary><p>Read PECB’s technical guidance and run the compatibility check in the PECB Exams application before exam day. This checks items such as your camera, microphone and screen sharing. <a href="https://help.pecb.com/mypecb-member/pecb-exams-application/how-do-i-check-if-my-system-is-compatible-with-the-pecb-exams-application/" target="_blank" rel="noopener">Read the compatibility guidance ↗<span className="visually-hidden"> (opens in a new tab)</span></a></p></details>
          </div>
          <div className="faq-group" id="enquiries"><h2>Enquiries &amp; next steps</h2>
            <details><summary>Can I enquire from outside Australia or Malaysia?</summary><p>Yes. You can enquire from any location. Include your country and time zone so we can discuss the course and practical arrangements with you.</p></details>
            <details><summary>Which currency will I see?</summary><p>Select AUD, MYR or USD at the top of any page to view catalogue prices in Australian dollars, Malaysian ringgit or US dollars. These are pricing currencies, not restrictions on your location. Your selection is remembered in this browser. Confirm the current fees and tax treatment with Think Risk.</p></details>
            <details><summary>What should I include in a training enquiry?</summary><p>Include the standard and level you are considering, your role, country, preferred pricing currency and goals. For team training, add the approximate number of participants and preferred timing. If you are unsure of the level, describe the work you want to support.</p></details>
            <details><summary>What happens after I send an enquiry?</summary><p>We’ll help you explore suitable courses and enrolment options based on your training goals.</p></details>
            <details><summary>What happens when I select Submit Enquiry?</summary><p>Your enquiry is emailed straight to Think Risk at pecb@thinkrisk.com.au, so there is nothing else to send. You’ll see a confirmation once it has been sent. If something goes wrong, the form shows a message and keeps what you typed so you can try again, or you can email pecb@thinkrisk.com.au directly.</p></details>
          </div>
        </div>
      </div></section>
      <div className="cta"><div className="wrap"><div className="cta-box reveal">
        <div><h2>Still have a question?</h2><p>Tell us what you want to achieve and we’ll help you find the right course or team training pathway.</p></div>
        <Link className="btn btn-navy" href="/contact">Ask Think Risk <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
      </div></div></div>
    </>
  );
}
