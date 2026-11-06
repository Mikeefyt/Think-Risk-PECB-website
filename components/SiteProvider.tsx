'use client';
/* Shared site state: pricing currency and the learning plan (basket).
   Both are kept in this browser only (localStorage) and shared by every page and tab. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { catalogue, isMarket, money, type Market } from '@/lib/courses';

export interface BasketLine { id: string; qty: number }

interface SiteState {
  market: Market;
  setMarket: (m: Market) => void;
  basket: BasketLine[];
  loaded: boolean;
  inBasket: (id: string) => boolean;
  count: number;
  add: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toast: { title: string; key: number } | null;
  hideToast: () => void;
  /** Increments whenever something is added, so basket buttons can play their bump animation */
  bumpKey: number;
}

const SiteContext = createContext<SiteState | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>');
  return ctx;
}

const readBasket = (raw: string | null): BasketLine[] => {
  try { return (JSON.parse(raw || '[]') as BasketLine[]).filter(i => catalogue[i.id] && i.qty > 0); } catch { return []; }
};

export function basketTotal(basket: BasketLine[], m: Market) {
  let total = 0, quotes = 0;
  basket.forEach(i => { const p = catalogue[i.id]; if (p.price) total += p.price[m] * i.qty; else quotes++; });
  return { total, quotes };
}

export function basketLines(basket: BasketLine[], m: Market) {
  return basket.map(i => { const p = catalogue[i.id]; return `- ${p.title} (${p.sub}) × ${i.qty}: ${p.price ? money(p.price[m] * i.qty, m) : 'quote requested'}`; }).join('\n');
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [market, setMarketState] = useState<Market>('AU');
  const [basket, setBasket] = useState<BasketLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<SiteState['toast']>(null);
  const [bumpKey, setBumpKey] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load saved currency and learning plan, and follow changes made in other tabs
  useEffect(() => {
    try {
      const m = localStorage.getItem('tr-market');
      if (isMarket(m)) setMarketState(m);
      setBasket(readBasket(localStorage.getItem('tr-basket')));
    } catch { /* storage unavailable */ }
    setLoaded(true);
    const onStorage = (e: StorageEvent) => { if (e.key === 'tr-basket') setBasket(readBasket(e.newValue)); };
    addEventListener('storage', onStorage);
    return () => removeEventListener('storage', onStorage);
  }, []);

  const saveBasket = (next: BasketLine[]) => {
    try { localStorage.setItem('tr-basket', JSON.stringify(next)); } catch { /* ignore */ }
    return next;
  };

  const setMarket = useCallback((m: Market) => {
    setMarketState(m);
    try { localStorage.setItem('tr-market', m); } catch { /* ignore */ }
  }, []);

  const add = useCallback((id: string) => {
    const p = catalogue[id];
    if (!p) return;
    setBasket(b => saveBasket(b.some(i => i.id === id) ? b.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i) : [...b, { id, qty: 1 }]));
    setToast({ title: p.title, key: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
    setBumpKey(k => k + 1);
  }, []);

  const changeQty = useCallback((id: string, delta: number) => {
    setBasket(b => saveBasket(b.map(i => i.id === id ? { ...i, qty: Math.max(0, Math.min(50, i.qty + delta)) } : i).filter(i => i.qty > 0)));
  }, []);

  const openDrawer = useCallback(() => {
    document.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach(d => { if (d.id !== 'basket-drawer') d.close(); });
    setDrawerOpen(true);
    setToast(null);
  }, []);

  const value = useMemo<SiteState>(() => ({
    market, setMarket, basket, loaded,
    inBasket: id => basket.some(i => i.id === id),
    count: basket.reduce((n, i) => n + i.qty, 0),
    add, changeQty,
    drawerOpen, openDrawer, closeDrawer: () => setDrawerOpen(false),
    toast, hideToast: () => setToast(null),
    bumpKey,
  }), [market, setMarket, basket, loaded, add, changeQty, drawerOpen, openDrawer, toast, bumpKey]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/** Restart a CSS animation class on an element (used for the bump/pulse effects) */
export function replayClass(el: Element | null, cls: string) {
  if (!el) return;
  el.classList.remove(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}
