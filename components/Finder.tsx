'use client';
/* Course finder (home and pathway pages) and the pathway level picker, which share the chosen level */
import Link from 'next/link';
import { createContext, useContext, useState } from 'react';
import { courseHref, courseId, goal, levels, pathwayInfo, standards, type LevelName, type StandardId } from '@/lib/courses';
import { Arrow } from './icons';
import { AddButton } from './plan';
import { useSite } from './SiteProvider';

interface FinderState { std: StandardId; level: LevelName; setStd: (s: StandardId) => void; setLevel: (l: LevelName) => void }
const FinderContext = createContext<FinderState | null>(null);

export function FinderProvider({ children }: { children: React.ReactNode }) {
  const [std, setStd] = useState<StandardId>(standards[0].id);
  const [level, setLevel] = useState<LevelName>(levels[0].name);
  return <FinderContext.Provider value={{ std, level, setStd, setLevel }}>{children}</FinderContext.Provider>;
}

const useFinder = () => {
  const ctx = useContext(FinderContext);
  if (!ctx) throw new Error('Wrap the finder in <FinderProvider>');
  return ctx;
};

interface FinderText { heading: string; intro: string; stdLabel: string; lvlLabel: string; resultLabel: string }

export function CourseFinder({ id, style, text }: { id?: string; style?: React.CSSProperties; text: FinderText }) {
  const { std, level, setStd, setLevel } = useFinder();
  const { market } = useSite();
  const s = standards.find(x => x.id === std)!, l = levels.find(x => x.name === level)!;
  return (
    <div className="finder" id={id} style={style}>
      <div className="finder-form reveal">
        <h3>{text.heading}</h3>
        <p>{text.intro}</p>
        <div className="field"><label htmlFor="f-std">{text.stdLabel}</label><select className="select" id="f-std" value={std} onChange={e => setStd(e.target.value as StandardId)}>{standards.map(x => <option key={x.id} value={x.id}>{x.code} — {x.title}</option>)}</select></div>
        <div className="field"><label htmlFor="f-lvl">{text.lvlLabel}</label><select className="select" id="f-lvl" value={level} onChange={e => setLevel(e.target.value as LevelName)}>{levels.map(x => <option key={x.name} value={x.name}>{x.name} — {x.label.toLowerCase()}</option>)}</select></div>
      </div>
      <div className="result reveal" aria-live="polite">
        <small>{text.resultLabel}</small>
        <h3 id="r-title">{s.code} {l.name}</h3>
        <p id="r-desc">{goal(l.name, s)}</p>
        <div className="result-meta"><span id="r-days">{l.days}-day course structure</span><span>Self-paced online</span><span>PECB exam</span></div>
        <div className="result-foot"><strong><small>LISTED FEE</small><span id="r-price">{l[market]}</span></strong><span className="result-actions"><AddButton item={courseId(s, l)} className="btn btn-coral" id="r-add">Add to plan</AddButton><Link className="btn btn-ghost" id="r-link" href={courseHref(s, l)}>View course</Link></span></div>
      </div>
    </div>
  );
}

const PICKS: { name: LevelName; small: string; text: string }[] = [
  { name: 'Foundation', small: '01 · UNDERSTAND', text: 'Explore the standard’s requirements and key management system concepts.' },
  { name: 'Lead Implementer', small: '02 · IMPLEMENT', text: 'Develop knowledge for establishing, managing and maintaining a management system.' },
  { name: 'Lead Auditor', small: '03 · ASSESS', text: 'Develop knowledge for assessing conformity and conducting management system audits.' },
];

export function PathwayPicker() {
  const { level, setLevel } = useFinder();
  const info = pathwayInfo[level];
  return (
    <>
      <div className="picker reveal" role="group" aria-label="Explore course levels">
        {PICKS.map(p => <button key={p.name} type="button" data-pick-level={p.name} aria-pressed={level === p.name} onClick={() => setLevel(p.name)}><small>{p.small}</small><strong>{p.name}</strong><span>{p.text}</span></button>)}
      </div>
      <div className="picker-summary reveal" aria-live="polite"><div><h3 id="picker-title">{info.title}</h3><p id="picker-text">{info.text}</p></div><a className="btn btn-navy" id="picker-link" href="#course-finder">Find a {level} course <Arrow /></a></div>
    </>
  );
}
