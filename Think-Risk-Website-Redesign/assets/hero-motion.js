/* Think Risk International — home page background video.
   Plays one real clip per PECB standard (ISO 22301, ISO/IEC 42001, ISO/IEC 27001),
   cross-fading every CLIP_MS. Each clip only downloads when it is about to play.
   Phones and data-saver connections keep the still photo (no video download).
   Pauses when the header is off-screen, the tab is hidden, or the visitor presses
   the pause button, and stays on the photo for visitors who prefer reduced motion. */
(()=>{'use strict';
const hero=document.querySelector('.hero');
const videos=[...document.querySelectorAll('.hero-video')];
if(!hero||!videos.length)return;

const CLIP_MS=8000;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const phone=matchMedia('(max-width: 620px)');
const saveData=!!(navigator.connection&&navigator.connection.saveData);
const toggle=document.getElementById('video-toggle');
const ICON_PAUSE='<svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="3" height="10" rx="1"/><rect x="7" y="1" width="3" height="10" rx="1"/></svg>';
const ICON_PLAY='<svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z"/></svg>';
let current=0,timer=null,visible=true,paused=false;

const enabled=()=>!reduced.matches&&!phone.matches&&!saveData;
const running=()=>enabled()&&!paused&&visible&&!document.hidden;
function load(v){if(v&&!v.src&&v.dataset.src){v.src=v.dataset.src;v.load();}}
function setToggle(){
 if(!toggle)return;
 toggle.hidden=!enabled();
 toggle.innerHTML=paused?ICON_PLAY:ICON_PAUSE;
 toggle.setAttribute('aria-label',paused?'Play background video':'Pause background video');
}
function sync(){
 clearTimeout(timer);setToggle();
 videos.forEach((v,i)=>{
  if(i===current&&running()){load(v);const p=v.play();if(p&&p.catch)p.catch(()=>{});v.classList.add('on');}
  else if(i===current&&v.src&&enabled()){v.pause();}
  else{v.classList.remove('on');setTimeout(()=>{if(!v.classList.contains('on'))v.pause();},1400);}
 });
 if(running()){load(videos[(current+1)%videos.length]);timer=setTimeout(()=>{current=(current+1)%videos.length;sync();},CLIP_MS);}
}

toggle?.addEventListener('click',()=>{paused=!paused;sync();});
document.addEventListener('visibilitychange',sync);
reduced.addEventListener?.('change',sync);
phone.addEventListener?.('change',sync);
if('IntersectionObserver' in window)new IntersectionObserver(e=>{visible=e[0].isIntersecting;sync();}).observe(hero);
sync();
})();
