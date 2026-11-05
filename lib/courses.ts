/* Course data and prices. Update them here once and every page, the learning plan,
   the course finder and the course structured data follow. */

export const EMAIL = 'pecb@thinkrisk.com.au';
export const SITE_URL = 'https://pecb.thinkrisk.com.au';

export type Market = 'AU' | 'MY';
export type StandardId = '22301' | '42001' | '27001';
export type LevelName = 'Foundation' | 'Lead Implementer' | 'Lead Auditor';

export interface Standard {
  id: StandardId;
  code: string;
  photo: string;
  alt: string;
  title: string;
  desc: string;
  /** Longer introduction used on each course page ("Course focus") */
  lede: string;
  system: string;
  focus: string[];
}

export interface Level {
  name: LevelName;
  days: number;
  AU: string;
  MY: string;
  num: Record<Market, number>;
  label: string;
  audience: string;
  /** Extra "Course focus" item shown on course pages at this level */
  focus: string;
  /** "Before you enrol" text on course pages */
  before: string;
}

export const standards: Standard[] = [
  {
    id: '22301', code: 'ISO 22301', photo: 'course-continuity.jpg', alt: 'Professional mapping out a plan on a wall of sticky notes', title: 'Business Continuity',
    desc: 'Keep critical operations moving. Plan for disruption and strengthen organisational resilience.',
    lede: 'Keep critical operations moving. Plan for disruption and strengthen organisational resilience with the internationally recognised standard for business continuity management.',
    system: 'a business continuity management system',
    focus: ['Business continuity principles and ISO 22301 requirements', 'Business impact analysis, continuity strategies and planning', 'Monitoring, review and continual improvement'],
  },
  {
    id: '42001', code: 'ISO/IEC 42001', photo: 'course-ai.jpg', alt: 'Executive reviewing a robotic arm, representing human oversight of AI', title: 'AI Management Systems',
    desc: 'Bring structure to responsible AI through governance, accountability and risk management.',
    lede: 'Bring structure to responsible AI. Explore governance, accountability and risk within an AI management system based on ISO/IEC 42001.',
    system: 'an AI management system',
    focus: ['AI management concepts and ISO/IEC 42001 requirements', 'Governance, responsibility and AI risk management', 'Management system evaluation and continual improvement'],
  },
  {
    id: '27001', code: 'ISO/IEC 27001', photo: 'course-security.jpg', alt: 'Hand holding a padlock, representing information security', title: 'Information Security',
    desc: 'Protect information with confidence through security risk management and controls.',
    lede: 'Protect information with confidence. Develop your understanding of information security risk, controls and management system evaluation based on ISO/IEC 27001.',
    system: 'an information security management system',
    focus: ['Information security principles and ISO/IEC 27001 requirements', 'Information security risk management and controls', 'Management system evaluation and continual improvement'],
  },
];

const LEAD_BEFORE = 'Entry requirements for Lead courses vary. Review the prerequisites for your selected course and discuss your existing knowledge with Think Risk before enrolling.';

export const levels: Level[] = [
  {
    name: 'Foundation', days: 2, AU: 'AUD $400', MY: 'MYR 1,180', num: { AU: 400, MY: 1180 }, label: 'Understand the fundamentals',
    audience: 'Professionals who want an introduction to the standard and its main management system concepts.',
    focus: 'Main concepts, terminology and management system requirements',
    before: 'Foundation can be useful when you are new to a standard. Confirm the entry requirements, learning format and course access period for your selected course before enrolling.',
  },
  {
    name: 'Lead Implementer', days: 5, AU: 'AUD $995', MY: 'MYR 2,950', num: { AU: 995, MY: 2950 }, label: 'Implement and manage a system',
    audience: 'Professionals responsible for implementing or managing the system, and consultants supporting that work.',
    focus: 'Planning, implementation, monitoring and continual improvement of the system',
    before: LEAD_BEFORE,
  },
  {
    name: 'Lead Auditor', days: 5, AU: 'AUD $995', MY: 'MYR 2,950', num: { AU: 995, MY: 2950 }, label: 'Assess and audit a system',
    audience: 'Professionals working in audit, assurance or management system conformity assessment.',
    focus: 'Audit principles, preparation, evidence, findings and reporting',
    before: LEAD_BEFORE,
  },
];

export const extraPrice: Record<Market, string> = { AU: 'AUD $600', MY: 'MYR 1,750' };

export const slug = (t: string) => t.toLowerCase().replace(/\s+/g, '-');
export const money = (n: number, m: Market) => (m === 'AU' ? 'AUD $' : 'MYR ') + n.toLocaleString('en-AU');
export const courseId = (s: Standard, l: Level) => `${s.id}-${slug(l.name)}`;
export const courseHref = (s: Standard, l: Level) => `/courses/${courseId(s, l)}`;

/** Everything that can go in the learning plan */
export interface CatalogueItem {
  std?: StandardId;
  level?: LevelName;
  code?: string;
  title: string;
  sub: string;
  price: Record<Market, number> | null;
}

export const catalogue: Record<string, CatalogueItem> = {};
standards.forEach(s => levels.forEach(l => {
  catalogue[courseId(s, l)] = { std: s.id, level: l.name, code: s.code, title: `${s.code} ${l.name}`, sub: `${s.title} · ${l.days}-day self-paced`, price: l.num };
}));
catalogue['other-pecb'] = { title: 'Additional PECB course', sub: 'Three-day online course — tell us which one', price: { AU: 600, MY: 1750 } };
catalogue['team-training'] = { title: 'Team training pathway', sub: 'Role-based training for your organisation', price: null };

export const pathwayInfo: Record<LevelName, { title: string; text: string }> = {
  'Foundation': { title: 'Start with the fundamentals.', text: 'Foundation introduces your chosen standard and its main concepts. A practical starting point when you are exploring a new discipline.' },
  'Lead Implementer': { title: 'Build implementation knowledge.', text: 'Explore planning, implementing and maintaining a management system. A pathway for professionals who manage a system or support that work.' },
  'Lead Auditor': { title: 'Develop your audit perspective.', text: 'Explore planning and conducting management system audits. A pathway for professionals working in audit, assurance or conformity assessment.' },
};

export const goal = (l: LevelName, s: Standard) =>
  l === 'Foundation' ? `Understand the main concepts and requirements of ${s.system}.`
    : l === 'Lead Implementer' ? `Develop the knowledge to plan, implement and maintain ${s.system}.`
      : `Develop the knowledge to plan and conduct audits of ${s.system}.`;

export const enquiryUrl = (s: Standard, l: string, market: Market) =>
  '/contact?' + new URLSearchParams({ interest: s.code + ' ' + s.title, level: l, market }).toString();

/** All 9 course pages, in catalogue order */
export const courses = standards.flatMap(s => levels.map(l => ({ id: courseId(s, l), standard: s, level: l })));
export const findCourse = (id: string) => courses.find(c => c.id === id);
