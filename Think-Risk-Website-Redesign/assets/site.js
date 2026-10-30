/* Think Risk International — shared site behaviour.
   Course data and prices live here; update them once and every page follows. */
(()=>{'use strict';

const EMAIL='pecb@thinkrisk.com.au';
const standards=[
 {id:'22301',code:'ISO 22301',photo:'course-continuity.jpg',alt:'Professional mapping out a plan on a wall of sticky notes',title:'Business Continuity',
  desc:'Keep critical operations moving. Plan for disruption and strengthen organisational resilience.',
  system:'a business continuity management system',
  focus:['Business continuity principles and ISO 22301 requirements','Business impact analysis, continuity strategies and planning','Monitoring, review and continual improvement']},
 {id:'42001',code:'ISO/IEC 42001',photo:'course-ai.jpg',alt:'Executive reviewing a robotic arm, representing human oversight of AI',title:'AI Management Systems',
  desc:'Bring structure to responsible AI through governance, accountability and risk management.',
  system:'an AI management system',
  focus:['AI management concepts and ISO/IEC 42001 requirements','Governance, responsibility and AI risk management','Management system evaluation and continual improvement']},
 {id:'27001',code:'ISO/IEC 27001',photo:'course-security.jpg',alt:'Hand holding a padlock, representing information security',title:'Information Security',
  desc:'Protect information with confidence through security risk management and controls.',
  system:'an information security management system',
  focus:['Information security principles and ISO/IEC 27001 requirements','Information security risk management and controls','Management system evaluation and continual improvement']}];
const levels=[
 {name:'Foundation',days:2,AU:'AUD $400',MY:'MYR 1,180',num:{AU:400,MY:1180},label:'Understand the fundamentals',
  audience:'Professionals who want an introduction to the standard and its main management system concepts.'},
 {name:'Lead Implementer',days:5,AU:'AUD $995',MY:'MYR 2,950',num:{AU:995,MY:2950},label:'Implement and manage a system',
  audience:'Professionals responsible for implementing or managing the system, and consultants supporting that work.'},
 {name:'Lead Auditor',days:5,AU:'AUD $995',MY:'MYR 2,950',num:{AU:995,MY:2950},label:'Assess and audit a system',
  audience:'Professionals working in audit, assurance or management system conformity assessment.'}];
const extraPrice={AU:'AUD $600',MY:'MYR 1,750'};
const slug=t=>t.toLowerCase().replace(/\s+/g,'-');
const money=(n,m)=>(m==='AU'?'AUD $':'MYR ')+n.toLocaleString('en-AU');

/* Everything that can go in the learning plan */
const catalogue={};
standards.forEach(s=>levels.forEach(l=>{catalogue[`${s.id}-${slug(l.name)}`]={std:s.id,level:l.name,code:s.code,title:`${s.code} ${l.name}`,sub:`${s.title} · ${l.days}-day self-paced`,price:l.num};}));
catalogue['other-pecb']={title:'Additional PECB course',sub:'Three-day online course — tell us which one',price:{AU:600,MY:1750}};
catalogue['team-training']={title:'Team training pathway',sub:'Role-based training for your organisation',price:null};
const pathwayInfo={
 'Foundation':{title:'Start with the fundamentals.',text:'Foundation introduces your chosen standard and its main concepts. A practical starting point when you are exploring a new discipline.'},
 'Lead Implementer':{title:'Build implementation knowledge.',text:'Explore planning, implementing and maintaining a management system. A pathway for professionals who manage a system or support that work.'},
 'Lead Auditor':{title:'Develop your audit perspective.',text:'Explore planning and conducting management system audits. A pathway for professionals working in audit, assurance or conformity assessment.'}};
const icons={'22301':'<path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"/>','42001':'<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/>','27001':'<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>'};
const arrow='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const page=document.body.dataset.page||'';
let market='AU',levelFilter='all';
try{const m=localStorage.getItem('tr-market');if(m==='AU'||m==='MY')market=m}catch(e){}

const goal=(l,s)=>l==='Foundation'?`Understand the main concepts and requirements of ${s.system}.`:l==='Lead Implementer'?`Develop the knowledge to plan, implement and maintain ${s.system}.`:`Develop the knowledge to plan and conduct audits of ${s.system}.`;
const enquiryUrl=(s,l)=>'contact.html?'+new URLSearchParams({interest:s.code+' '+s.title,level:l,market}).toString();

/* Course cards */
function renderBento(){
 const box=$('#bento');if(!box)return;
 box.innerHTML=standards.map(s=>`<article class="card card-has-photo" id="course-${s.id}"><div class="card-photo"><img src="assets/img/${s.photo}" alt="${s.alt}" width="800" height="500" loading="lazy"><span class="code">${s.code}</span></div><div class="card-top"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">${icons[s.id]}</svg></span></div><h3>${s.title}</h3><p>${s.desc}</p><ul class="lv">${levels.filter(l=>levelFilter==='all'||l.name===levelFilter).map(l=>`<li><a class="lv-link" href="course-${s.id}-${slug(l.name)}.html" aria-label="View the ${s.code} ${l.name} course"><span><b>${l.name}</b><small>${l.days}-day structure · Self-paced</small></span><span class="price">${l[market]}</span></a><button type="button" class="add-mini${inBasket(`${s.id}-${slug(l.name)}`)?' added':''}" data-add="${s.id}-${slug(l.name)}" aria-label="Add ${s.code} ${l.name} to your learning plan"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg></button></li>`).join('')}</ul>${page==='courses'?`<a class="link" href="${enquiryUrl(s,'')}">Enquire about ${s.title} →</a>`:`<a class="link" href="courses.html#course-${s.id}">View course details →</a>`}</article>`).join('')+
 `<article class="card card-wide"><div><h3>Training a team?</h3><p>Build a role-based pathway for the people implementing, managing and auditing your systems.</p></div><a class="btn btn-coral" href="training.html">Explore team training ${arrow}</a></article>`+
 `<article class="card card-accent"><strong>${extraPrice[market]}</strong><p>Additional three-day online PECB courses are also available.</p><button type="button" class="btn btn-navy btn-sm" data-add="other-pecb" style="margin-top:16px;align-self:flex-start">Add to plan</button><a href="contact.html?interest=Other%20PECB%20courses">Ask about other courses →</a></article>`;
}

/* Dialog helper (privacy notice, learning plan drawer) */
function ensureDialog(id,html){let d=document.getElementById(id);if(!d){d=document.createElement('dialog');d.id=id;d.setAttribute('aria-labelledby',id+'-title');d.innerHTML=html;document.body.appendChild(d);}return d;}

/* Course finder */
function renderFinder(){
 const fs=$('#f-std'),fl=$('#f-lvl');if(!fs||!fl)return;
 const s=standards.find(x=>x.id===fs.value),l=levels.find(x=>x.name===fl.value);if(!s||!l)return;
 $('#r-title').textContent=`${s.code} ${l.name}`;$('#r-desc').textContent=goal(l.name,s);
 $('#r-days').textContent=`${l.days}-day course structure`;$('#r-price').textContent=l[market];
 $('#r-link').href=`course-${s.id}-${slug(l.name)}.html`;
 if($('#r-add'))$('#r-add').dataset.add=`${s.id}-${slug(l.name)}`;
}

/* Learning plan (basket) — kept in this browser, shared by every page */
let basket=[];
try{basket=JSON.parse(localStorage.getItem('tr-basket')||'[]').filter(i=>catalogue[i.id]&&i.qty>0)}catch(e){basket=[]}
const inBasket=id=>basket.some(i=>i.id===id);
const basketCount=()=>basket.reduce((n,i)=>n+i.qty,0);
function saveBasket(){try{localStorage.setItem('tr-basket',JSON.stringify(basket))}catch(e){}renderBasket();renderBento();}
function addToBasket(id){const p=catalogue[id];if(!p)return;const it=basket.find(i=>i.id===id);if(it)it.qty++;else basket.push({id,qty:1});saveBasket();toast(`<b>${p.title}</b> added to your learning plan`);bump();}
function setQty(id,q){const it=basket.find(i=>i.id===id);if(!it)return;it.qty=Math.max(0,Math.min(50,q));basket=basket.filter(i=>i.qty>0);saveBasket();}
function basketTotal(m){let total=0,quotes=0;basket.forEach(i=>{const p=catalogue[i.id];if(p.price)total+=p.price[m]*i.qty;else quotes++;});return{total,quotes};}
function basketLines(m){return basket.map(i=>{const p=catalogue[i.id];return `- ${p.title} (${p.sub}) × ${i.qty}: ${p.price?money(p.price[m]*i.qty,m):'quote requested'}`;}).join('\n');}

const drawer=ensureDialog('basket-drawer','');
drawer.classList.add('drawer');
const fab=document.createElement('button');
fab.type='button';fab.className='basket-fab';fab.setAttribute('data-basket-open','');
fab.innerHTML='<span class="fab-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 8h14l-1.4 11.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/><path d="m9.5 14 1.8 1.8 3.4-3.6"/></svg><span class="basket-count">0</span></span><span class="fab-text"></span>';
document.body.appendChild(fab);
function pulse(){fab.classList.remove('pulse');void fab.offsetWidth;fab.classList.add('pulse');}
function renderBasket(){
 const n=basketCount();
 $$('.basket-count').forEach(c=>{c.textContent=n;c.toggleAttribute('data-zero',n===0);});
 const sums=basketTotal(market);
 fab.classList.toggle('has-items',n>0);
 fab.querySelector('.fab-text').innerHTML=n?`${n} item${n===1?'':'s'}<small>${money(sums.total,market)}${sums.quotes?' + quote':''} · View plan</small>`:'';
 $$('[data-basket-open]').forEach(b=>b.setAttribute('aria-label',`Open learning plan, ${n} item${n===1?'':'s'}`));
 $$('[data-add]').forEach(b=>b.classList.toggle('added',inBasket(b.dataset.add)));
 const {total,quotes}=basketTotal(market);
 const stds=standards.filter(s=>basket.some(i=>catalogue[i.id].std===s.id));
 const tracker=stds.map(s=>{const have=levels.map(l=>inBasket(`${s.id}-${slug(l.name)}`));const next=levels.find((l,i)=>!have[i]);
  return `<div class="track"><div class="track-head"><b>${s.code}</b><span>${s.title} pathway</span></div><ol>${levels.map((l,i)=>`<li class="${have[i]?'on':''}"><i></i>${l.name.replace('Lead ','')}</li>`).join('')}</ol>${next?`<button type="button" class="track-add" data-add="${s.id}-${slug(next.name)}">+ Add ${next.name} · ${next[market]}</button>`:'<p class="track-done">Full pathway in your plan ✓</p>'}</div>`;}).join('');
 drawer.innerHTML=`<div class="drawer-head"><div><span class="kicker">PECB pathway</span><h2 id="basket-drawer-title">Your learning plan</h2></div><button class="dialog-close" data-close aria-label="Close learning plan">×</button></div>`+
 (n===0?`<div class="drawer-empty"><div class="empty-ico" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 17h28l-3 22H13z"/><path d="M17 17v-3a7 7 0 0 1 14 0v3"/></svg></div><p>No courses in your learning plan yet.</p><span>Add any PECB course or level to build your learning plan.</span><a class="btn btn-coral" href="courses.html">Browse courses ${arrow}</a></div>`:
 `<div class="drawer-body">${tracker?`<div class="tracks">${tracker}</div>`:''}<ul class="basket-items">${basket.map(i=>{const p=catalogue[i.id];return `<li><div class="bi-info"><b>${p.title}</b><small>${p.sub}</small></div><div class="bi-qty" role="group" aria-label="Seats for ${p.title}"><button type="button" data-qty="${i.id}|-1" aria-label="One fewer seat">−</button><span>${i.qty}</span><button type="button" data-qty="${i.id}|1" aria-label="One more seat">+</button></div><strong class="bi-price">${p.price?money(p.price[market]*i.qty,market):'Quote'}</strong><button type="button" class="bi-remove" data-qty="${i.id}|-999" aria-label="Remove ${p.title}">Remove</button></li>`;}).join('')}</ul>
 ${n>1?`<p class="drawer-tip">Booking several seats or courses? Think Risk can also plan a <a href="training.html">team training pathway</a>.</p>`:''}</div>
 <div class="drawer-foot"><div class="drawer-total"><span>Listed fees${quotes?` <small>+ ${quotes} quote item${quotes>1?'s':''}</small>`:''}</span><strong>${money(total,market)}</strong></div><a class="btn btn-coral" href="contact.html?basket=1#enquiry">Request enrolment ${arrow}</a><p class="fine">No payment is taken online. Think Risk confirms availability, inclusions and final pricing before you enrol.</p></div>`);
 if($('#basket-summary'))renderBasketSummary();
}
function renderBasketSummary(){
 const box=$('#basket-summary');if(!box)return;
 if(!basket.length){box.hidden=true;return;}
 const {total,quotes}=basketTotal(market);
 box.hidden=false;
 box.innerHTML=`<div class="bs-head"><b>Your learning plan</b><button type="button" class="link-btn" data-basket-open>Edit</button></div><ul>${basket.map(i=>{const p=catalogue[i.id];return `<li><span>${p.title}${i.qty>1?` × ${i.qty}`:''}</span><b>${p.price?money(p.price[market]*i.qty,market):'Quote'}</b></li>`;}).join('')}</ul><div class="bs-total"><span>Listed fees${quotes?' + quote':''}</span><b>${money(total,market)}</b></div>`;
}
function bump(){pulse();$$('.basket-btn,.basket-fab').forEach(b=>{b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump');});}
let toastTimer;
function toast(html){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');document.body.appendChild(t);}
 t.innerHTML=`<span>${html}</span><button type="button" data-basket-open>View plan</button>`;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),4200);}
addEventListener('storage',e=>{if(e.key==='tr-basket'){try{basket=JSON.parse(e.newValue||'[]')}catch(err){basket=[]}renderBasket();renderBento();}});
if($('#f-std')){
 $('#f-std').innerHTML=standards.map(s=>`<option value="${s.id}">${s.code} — ${s.title}</option>`).join('');
 $('#f-lvl').innerHTML=levels.map(l=>`<option value="${l.name}">${l.name} — ${l.label.toLowerCase()}</option>`).join('');
 $('#f-std').addEventListener('change',renderFinder);$('#f-lvl').addEventListener('change',renderFinder);
}

/* Pathway level picker */
function pickLevel(name){
 const info=pathwayInfo[name];if(!info)return;
 $$('[data-pick-level]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pickLevel===name)));
 if($('#picker-title'))$('#picker-title').textContent=info.title;
 if($('#picker-text'))$('#picker-text').textContent=info.text;
 if($('#picker-link'))$('#picker-link').innerHTML=`Find a ${name} course ${arrow}`;
 if($('#f-lvl')){$('#f-lvl').value=name;renderFinder();}
}

/* Currency */
function setMarket(m){
 market=m;try{localStorage.setItem('tr-market',m)}catch(e){}
 $$('[data-market]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.market===m)));
 $$('[data-from-price]').forEach(n=>n.textContent='From '+levels[0][m]);
 $$('[data-price]').forEach(n=>{const p=catalogue[n.dataset.price];if(p&&p.price)n.textContent=money(p.price[m],m);});
 if($('#form-market'))$('#form-market').value=m;
 renderBento();renderFinder();renderBasket();
}

/* Clicks */
document.addEventListener('click',e=>{
 const t=e.target;
 const m=t.closest('[data-market]');if(m)setMarket(m.dataset.market);
 const lv=t.closest('[data-level]');if(lv){levelFilter=lv.dataset.level;$$('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(b===lv)));renderBento();}
 const add=t.closest('[data-add]');if(add)addToBasket(add.dataset.add);
 const q=t.closest('[data-qty]');if(q){const[id,d]=q.dataset.qty.split('|');const it=basket.find(i=>i.id===id);if(it)setQty(id,it.qty+Number(d));}
 if(t.closest('[data-basket-open]')){$$('dialog[open]').forEach(d=>{if(d!==drawer)d.close();});if(!drawer.open)drawer.showModal();$('#toast')?.classList.remove('show');}
 const p=t.closest('[data-pick-level]');if(p)pickLevel(p.dataset.pickLevel);
 if(t.closest('[data-close]'))t.closest('dialog').close();
 if(t.tagName==='DIALOG'){const r=t.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)t.close();}
 if(t.closest('#privacy-open'))ensureDialog('privacy-dialog',`<button class="dialog-close" data-close aria-label="Close privacy information">×</button><span class="kicker">Website privacy</span><h2 id="privacy-dialog-title">Your enquiry details</h2><p>The enquiry form prepares an email draft in your browser. This website does not submit or store the information you enter on a server.</p><p>When you send the draft, the details go to Think Risk International at ${EMAIL} through your email provider. Include only information needed for your training enquiry.</p><p>Your selected pricing currency may be remembered in this browser. Contact <a href="mailto:${EMAIL}">${EMAIL}</a> for questions about how Think Risk handles information received by email.</p>`).showModal();
 if(t.closest('#menu a'))closeMenu();
});

/* Mobile menu */
const burger=$('#burger'),menu=$('#menu');
function closeMenu(){if(!menu)return;menu.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open menu');}
burger?.addEventListener('click',()=>{const o=!menu.classList.contains('open');menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',String(o));burger.setAttribute('aria-label',o?'Close menu':'Open menu');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.classList.contains('open')){closeMenu();burger.focus();}});

/* Contact form: prepares an email draft */
const form=$('#enquiry-form');
if(form){
 const q=new URLSearchParams(location.search),interest=q.get('interest'),lvl=q.get('level'),qm=q.get('market');
 if(qm==='AU'||qm==='MY')market=qm;
 const fromBasket=q.get('basket')==='1'&&basket.length>0;
 if(basket.length){const o=document.createElement('option');o.value=o.textContent='My learning plan';form.interest.insertBefore(o,form.interest.options[1]);}
 if(fromBasket){form.interest.value='My learning plan';form.message.value='I would like to enrol in the courses in my learning plan. Please confirm availability, inclusions and final pricing.';}
 else if(interest&&[...form.interest.options].some(o=>o.value===interest)){form.interest.value=interest;
  form.message.value=levels.some(l=>l.name===lvl)?`I am interested in the ${interest} ${lvl} course. Please confirm availability, pricing and inclusions.`:`I would like more information about ${interest}.`;}
 form.market.addEventListener('change',e=>setMarket(e.target.value));
 form.addEventListener('submit',e=>{
  e.preventDefault();const f=new FormData(form);
  const subject=`PECB training enquiry — ${f.get('interest')}`;
  const body=`Name: ${f.get('name')}\nEmail: ${f.get('email')}\nOrganisation: ${f.get('organisation')||'Not provided'}\nPreferred pricing currency: ${f.get('market')==='MY'?'MYR':'AUD'}\nInterest: ${f.get('interest')}\n\nGoals / questions:\n${f.get('message')||'Please send me more information about this training pathway.'}`+
   (basket.length?`\n\nLearning plan (listed fees, ${f.get('market')==='MY'?'MYR':'AUD'}):\n${basketLines(f.get('market')==='MY'?'MY':'AU')}\nTotal listed fees: ${money(basketTotal(f.get('market')==='MY'?'MY':'AU').total,f.get('market')==='MY'?'MY':'AU')}${basketTotal('AU').quotes?' (plus quote items)':''}`:'');
  $('#open-email').href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $('#email-draft').value=`To: ${EMAIL}\nSubject: ${subject}\n\n${body}`;
  form.hidden=true;$('#email-result').hidden=false;$('#copy-status').textContent='';$('#open-email').focus();
 });
 $('#copy-enquiry').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#email-draft').value);$('#copy-status').textContent='Copied.'}catch(err){$('#email-draft').select();$('#copy-status').textContent='Select and copy the text above.'}});
 $('#edit-enquiry').addEventListener('click',()=>{$('#email-result').hidden=true;form.hidden=false;form.name.focus();});
}

/* Start up */
if($('#year'))$('#year').textContent=new Date().getFullYear();
setMarket(market);
if(basket.length)setTimeout(pulse,1200);
if($('[data-pick-level][aria-pressed=true]'))pickLevel($('[data-pick-level][aria-pressed=true]').dataset.pickLevel);
if(location.hash.startsWith('#course-')){const el=document.getElementById(location.hash.slice(1));if(el)requestAnimationFrame(()=>el.scrollIntoView());}
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:.1,rootMargin:'0px 0px -30px 0px'});
 $$('.reveal').forEach(el=>io.observe(el));
}else $$('.reveal').forEach(el=>el.classList.add('in'));
})();
