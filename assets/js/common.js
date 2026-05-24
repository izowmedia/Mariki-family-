// Common helpers: toasts, loader, reveal, navbar
export function toast(message, type='') {
  let stack = document.querySelector('.toast-stack');
  if(!stack){ stack=document.createElement('div'); stack.className='toast-stack'; document.body.appendChild(stack); }
  const t = document.createElement('div');
  t.className = 'toast '+type;
  t.innerHTML = `<i class="fa-solid fa-${type==='error'?'circle-exclamation':type==='success'?'circle-check':'circle-info'}"></i> ${message}`;
  stack.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateX(20px)'; setTimeout(()=>t.remove(),300); }, 3500);
}

export function hideLoader(){
  const l = document.querySelector('.loader-screen');
  if(l) setTimeout(()=>l.classList.add('hide'),400);
}

export function initReveal(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.15});
  els.forEach(e=>io.observe(e));
}

export function initNav(){
  const h = document.querySelector('.hamburger');
  const l = document.querySelector('.nav-links');
  if(h&&l) h.addEventListener('click',()=>l.classList.toggle('open'));
}

export function fmtTZS(n){
  return 'TZS ' + new Intl.NumberFormat('en-US').format(Math.round(Number(n)||0));
}
export function fmtDate(ts){
  if(!ts) return '-';
  let d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
}
export function relTime(ts){
  if(!ts) return '';
  let d = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = (Date.now()-d.getTime())/1000;
  if(diff<60) return 'just now';
  if(diff<3600) return Math.floor(diff/60)+'m ago';
  if(diff<86400) return Math.floor(diff/3600)+'h ago';
  return Math.floor(diff/86400)+'d ago';
}
export function validateTZPhone(p){
  return /^\+255\d{9}$/.test(String(p).trim());
}
