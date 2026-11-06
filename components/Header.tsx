'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Arrow, BagIcon } from './icons';
import { replayClass, useSite } from './SiteProvider';
import { markets } from '@/lib/courses';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/training', label: 'Team training' },
  { href: '/pathway', label: 'Pathway' },
  { href: '/about', label: 'About' },
  { href: '/faqs', label: 'FAQs' },
];

export function TopBar() {
  const { market, setMarket } = useSite();
  return (
    <div className="topbar"><div className="wrap">
      <span><strong>PECB Authorized Partner</strong><span className="hide-sm"> · Self-paced online certification training, available worldwide</span></span>
      <div className="currency" role="group" aria-label="Pricing currency"><span className="hide-sm">Prices in</span>
        {markets.map(m => <button key={m.id} type="button" data-market={m.id} aria-pressed={market === m.id} onClick={() => setMarket(m.id)}>{m.code}</button>)}
      </div>
    </div></div>
  );
}

export function Header() {
  const pathname = usePathname();
  const home = pathname === '/';
  const { count, openDrawer, bumpKey } = useSite();
  const [open, setOpen] = useState(false);
  const basketRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { if (bumpKey) replayClass(basketRef.current, 'bump'); }, [bumpKey]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); burgerRef.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const current = (href: string) => (href === '/' ? home : pathname === href || pathname.startsWith(href + '/')) ? 'page' as const : undefined;
  const close = () => setOpen(false);
  const items = `${count} item${count === 1 ? '' : 's'}`;

  return (
    <header className={home ? 'home-header' : undefined}><div className="wrap nav">
      <Link className="brand" href="/" aria-label="Think Risk International home"><img src="/assets/logo-white.webp" alt="" width={48} height={48} /><b>Think Risk<small>INTERNATIONAL</small></b></Link>
      <nav className={open ? 'menu open' : 'menu'} id="menu" aria-label="Main">
        {NAV.map(n => <Link key={n.href} href={n.href} aria-current={current(n.href)} onClick={close}>{n.label}</Link>)}
        {home && <a className="menu-extra" href="#finder" onClick={close}>Help me choose</a>}
        <Link className="menu-cta" href="/contact" aria-current={current('/contact')} onClick={close}>Enquire now</Link>
      </nav>
      {home && <a className="btn btn-ghost btn-sm hdr-extra" href="#finder">Help me choose</a>}
      <button ref={basketRef} type="button" className="basket-btn" data-basket-open="" aria-label={`Open learning plan, ${items}`} onClick={openDrawer}>
        <BagIcon /><span className="basket-label">Learning Plan</span><span className="basket-count" data-zero={count === 0 ? '' : undefined}>{count}</span>
      </button>
      <Link className="btn btn-coral btn-sm" href="/contact">Enquire now <Arrow /></Link>
      <button ref={burgerRef} type="button" className="burger" id="burger" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(o => !o)}><span></span></button>
    </div></header>
  );
}
