import type { Metadata } from 'next';
import Link from 'next/link';
import { AddButton } from '@/components/plan';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: "Team & Corporate Training | Think Risk International",
  description: "PECB training pathways for teams. Give your people a shared language for risk, governance and assurance with role-based, self-paced online learning.",
  path: '/training',
});

export default function Page() {
  return (
    <>
      <div className="page-hero" id="corporate"><div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Team training</span></nav>
        <div className="page-hero-grid">
          <div><span className="kicker">Corporate training</span><h1>Stronger people.<br /><em>More resilient organisations.</em></h1><p className="hero-lead">Give your team a shared language for risk, governance and assurance. Develop a training pathway around the capabilities your organisation needs.</p>
            <div className="hero-cta"><Link className="btn btn-coral" href="/contact?interest=Corporate%20%2F%20team%20training">Discuss team training <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link><AddButton item="team-training" className="btn btn-ghost">Add to plan</AddButton></div></div>
          <div className="glass">
            <div className="glass-item"><b>01</b><div><h3>A common foundation</h3><p>Build a shared understanding of the standard and its application to your organisation.</p></div></div>
            <div className="glass-item"><b>02</b><div><h3>The right depth for each role</h3><p>Match Foundation, Lead Implementer and Lead Auditor pathways to your team’s responsibilities.</p></div></div>
            <div className="glass-item"><b>03</b><div><h3>Flexible online learning</h3><p>Support professional development across locations with self-paced online access.</p></div></div>
          </div>
        </div>
      </div></div>

      <section id="team-plan"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Plan with your people in mind</span><h2>Different responsibilities.<br /><em>A shared direction.</em></h2></div>
          <p>Use Think Risk’s course pathways to develop knowledge at the depth each person needs.</p>
        </div>
        <div className="table-wrap reveal" role="region" aria-label="Team training planning guide" tabIndex={0}>
          <table>
            <caption>A starting point for team training discussions</caption>
            <thead><tr><th scope="col">Team responsibility</th><th scope="col">Learning goal</th><th scope="col">Pathway to discuss</th></tr></thead>
            <tbody>
              <tr><th scope="row">Staff supporting the system</th><td>Understand common terms, requirements and responsibilities.</td><td><span className="tag">Foundation</span></td></tr>
              <tr><th scope="row">System owners and implementation teams</th><td>Develop knowledge to establish, manage and improve the system.</td><td><span className="tag">Lead Implementer</span></td></tr>
              <tr><th scope="row">Audit and assurance teams</th><td>Develop knowledge to evaluate conformity using audit evidence.</td><td><span className="tag">Lead Auditor</span></td></tr>
            </tbody>
          </table>
        </div>
        <p className="fine">This is a planning guide. Confirm course prerequisites and suitability for each participant before enrolment.</p>
      </div></section>

      <section className="section-white" id="training-brief"><div className="wrap split">
        <div className="reveal"><span className="kicker">Start the conversation</span><h2>Tell us about<br /><em>your team.</em></h2><p className="lede">A clear brief helps Think Risk discuss suitable pathways and confirm the arrangements for your organisation.</p><Link className="btn btn-navy" href="/contact?interest=Corporate%20%2F%20team%20training" style={{'marginTop':'30px'}}>Send a team enquiry <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link></div>
        <div className="grid-2">
          <div className="tile reveal"><span className="num">01</span><h3>People &amp; responsibilities</h3><p>Approximate participant numbers, roles and current familiarity with the standard.</p></div>
          <div className="tile reveal"><span className="num">02</span><h3>Learning goals</h3><p>The standard of interest and the work your team needs to support.</p></div>
          <div className="tile reveal"><span className="num">03</span><h3>Timing &amp; location</h3><p>Your preferred start period, participants’ countries and relevant time zones.</p></div>
          <div className="tile reveal"><span className="num">04</span><h3>Practical arrangements</h3><p>Budget, invoicing needs and questions about course access or examinations.</p></div>
        </div>
      </div></section>

      <section id="apply-learning"><div className="wrap"><div className="why reveal">
        <span className="kicker">Back in the workplace</span>
        <h2>Give the learning <em>a place to work.</em></h2>
        <div className="why-grid cols-3">
          <div className="why-item"><span className="num">01</span><h3>Agree on a purpose</h3><p>Before training, identify the decisions or responsibilities each participant wants to understand better.</p></div>
          <div className="why-item"><span className="num">02</span><h3>Make time to reflect</h3><p>Discuss how course concepts relate to your organisation’s existing processes and documented information.</p></div>
          <div className="why-item"><span className="num">03</span><h3>Review the next step</h3><p>After learning, identify practical development goals and any further experience needed for a credential.</p></div>
        </div>
      </div></div></section>
      <div className="cta"><div className="wrap"><div className="cta-box reveal">
        <div><h2>Let’s plan your team’s training.</h2><p>Tell us what you want to achieve and we’ll help you find the right course or team training pathway.</p></div>
        <Link className="btn btn-navy" href="/contact">Send a team enquiry <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg></Link>
      </div></div></div>
    </>
  );
}
