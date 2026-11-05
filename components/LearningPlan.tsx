'use client';
/* "Your learning plan" drawer, the floating basket button and the "added" toast */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { catalogue, levels, money, slug, standards } from '@/lib/courses';
import { Dialog } from './Dialog';
import { Arrow, BagIcon } from './icons';
import { basketTotal, replayClass, useSite } from './SiteProvider';

export function LearningPlanDrawer() {
  const { basket, market, count, inBasket, add, changeQty, drawerOpen, closeDrawer } = useSite();
  const pathname = usePathname();
  useEffect(() => { closeDrawer(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const { total, quotes } = basketTotal(basket, market);
  const stds = standards.filter(s => basket.some(i => catalogue[i.id].std === s.id));

  return (
    <Dialog id="basket-drawer" className="drawer" open={drawerOpen} onClose={closeDrawer}>
      <div className="drawer-head"><div><span className="kicker">PECB pathway</span><h2 id="basket-drawer-title">Your learning plan</h2></div><button className="dialog-close" aria-label="Close learning plan" onClick={closeDrawer}>×</button></div>
      {count === 0 ? (
        <div className="drawer-empty"><div className="empty-ico" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 17h28l-3 22H13z" /><path d="M17 17v-3a7 7 0 0 1 14 0v3" /></svg></div><p>No courses in your learning plan yet.</p><span>Add any PECB course or level to build your learning plan.</span><Link className="btn btn-coral" href="/courses" onClick={closeDrawer}>Browse courses <Arrow /></Link></div>
      ) : (
        <>
          <div className="drawer-body">
            {stds.length > 0 && <div className="tracks">{stds.map(s => {
              const have = levels.map(l => inBasket(`${s.id}-${slug(l.name)}`));
              const next = levels.find((_, i) => !have[i]);
              return (
                <div className="track" key={s.id}><div className="track-head"><b>{s.code}</b><span>{s.title} pathway</span></div>
                  <ol>{levels.map((l, i) => <li key={l.name} className={have[i] ? 'on' : ''}><i></i>{l.name.replace('Lead ', '')}</li>)}</ol>
                  {next ? <button type="button" className="track-add" data-add={`${s.id}-${slug(next.name)}`} onClick={() => add(`${s.id}-${slug(next.name)}`)}>+ Add {next.name} · {next[market]}</button> : <p className="track-done">Full pathway in your plan ✓</p>}
                </div>
              );
            })}</div>}
            <ul className="basket-items">{basket.map(i => {
              const p = catalogue[i.id];
              return (
                <li key={i.id}><div className="bi-info"><b>{p.title}</b><small>{p.sub}</small></div>
                  <div className="bi-qty" role="group" aria-label={`Seats for ${p.title}`}><button type="button" aria-label="One fewer seat" onClick={() => changeQty(i.id, -1)}>−</button><span>{i.qty}</span><button type="button" aria-label="One more seat" onClick={() => changeQty(i.id, 1)}>+</button></div>
                  <strong className="bi-price">{p.price ? money(p.price[market] * i.qty, market) : 'Quote'}</strong>
                  <button type="button" className="bi-remove" aria-label={`Remove ${p.title}`} onClick={() => changeQty(i.id, -999)}>Remove</button>
                </li>
              );
            })}</ul>
            {count > 1 && <p className="drawer-tip">Booking several seats or courses? Think Risk can also plan a <Link href="/training" onClick={closeDrawer}>team training pathway</Link>.</p>}
          </div>
          <div className="drawer-foot"><div className="drawer-total"><span>Listed fees{quotes > 0 && <> <small>+ {quotes} quote item{quotes > 1 ? 's' : ''}</small></>}</span><strong>{money(total, market)}</strong></div><Link className="btn btn-coral" href="/contact?basket=1#enquiry" onClick={closeDrawer}>Request enrolment <Arrow /></Link><p className="fine">No payment is taken online. Think Risk confirms availability, inclusions and final pricing before you enrol.</p></div>
        </>
      )}
    </Dialog>
  );
}

export function BasketFab() {
  const { basket, market, count, loaded, openDrawer, bumpKey } = useSite();
  const ref = useRef<HTMLButtonElement>(null);
  const { total, quotes } = basketTotal(basket, market);
  const items = `${count} item${count === 1 ? '' : 's'}`;

  useEffect(() => { if (bumpKey) { replayClass(ref.current, 'pulse'); replayClass(ref.current, 'bump'); } }, [bumpKey]);
  // Draw attention to a plan saved from an earlier visit
  useEffect(() => {
    if (!loaded || !basket.length) return;
    const t = setTimeout(() => replayClass(ref.current, 'pulse'), 1200);
    return () => clearTimeout(t);
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <button ref={ref} type="button" className={count > 0 ? 'basket-fab has-items' : 'basket-fab'} data-basket-open="" aria-label={`Open learning plan, ${items}`} onClick={openDrawer}>
      <span className="fab-ico"><BagIcon /><span className="basket-count" data-zero={count === 0 ? '' : undefined}>{count}</span></span>
      <span className="fab-text">{count > 0 && <>{items}<small>{money(total, market)}{quotes ? ' + quote' : ''} · View plan</small></>}</span>
    </button>
  );
}

export function Toast() {
  const { toast, openDrawer } = useSite();
  const last = useRef(toast);
  if (toast) last.current = toast;
  if (!last.current) return null;
  return (
    <div id="toast" className={toast ? 'toast show' : 'toast'} role="status">
      <span><b>{last.current.title}</b> added to your learning plan</span><button type="button" data-basket-open="" onClick={openDrawer}>View plan</button>
    </div>
  );
}
