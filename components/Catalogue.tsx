'use client';
/* Course catalogue cards ("bento") with the level filter, used on the home and courses pages */
import Link from 'next/link';
import { createContext, useContext, useState } from 'react';
import { courseHref, courseId, enquiryUrl, extraPrice, levels, standards } from '@/lib/courses';
import { Arrow, StandardIcon } from './icons';
import { AddButton } from './plan';
import { useSite } from './SiteProvider';

type Filter = 'all' | string;
const FilterContext = createContext<[Filter, (f: Filter) => void]>(['all', () => {}]);

export function LevelFilterProvider({ children }: { children: React.ReactNode }) {
  const state = useState<Filter>('all');
  return <FilterContext.Provider value={state}>{children}</FilterContext.Provider>;
}

const OPTIONS: [Filter, string][] = [['all', 'All levels'], ['Foundation', 'Foundation'], ['Lead Implementer', 'Implementer'], ['Lead Auditor', 'Auditor']];

export function LevelToggle({ style }: { style?: React.CSSProperties }) {
  const [filter, setFilter] = useContext(FilterContext);
  return (
    <div className="levels-toggle" role="group" aria-label="Filter by level" style={style}>
      {OPTIONS.map(([value, label]) => <button key={value} type="button" data-level={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}
    </div>
  );
}

export function Bento({ page }: { page: 'index' | 'courses' }) {
  const [filter] = useContext(FilterContext);
  const { market } = useSite();
  return (
    <div className="bento" id="bento" aria-live="polite">
      {standards.map(s => (
        <article className="card card-has-photo" id={`course-${s.id}`} key={s.id}>
          <div className="card-photo"><img src={`/assets/img/${s.photo}`} alt={s.alt} width={800} height={500} loading="lazy" /><span className="code">{s.code}</span></div>
          <div className="card-top"><span className="ico"><StandardIcon id={s.id} /></span></div>
          <h3>{s.title}</h3><p>{s.desc}</p>
          <ul className="lv">{levels.filter(l => filter === 'all' || l.name === filter).map(l => (
            <li key={l.name}>
              <Link className="lv-link" href={courseHref(s, l)} aria-label={`View the ${s.code} ${l.name} course`}><span><b>{l.name}</b><small>{l.days}-day structure · Self-paced</small></span><span className="price">{l[market]}</span></Link>
              <AddButton item={courseId(s, l)} className="add-mini" aria-label={`Add ${s.code} ${l.name} to your learning plan`}><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 3v10M3 8h10" /></svg></AddButton>
            </li>
          ))}</ul>
          {page === 'courses'
            ? <Link className="link" href={enquiryUrl(s, '', market)}>Enquire about {s.title} →</Link>
            : <Link className="link" href={`/courses#course-${s.id}`}>View course details →</Link>}
        </article>
      ))}
      <article className="card card-wide"><div><h3>Training a team?</h3><p>Build a role-based pathway for the people implementing, managing and auditing your systems.</p></div><Link className="btn btn-coral" href="/training">Explore team training <Arrow /></Link></article>
      <article className="card card-accent"><strong>{extraPrice[market]}</strong><p>Additional three-day online PECB courses are also available.</p><AddButton item="other-pecb" className="btn btn-navy btn-sm" style={{ marginTop: 16, alignSelf: 'flex-start' }}>Add to plan</AddButton><Link href="/contact?interest=Other%20PECB%20courses">Ask about other courses →</Link></article>
    </div>
  );
}
