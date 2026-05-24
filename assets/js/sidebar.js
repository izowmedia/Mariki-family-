export const SIDEBAR = `
<aside class="sidebar" id="sidebar">
  <a href="dashboard.html" class="brand"><span class="logo">M</span><span>Mariki</span></a>
  <nav class="menu">
    <div class="group">Main</div>
    <a href="dashboard.html" data-nav="dashboard"><i class="fa-solid fa-gauge-high"></i> Dashboard</a>
    <a href="profile.html" data-nav="profile"><i class="fa-solid fa-id-badge"></i> My Profile</a>

    <div class="group">Family</div>
    <a href="members.html" data-nav="members"><i class="fa-solid fa-users"></i> Members</a>
    <a href="events.html" data-nav="events"><i class="fa-regular fa-calendar"></i> Events</a>
    <a href="gallery.html" data-nav="gallery"><i class="fa-regular fa-image"></i> Gallery</a>

    <div class="group">Finance</div>
    <a href="contributions.html" data-nav="contributions"><i class="fa-solid fa-hand-holding-dollar"></i> Contributions</a>
    <a href="payments.html" data-nav="payments"><i class="fa-solid fa-receipt"></i> Payments</a>

    <div class="group" data-role-only="admin,superadmin">Administration</div>
    <a href="admin.html" data-nav="admin" data-role-only="admin,superadmin"><i class="fa-solid fa-shield-halved"></i> Admin Panel</a>
    <a href="messaging.html" data-nav="messaging" data-role-only="admin,superadmin"><i class="fa-regular fa-paper-plane"></i> Bulk SMS / Email</a>

    <div class="group">Account</div>
    <a href="settings.html" data-nav="settings"><i class="fa-solid fa-gear"></i> Settings</a>
    <a href="#" data-logout><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
  </nav>
</aside>
`;
export const TOPBAR = (title='Dashboard') => `
<header class="topbar">
  <button class="menu-toggle" id="menuToggle"><i class="fa-solid fa-bars"></i></button>
  <div class="search"><i class="fa-solid fa-magnifying-glass"></i><input placeholder="Search members, events, payments..."></div>
  <div class="user">
    <button class="bell" title="Notifications"><i class="fa-regular fa-bell"></i><span class="dot"></span></button>
    <div class="avatar" data-user-avatar></div>
    <div style="line-height:1.1">
      <div style="font-size:14px;font-weight:600" data-user-name>Member</div>
      <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px" data-user-role>member</div>
    </div>
  </div>
</header>
`;
export function mountShell(activeKey, title){
  document.getElementById('shell-sidebar').innerHTML = SIDEBAR;
  document.getElementById('shell-topbar').innerHTML = TOPBAR(title);
  const activeLink = document.querySelector(`[data-nav="${activeKey}"]`);
  if(activeLink) activeLink.classList.add('active');
  document.getElementById('menuToggle')?.addEventListener('click',()=>{
    document.getElementById('sidebar')?.classList.toggle('open');
  });
}
