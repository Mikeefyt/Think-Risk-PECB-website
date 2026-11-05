'use client';
/* Fades in ".reveal" sections as they scroll into view (skipped for reduced motion) */
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal:not(.in)')];
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: .1, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
