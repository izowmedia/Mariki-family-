// Guard authenticated pages. Loads user doc, exposes window.currentUser
import { auth, db } from '../../firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { toast, hideLoader } from './common.js';

export function guardPage(opts={}){
  const { roles=null, requireApproved=true } = opts;
  return new Promise(resolve => {
    onAuthStateChanged(auth, async user => {
      if(!user){ window.location.href = 'login.html'; return; }
      try{
        const snap = await getDoc(doc(db,'users',user.uid));
        if(!snap.exists()){
          toast('Profile not found. Please complete registration.','error');
          setTimeout(()=>window.location.href='register.html',1500);
          return;
        }
        const data = { uid:user.uid, email:user.email, ...snap.data() };
        if(requireApproved && data.status !== 'approved' && data.role !== 'superadmin'){
          window.location.href = 'pending.html';
          return;
        }
        if(roles && !roles.includes(data.role)){
          toast('You do not have access to this page.','error');
          setTimeout(()=>window.location.href='dashboard.html',1500);
          return;
        }
        window.currentUser = data;
        renderUserChrome(data);
        hideLoader();
        resolve(data);
      }catch(e){
        console.error(e); toast('Failed to load profile','error');
      }
    });
  });
}

function renderUserChrome(u){
  const nameEls = document.querySelectorAll('[data-user-name]');
  const roleEls = document.querySelectorAll('[data-user-role]');
  const avEls = document.querySelectorAll('[data-user-avatar]');
  const full = [u.firstName,u.lastName].filter(Boolean).join(' ') || u.email;
  nameEls.forEach(e=>e.textContent=full);
  roleEls.forEach(e=>e.textContent=u.role||'member');
  avEls.forEach(e=>{
    if(u.photoURL){ e.innerHTML=`<img src="${u.photoURL}" alt="">`; }
    else e.textContent = (u.firstName?.[0]||u.email?.[0]||'M').toUpperCase();
  });
  document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click',async ()=>{
    await signOut(auth); window.location.href='index.html';
  }));
  // Role-gated UI: data-role-only="admin,superadmin"
  document.querySelectorAll('[data-role-only]').forEach(el=>{
    const ok = el.dataset.roleOnly.split(',').map(r=>r.trim()).includes(u.role);
    if(!ok) el.remove();
  });
}
