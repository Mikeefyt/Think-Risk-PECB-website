import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/icons';
import { AddButton, Price } from '@/components/plan';
import { courseHref, courseId, courses, findCourse, goal, levels, SITE_URL, standards, type Level, type Standard } from '@/lib/courses';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => courses.map(c => ({ slug: c.id }));

const description = (s: Standard, l: Level) =>
  `Self-paced online PECB ${s.code} ${l.name} training in ${s.title === 'AI Management Systems' ? 'AI management systems' : s.title.toLowerCase()}: course focus, who it's for, listed fee and the PECB exam and certification process.`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = findCourse((await params).slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.standard.code} ${c.level.name} | PECB Training | Think Risk International`,
    description: description(c.standard, c.level),
    path: `/courses/${c.id}`,
  });
}

/** schema.org Course structured data for Google */
function courseJsonLd(s: Standard, l: Level) {
  const url = `${SITE_URL}${courseHref(s, l)}`;
  const offer = (cur: 'AUD' | 'MYR', price: number) => ({ '@type': 'Offer', category: 'Paid', price, priceCurrency: cur, url });
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${s.code} ${l.name}`,
    description: description(s, l),
    url,
    image: `${SITE_URL}/assets/img/${s.photo}`,
    inLanguage: 'en',
    availableLanguage: ['en'],
    about: `${s.code} ${s.title}`,
    provider: { '@type': 'Organization', name: 'Think Risk International', legalName: 'Think Risk International Pty Ltd', url: 'https://thinkrisk.com.au/' },
    offers: [offer('AUD', l.num.AU), offer('MYR', l.num.MY)],
    hasCourseInstance: [{ '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: `P${l.days}D` }],
  };
}

export default async function CoursePage({ params }: Props) {
  const c = findCourse((await params).slug);
  if (!c) notFound();
  const { standard: s, level: l, id } = c;
  const ask = '/contact?' + new URLSearchParams({ interest: `${s.code} ${s.title}`, level: l.name }).toString();
  // Related: the other levels of this standard, then this level in the other standards
  const related = [
    ...levels.filter(x => x.name !== l.name).map(x => ({ s, l: x })),
    ...standards.filter(x => x.id !== s.id).map(x => ({ s: x, l })),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd(s, l)).replace(/</g, '\\u003c') }} />
      <div className="page-hero course-hero"><div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/courses">Courses</Link><span aria-hidden="true">/</span><span aria-current="page">{s.code} {l.name}</span></nav>
        <div className="page-hero-grid course-hero-grid">
          <div>
            <span className="kicker">{s.code} · PECB certification training</span>
            <h1>{l.name}<br /><em>{s.title}</em></h1>
            <p className="hero-lead">{goal(l.name, s)}</p>
            <div className="hero-cta">
              <AddButton item={id} className="btn btn-coral">Add to learning plan <Arrow /></AddButton>
              <Link className="btn btn-ghost" href={ask}>Ask a question</Link>
            </div>
          </div>
          <div className="course-visual">
            <div className="course-photo"><img src={`/assets/img/${s.photo}`} alt={s.alt} width={800} height={500} /></div>
            <dl className="course-facts">
              <div><dt>Listed fee</dt><dd><b><Price item={id} /></b></dd></div>
              <div><dt>Format</dt><dd>Self-paced online</dd></div>
              <div><dt>Course structure</dt><dd>{l.days}-day</dd></div>
              <div><dt>Certification</dt><dd>PECB exam &amp; credential</dd></div>
            </dl>
          </div>
        </div>
      </div></div>

      <section id="overview"><div className="wrap split">
        <div className="reveal">
          <span className="kicker">What you’ll learn</span>
          <h2>Course <em>focus.</em></h2>
          <p className="lede">{s.lede}</p>
          <ul className="checklist">
            {[...s.focus, l.focus].map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="course-side">
          <div className="tile reveal"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M5 21v-1a7 7 0 0 1 14 0v1" /></svg></span><h3>Who this course is for</h3><p>{l.audience}</p></div>
          <div className="tile reveal"><span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M9 11l3 3 8-8" /><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" /></svg></span><h3>Before you enrol</h3><p>{l.before}</p></div>
        </div>
      </div></section>

      <section className="section-white" id="certification"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">After your training</span><h2>Exam &amp;<br /><em>certification.</em></h2></div>
          <div><p>Course completion and certification are separate steps. PECB sets the examination, experience and application requirements for each credential.</p><Link className="text-link" href="/pathway#credential-steps">See the full certification pathway →</Link></div>
        </div>
        <div className="steps">
          <div className="step reveal"><div className="step-n">1</div><h3>Complete the course</h3><span>SELF-PACED ONLINE</span><p>Work through the {l.days}-day course structure at your own pace, around your commitments.</p></div>
          <div className="step reveal"><div className="step-n">2</div><h3>Sit the PECB exam</h3><span>EXAMINATION</span><p>Schedule your online examination through myPECB and follow the instructions for your course.</p></div>
          <div className="step reveal"><div className="step-n">3</div><h3>Apply for your credential</h3><span>APPLICATION</span><p>After passing, apply for the credential that matches your experience.</p></div>
          <div className="step reveal"><div className="step-n">✓</div><h3>Keep it current</h3><span>MAINTENANCE</span><p>Review PECB’s maintenance rules, including any professional development requirements.</p></div>
        </div>
        <div className="link-list reveal"><span>OFFICIAL PECB GUIDANCE</span>
          <a className="chip" href="https://help.pecb.com/list-of-pecb-exams/" target="_blank" rel="noopener">PECB exam list ↗<span className="visually-hidden"> (opens in a new tab)</span></a>
          <a className="chip" href="https://help.pecb.com/mypecb-member/examination/how-do-i-schedule-a-pecb-online-exam-after-attending-a-training/" target="_blank" rel="noopener">Online exam booking ↗<span className="visually-hidden"> (opens in a new tab)</span></a>
          <a className="chip" href="https://pecb.com/en/certification-rules-and-policies" target="_blank" rel="noopener">Certification rules ↗<span className="visually-hidden"> (opens in a new tab)</span></a>
        </div>
        <p className="fine">Completing training alone does not guarantee certification. Confirm current fees, inclusions and course access with Think Risk before enrolling.</p>
      </div></section>

      <section id="related"><div className="wrap">
        <div className="head reveal">
          <div><span className="kicker">Continue your pathway</span><h2>Related <em>courses.</em></h2></div>
          <div><p>Build on this course with the next level, or apply the same level to another standard.</p><Link className="text-link" href="/courses">View all courses →</Link></div>
        </div>
        <div className="grid-4">
          {related.map(r => (
            <Link className="tile reveal" href={courseHref(r.s, r.l)} key={courseId(r.s, r.l)}><span className="num">{r.s.code}</span><h3>{r.l.name}</h3><p>{r.s.title} &middot; {r.l.days}-day self-paced</p><span className="text-link"><b><Price item={courseId(r.s, r.l)} /></b>&nbsp;&middot; View course &rarr;</span></Link>
          ))}
        </div>
      </div></section>
      <div className="cta"><div className="wrap"><div className="cta-box reveal">
        <div><h2>Ready to start {s.code} {l.name}?</h2><p>Tell us what you want to achieve and we’ll help you find the right course or team training pathway.</p></div>
        <Link className="btn btn-navy" href={ask}>Ask about this course <Arrow /></Link>
      </div></div></div>
    </>
  );
}
