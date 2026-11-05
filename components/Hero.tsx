'use client';
/* Home page header with background video.
   Plays one real clip per PECB standard (ISO 22301, ISO/IEC 42001, ISO/IEC 27001),
   cross-fading every CLIP_MS. Each clip only downloads when it is about to play.
   Phones and data-saver connections keep the still photo (no video download).
   Pauses when the header is off-screen, the tab is hidden, or the visitor presses
   the pause button, and stays on the photo for visitors who prefer reduced motion. */
import { useEffect, useRef, useState } from 'react';

const CLIP_MS = 8000;
const CLIPS = ['/assets/video/pecb-continuity.mp4', '/assets/video/pecb-ai.mp4', '/assets/video/pecb-security.mp4'];

export function Hero({ children }: { children: React.ReactNode }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const pausedRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});
  const [toggle, setToggle] = useState({ hidden: true, paused: false });

  useEffect(() => {
    const hero = heroRef.current;
    const videos = videoRefs.current.filter((v): v is HTMLVideoElement => !!v);
    if (!hero || !videos.length) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const phone = matchMedia('(max-width: 620px)');
    const saveData = !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let current = 0, timer: ReturnType<typeof setTimeout> | undefined, visible = true;

    const enabled = () => !reduced.matches && !phone.matches && !saveData;
    const running = () => enabled() && !pausedRef.current && visible && !document.hidden;
    const load = (v?: HTMLVideoElement) => { if (v && !v.getAttribute('src') && v.dataset.src) { v.src = v.dataset.src; v.load(); } };
    const sync = () => {
      clearTimeout(timer);
      setToggle({ hidden: !enabled(), paused: pausedRef.current });
      videos.forEach((v, i) => {
        if (i === current && running()) { load(v); v.play()?.catch(() => {}); v.classList.add('on'); }
        else if (i === current && v.getAttribute('src') && enabled()) { v.pause(); }
        else { v.classList.remove('on'); setTimeout(() => { if (!v.classList.contains('on')) v.pause(); }, 1400); }
      });
      if (running()) { load(videos[(current + 1) % videos.length]); timer = setTimeout(() => { current = (current + 1) % videos.length; sync(); }, CLIP_MS); }
    };
    syncRef.current = sync;

    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener?.('change', sync);
    phone.addEventListener?.('change', sync);
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(e => { visible = e[0].isIntersecting; sync(); }) : null;
    io?.observe(hero);
    sync();
    return () => {
      clearTimeout(timer);
      io?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener?.('change', sync);
      phone.removeEventListener?.('change', sync);
      videos.forEach(v => v.pause());
    };
  }, []);

  return (
    <div className="hero" ref={heroRef}>
      <div className="hero-media" aria-hidden="true">
        <img src="/assets/hero-photo.webp" alt="" width={1672} height={941} fetchPriority="high" />
        {CLIPS.map((src, i) => <video key={src} ref={el => { videoRefs.current[i] = el; }} className="hero-video" data-scene={i} data-src={src} muted loop playsInline preload="none"></video>)}
      </div>
      <div className="hero-wash" aria-hidden="true"></div>
      {children}
      <button type="button" className="video-toggle" id="video-toggle" hidden={toggle.hidden} aria-label={toggle.paused ? 'Play background video' : 'Pause background video'} onClick={() => { pausedRef.current = !pausedRef.current; syncRef.current(); }}>
        {toggle.paused
          ? <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" /></svg>
          : <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="3" height="10" rx="1" /><rect x="7" y="1" width="3" height="10" rx="1" /></svg>}
      </button>
    </div>
  );
}
