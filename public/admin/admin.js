
'use strict';
/* ============================================================
   SUPABASE CONFIG — loaded from the app runtime so the dashboard
   can use your real project URL and anon key without editing this
   static file manually.
   ============================================================ */
var SUPABASE_CONFIG = (window && window.__DD_SUPABASE_CONFIG__) || {
  url: '',
  anonKey: ''
};

/* ---------- Tiny in-memory fallback (demo mode) ----------
   If Supabase isn't configured, the dashboard runs a localStorage
   demo store so you can preview every screen without a backend. */
var DEMO = {
  services: [{id:1,title:'Business Websites',desc:'High-converting business websites that build trust and win customers.',icon:'briefcase',sort:1},{id:2,title:'Web Applications',desc:'Powerful custom web apps built around your exact workflow.',icon:'code',sort:2},{id:3,title:'E-commerce Stores',desc:'Online stores with payments, inventory and order management.',icon:'cart',sort:3}],
  portfolio: [{id:1,title:'Restaurant Website',cat:'Restaurant',img:''},{id:2,title:'Clinic Booking System',cat:'Healthcare',img:''}],
  blogs: [{id:1,title:'How to Build a High-Converting Business Website',cat:'Web Design',date:'2026-08-04'},{id:2,title:'Next.js vs React in 2026',cat:'Development',date:'2026-07-28'}],
  testimonials: [{id:1,name:'Ali Raza',company:'TechNova',rating:5,text:'Outstanding work!'}],
  team: [{id:1,name:'Rizwan',role:'Founder & Lead Developer'}],
  submissions: [{id:1,name:'Ahmed Khan',email:'ahmed@example.com',phone:'03001234567',message:'I need a website for my business.',status:'unread',created_at:'2026-08-03'}],
  requests: [],
  settings: {hero_title:'Building Digital Experiences That Help Businesses Grow.',hero_sub:'We craft premium websites and web applications for ambitious brands.',email:'ri590590590@gmail.com',phone:'+923710753644',address:'Lahore, Punjab, Pakistan',whatsapp:'923710753644',facebook:'',instagram:''}
};

var sb = null;
var session = null, userRole = 'admin', isSuper = false;
var currentView = 'overview';

/* ---------- Utils ---------- */
function $(id){ return document.getElementById(id); }
function esc(s){ if(s==null) return ''; return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function fmtDate(d){ if(!d) return '—'; try{ var dt=new Date(d); return dt.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); }catch(e){ return '—'; } }
var toastTimer=null;
function toast(msg, type){
  var t=$('toast'); t.textContent=msg; t.className='toast show '+(type||'');
  clearTimeout(toastTimer); toastTimer=setTimeout(function(){ t.className='toast'; },3200);
}

/* ---------- Boot ---------- */
(function init(){
  var cfgOk = SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey;
  if (!cfgOk) { $('setup-screen').classList.remove('hidden'); return; }
  sb = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
  sb.auth.onAuthStateChange(function(ev, sess){
    session = sess;
    if (ev === 'SIGNED_IN' || ev === 'INITIAL_SESSION') { if (sess) loadProfileAndApp(); }
    else if (ev === 'SIGNED_OUT') { session=null; showAuth(); }
  });
  sb.auth.getSession().then(function(res){
    if (res.data.session) { session = res.data.session; loadProfileAndApp(); }
    else showAuth();
  });
})();

function loadProfileAndApp(){
  var uid = session.user.id;
  sb.from('profiles').select('*').eq('id', uid).single().then(function(res){
    var profile = res.data;
    var role = profile && profile.role;
    var status = profile && profile.status;
    var authorized = (role === 'admin' || role === 'super_admin') && status === 'active';
    if (!authorized) {
      denyAccess(status === 'pending'
        ? 'Your admin request is still pending approval. You\'ll be able to sign in once a super admin approves it.'
        : 'This account does not have admin access.');
      return;
    }
    userRole = role; isSuper = (userRole === 'super_admin');
    $('user-email').textContent = session.user.email || '';
    $('user-role').textContent = userRole;
    document.querySelectorAll('.super-only').forEach(function(el){ el.classList.toggle('hidden', !isSuper); });
    $('auth-screen').classList.add('hidden');
    $('app').classList.remove('hidden');
    $('setup-screen').classList.add('hidden');
    routeTo('overview');
    loadAll();
  }).catch(function(){
    // Fail CLOSED, not open: if we can't verify the profile/role, don't show the dashboard.
    denyAccess('Could not verify your admin access. Please try signing in again.');
  });
}

function denyAccess(message){
  sb.auth.signOut();
  session = null;
  showAuth();
  showAuthError(message);
}

/* ---------- Auth UI ---------- */
function showAuth(){ $('auth-screen').classList.remove('hidden'); $('app').classList.add('hidden'); }
$('tab-login').addEventListener('click', function(){ switchAuth('login'); });
$('tab-register').addEventListener('click', function(){ switchAuth('register'); });
$('switch-to-register').addEventListener('click', function(e){ e.preventDefault(); switchAuth('register'); });
function switchAuth(mode){
  $('tab-login').classList.toggle('active', mode==='login');
  $('tab-register').classList.toggle('active', mode==='register');
  $('login-form').classList.toggle('hidden', mode!=='login');
  $('register-form').classList.toggle('hidden', mode!=='register');
  $('auth-error').classList.remove('show');
}
function showAuthError(msg){ var el=$('auth-error'); el.textContent=msg; el.classList.add('show'); }

$('login-form').addEventListener('submit', function(e){
  e.preventDefault();
  showAuthError(''); 
  var email=$('login-email').value.trim(), pw=$('login-password').value;
  sb.auth.signInWithPassword({email:email,password:pw}).then(function(res){
    if (res.error) showAuthError(res.error.message || 'Login failed.');
  });
});

$('register-form').addEventListener('submit', function(e){
  e.preventDefault();
  showAuthError('');
  var name=$('reg-name').value.trim(), email=$('reg-email').value.trim(), pw=$('reg-password').value, reason=$('reg-reason').value.trim();
  sb.auth.signUp({email:email,password:pw}).then(function(res){
    if (res.error) { showAuthError(res.error.message || 'Registration failed.'); return; }
    var uid = res.data.user ? res.data.user.id : null;
    if (!uid) {
      toast('Check your email to confirm your account, then sign in.','success');
      return;
    }

    sb.from('profiles').select('id', { count: 'exact', head: true }).then(function({ count, error }){
      var profileRole = 'pending';
      var profileStatus = 'pending';
      if (!error && (count === 0 || count === null)) {
        profileRole = 'super_admin';
        profileStatus = 'active';
      }

      return sb.from('profiles').insert({
        id: uid,
        email: email,
        full_name: name,
        role: profileRole,
        status: profileStatus
      }).then(function(){
        if (profileRole === 'pending') {
          return sb.from('admin_requests').insert({
            user_id: uid,
            email: email,
            full_name: name,
            reason: reason,
            status: 'pending'
          });
        }
        return { error: null };
      });
    }).then(function(result){
      if (result && result.error) {
        throw result.error;
      }
      if (sb && sb.auth && typeof sb.auth.signOut === 'function') {
        return sb.auth.signOut();
      }
      return null;
    }).then(function(){
      showAuthError('');
      toast('Registration complete. You can sign in now.','success');
      switchAuth('login');
      $('register-form').reset();
    }).catch(function(err){
      console.error('[Admin] register failed:', err);
      showAuthError(err && err.message ? err.message : 'Registration failed.');
    });
  });
});

$('logout-btn').addEventListener('click', function(){
  if (sb) sb.auth.signOut();
  session=null; showAuth();
});

/* ---------- Routing ---------- */
document.querySelectorAll('.nav-item[data-view]').forEach(function(btn){
  btn.addEventListener('click', function(){ routeTo(btn.getAttribute('data-view')); });
});
function routeTo(view){
  currentView = view;
  document.querySelectorAll('.nav-item').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-view')===view); });
  document.querySelectorAll('.view').forEach(function(v){ v.classList.add('hidden'); });
  var el = $('view-'+view); if (el) el.classList.remove('hidden');
  var titles = {overview:'Overview',services:'Manage Services',portfolio:'Manage Portfolio',blogs:'Manage Blogs',testimonials:'Manage Testimonials',team:'Manage Team',submissions:'Contact Submissions',settings:'Website Settings',uploads:'Image Upload',requests:'Admin Requests'};
  $('view-title').textContent = titles[view] || 'Dashboard';
  $('sidebar').classList.remove('open'); $('sidebar-backdrop').classList.remove('show');
  if (view==='overview') loadOverview();
  if (view==='services') loadTable('services','services-body');
  if (view==='portfolio') loadTable('portfolio','portfolio-body');
  if (view==='blogs') loadTable('blogs','blogs-body');
  if (view==='testimonials') loadTable('testimonials','testimonials-body');
  if (view==='team') loadTable('team','team-body');
  if (view==='submissions') loadSubmissions();
  if (view==='settings') loadSettings();
  if (view==='requests') loadRequests();
}
$('hamburger').addEventListener('click', function(){ $('sidebar').classList.toggle('open'); $('sidebar-backdrop').classList.toggle('show'); });
$('sidebar-backdrop').addEventListener('click', function(){ $('sidebar').classList.remove('open'); $('sidebar-backdrop').classList.remove('show'); });

/* ---------- Data layer ---------- */
function db(table){
  return {
    select: function(){ return sb ? sb.from(table).select('*') : Promise.resolve({data:DEMO[table]||[],error:null}); },
    insert: function(row){ return sb ? sb.from(table).insert(row) : new Promise(function(res){ (DEMO[table]=DEMO[table]||[]).push(Object.assign({id:Date.now()},row)); res({error:null}); }); },
    update: function(id, patch){ return sb ? sb.from(table).update(patch).eq('id',id) : new Promise(function(res){ var arr=DEMO[table]||[]; var i=arr.findIndex(function(r){return r.id==id;}); if(i>-1) arr[i]=Object.assign({},arr[i],patch); res({error:null}); }); },
    delete: function(id){ return sb ? sb.from(table).delete().eq('id',id) : new Promise(function(res){ var arr=DEMO[table]||[]; DEMO[table]=arr.filter(function(r){return r.id!=id;}); res({error:null}); }); }
  };
}
function loadAll(){
  loadTable('services','services-body');
  loadTable('portfolio','portfolio-body');
  loadTable('blogs','blogs-body');
  loadTable('testimonials','testimonials-body');
  loadTable('team','team-body');
  loadSubmissions();
  loadRequests();
  loadOverview();
}

/* ---------- Overview ---------- */
function loadOverview(){
  var stats = [['services','Services'],['portfolio','Projects'],['blogs','Blog Posts'],['testimonials','Testimonials']];
  var grid = $('stats-grid'); grid.innerHTML = '';
  var remaining = stats.length;
  stats.forEach(function(pair){
    db(pair[0]).select().then(function(res){
      var n = (res.data||[]).length;
      var card = document.createElement('div'); card.className='stat-card';
      card.innerHTML = '<div class="num">'+n+'</div><div class="lbl">'+pair[1]+'</div>';
      grid.appendChild(card);
      remaining--;
      if (remaining<=0) sortStatsGrid();
    });
  });
  db('contact_submissions').select().then(function(res){
    var rows=(res.data||[]).filter(function(r){return r.status!=='read';});
    var b=$('sub-badge'); b.textContent=rows.length; b.hidden = rows.length===0;
  });
  db('admin_requests').select().then(function(res){
    var rows=(res.data||[]).filter(function(r){return r.status==='pending';});
    var b=$('req-badge'); b.textContent=rows.length; b.hidden = rows.length===0;
  });
  db('contact_submissions').select().then(function(res){
    var rows=(res.data||[]).slice().reverse().slice(0,5);
    var body=$('recent-sub-body'); body.innerHTML='';
    if(!rows.length){ body.innerHTML='<tr><td colspan="5" class="empty-row">No submissions yet</td></tr>'; return; }
    rows.forEach(function(r){
      body.insertAdjacentHTML('beforeend','<tr><td>'+esc(r.name)+'</td><td>'+esc(r.email)+'</td><td><span class="tag '+(r.status==='read'?'tag-gray':'tag-amber')+'">'+esc(r.status||'unread')+'</span></td><td>'+fmtDate(r.created_at)+'</td><td><button class="btn btn-ghost btn-sm" onclick="openSubmission('+r.id+')">View</button></td></tr>');
    });
  });
  db('blogs').select().then(function(res){
    var rows=(res.data||[]).slice().reverse().slice(0,5);
    var body=$('recent-blog-body'); body.innerHTML='';
    if(!rows.length){ body.innerHTML='<tr><td colspan="4" class="empty-row">No blog posts yet</td></tr>'; return; }
    rows.forEach(function(r){
      body.insertAdjacentHTML('beforeend','<tr><td>'+esc(r.title)+'</td><td><span class="tag tag-amber">'+esc(r.cat||'—')+'</span></td><td>'+fmtDate(r.date)+'</td><td><button class="btn btn-ghost btn-sm" onclick="openModal(\'blog\','+r.id+')">Edit</button></td></tr>');
    });
  });
}
function sortStatsGrid(){ /* keep services first */ }

/* ---------- Generic tables ---------- */
function loadTable(table, bodyId){
  db(table).select().then(function(res){
    var rows = res.data || [];
    var body = $(bodyId); body.innerHTML='';
    if (!rows.length){ body.innerHTML='<tr><td colspan="5" class="empty-row">Nothing here yet</td></tr>'; return; }
    rows.forEach(function(r){
      var actions = '<td><div class="row-actions"><button class="btn btn-ghost btn-sm" onclick="openModal(\''+table+'\','+r.id+')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteRow(\''+table+'\','+r.id+')">Delete</button></div></td>';
      if (table==='services'){
        body.insertAdjacentHTML('beforeend','<tr><td>'+esc(r.icon||'⚙️')+'</td><td><b>'+esc(r.title)+'</b></td><td style="max-width:340px">'+esc(r.desc)+'</td><td>'+esc(r.sort||0)+'</td>'+actions+'</tr>');
      } else if (table==='portfolio'){
        body.insertAdjacentHTML('beforeend','<tr><td>'+(r.img?'<img class="thumb" src="'+esc(r.img)+'" alt="" loading="lazy">':'—')+'</td><td><b>'+esc(r.title)+'</b></td><td><span class="tag tag-amber">'+esc(r.cat||'—')+'</span></td>'+actions+'</tr>');
      } else if (table==='blogs'){
        body.insertAdjacentHTML('beforeend','<tr><td>'+(r.img?'<img class="thumb" src="'+esc(r.img)+'" alt="" loading="lazy">':'—')+'</td><td><b>'+esc(r.title)+'</b></td><td><span class="tag tag-amber">'+esc(r.cat||'—')+'</span></td><td>'+fmtDate(r.date)+'</td>'+actions+'</tr>');
      } else if (table==='testimonials'){
        body.insertAdjacentHTML('beforeend','<tr><td><b>'+esc(r.name)+'</b></td><td>'+esc(r.company||'—')+'</td><td><span class="tag tag-amber">'+('★'.repeat(Math.min(5,r.rating||0))||'—')+'</span></td><td style="max-width:300px">'+esc((r.text||'').slice(0,60))+'…</td>'+actions+'</tr>');
      } else if (table==='team'){
        body.insertAdjacentHTML('beforeend','<tr><td>'+(r.photo?'<img class="thumb" src="'+esc(r.photo)+'" alt="" loading="lazy">':'—')+'</td><td><b>'+esc(r.name)+'</b></td><td>'+esc(r.role||'—')+'</td>'+actions+'</tr>');
      }
    });
  });
}
function deleteRow(table, id){
  if (!confirm('Delete this item?')) return;
  db(table).delete(id).then(function(){ toast('Deleted','success'); loadTable(table, table==='portfolio'?'portfolio-body':table==='blogs'?'blogs-body':table==='testimonials'?'testimonials-body':table==='team'?'team-body':'services-body'); loadOverview(); });
}

/* ---------- Submissions ---------- */
function loadSubmissions(){
  db('contact_submissions').select().then(function(res){
    var rows=(res.data||[]).slice().reverse();
    var body=$('submissions-body'); body.innerHTML='';
    if(!rows.length){ body.innerHTML='<tr><td colspan="7" class="empty-row">No submissions</td></tr>'; return; }
    rows.forEach(function(r){
      body.insertAdjacentHTML('beforeend','<tr><td><b>'+esc(r.name)+'</b></td><td>'+esc(r.email)+'</td><td>'+esc(r.phone||'—')+'</td><td style="max-width:280px">'+esc((r.message||'').slice(0,70))+'</td><td><span class="tag '+(r.status==='read'?'tag-gray':'tag-amber')+'">'+esc(r.status||'unread')+'</span></td><td>'+fmtDate(r.created_at)+'</td><td><div class="row-actions"><button class="btn btn-ghost btn-sm" onclick="openSubmission('+r.id+')">View</button>'+(r.status!=='read'?'<button class="btn btn-green btn-sm" onclick="markRead('+r.id+')">Read</button>':'')+'<button class="btn btn-danger btn-sm" onclick="deleteSubmission('+r.id+')">Del</button></div></td></tr>');
    });
  });
}
function openSubmission(id){
  db('contact_submissions').select().then(function(res){
    var r=(res.data||[]).filter(function(x){return x.id==id;})[0];
    if(!r) return;
    alert('From: '+r.name+' ('+r.email+(r.phone?', '+r.phone:'')+')\nDate: '+fmtDate(r.created_at)+'\n\n'+(r.message||'(no message)'));
  });
}
function markRead(id){ db('contact_submissions').update(id,{status:'read'}).then(function(){ toast('Marked as read','success'); loadSubmissions(); loadOverview(); }); }
function deleteSubmission(id){ if(!confirm('Delete this submission?')) return; db('contact_submissions').delete(id).then(function(){ toast('Deleted','success'); loadSubmissions(); loadOverview(); }); }

/* ---------- Admin requests ---------- */
function loadRequests(){
  if(!isSuper) return;
  db('admin_requests').select().then(function(res){
    var rows=(res.data||[]).filter(function(r){return r.status==='pending';});
    var list=$('requests-list'); list.innerHTML='';
    if(!rows.length){ list.innerHTML='<div class="empty-row" style="padding:30px;text-align:center;color:var(--muted)">No pending requests</div>'; return; }
    rows.forEach(function(r){
      var el=document.createElement('div'); el.className='req-card';
      el.innerHTML='<div class="req-info"><b>'+esc(r.full_name)+'</b> <span class="tag tag-amber">'+esc(r.email)+'</span><div class="sub">'+esc(r.reason||'')+'</div></div><div class="row-actions"><button class="btn btn-green btn-sm" onclick="approveRequest('+r.id+',\''+esc(r.user_id)+'\')">Approve</button><button class="btn btn-danger btn-sm" onclick="rejectRequest('+r.id+')">Reject</button></div>';
      list.appendChild(el);
    });
  });
}
function approveRequest(id, userId){
  if(!confirm('Approve this admin?')) return;
  db('admin_requests').update(id,{status:'approved'}).then(function(){
    sb.from('profiles').update({role:'admin',status:'active'}).eq('id',userId).then(function(){
      toast('Admin approved','success'); loadRequests(); loadOverview();
    });
  });
}
function rejectRequest(id){
  if(!confirm('Reject this request?')) return;
  db('admin_requests').update(id,{status:'rejected'}).then(function(){ toast('Request rejected','success'); loadRequests(); });
}

/* ---------- Settings ---------- */
function loadSettings(){
  db('settings').select().then(function(res){
    var rows=res.data||[];
    if(rows.length){
      var s=rows[0];
      $('set-hero-title').value=s.hero_title||''; $('set-hero-sub').value=s.hero_sub||'';
      $('set-email').value=s.email||''; $('set-phone').value=s.phone||''; $('set-address').value=s.address||'';
      $('set-whatsapp').value=s.whatsapp||''; $('set-facebook').value=s.facebook||''; $('set-instagram').value=s.instagram||'';
    } else {
      var d=DEMO.settings;
      $('set-hero-title').value=d.hero_title; $('set-hero-sub').value=d.hero_sub;
      $('set-email').value=d.email; $('set-phone').value=d.phone; $('set-address').value=d.address;
      $('set-whatsapp').value=d.whatsapp; $('set-facebook').value=d.facebook; $('set-instagram').value=d.instagram;
    }
  });
}
function saveSettings(){
  var payload={hero_title:$('set-hero-title').value,hero_sub:$('set-hero-sub').value,email:$('set-email').value,phone:$('set-phone').value,address:$('set-address').value,whatsapp:$('set-whatsapp').value,facebook:$('set-facebook').value,instagram:$('set-instagram').value};
  db('settings').select().then(function(res){
    if((res.data||[]).length){
      db('settings').update((res.data)[0].id,payload).then(function(){ toast('Settings saved','success'); });
    } else {
      db('settings').insert(payload).then(function(){ toast('Settings saved','success'); });
    }
  });
}

/* ---------- Modal CRUD ---------- */
var modalTable='', modalId=null, modalFields={};
function openModal(table, id){
  modalTable=table; modalId=id||null;
  var titles={service:'Service',portfolio:'Project',blog:'Blog Post',testimonial:'Testimonial',team:'Team Member'};
  $('modal-title').textContent = (id?'Edit ':'Add ')+titles[table];
  var fields='';
  if(table==='service'){
    fields = field('icon','Icon (emoji or short text)','text','briefcase')+field('title','Title','text','')+field('desc','Description','textarea','')+field('sort','Order','number','0');
  } else if(table==='portfolio'){
    fields = field('title','Project Title','text','')+field('cat','Category','text','')+field('img','Image URL','url','')+field('desc','Description','textarea','');
  } else if(table==='blog'){
    fields = field('title','Post Title','text','')+field('cat','Category','text','')+field('slug','Slug (URL)','text','')+field('img','Image URL','url','')+field('excerpt','Excerpt','textarea','')+field('date','Date','date','');
  } else if(table==='testimonial'){
    fields = field('name','Name','text','')+field('company','Company','text','')+field('rating','Rating (1-5)','number','5')+field('text','Testimonial','textarea','');
  } else if(table==='team'){
    fields = field('name','Name','text','')+field('role','Role','text','')+field('photo','Photo URL','url','')+field('bio','Bio','textarea','');
  }
  $('modal-fields').innerHTML=fields;
  modalFields={};
  $('modal-fields').querySelectorAll('[data-field]').forEach(function(el){ modalFields[el.getAttribute('data-field')]=el; });
  if(id){
    db(modalTable).select().then(function(res){
      var r=(res.data||[]).filter(function(x){return x.id==id;})[0];
      if(!r) return;
      Object.keys(modalFields).forEach(function(k){ if(r[k]!=null) modalFields[k].value=r[k]; });
    });
  }
  $('modal-backdrop').classList.add('show');
}
function field(name,label,type,placeholder){
  var ph=placeholder?' placeholder="'+placeholder+'"':'';
  if(type==='textarea') return '<div class="form-group"><label>'+label+'</label><textarea data-field="'+name+'" rows="3"'+ph+'></textarea></div>';
  return '<div class="form-group"><label>'+label+'</label><input type="'+type+'" data-field="'+name+'"'+ph+'></div>';
}
function closeModal(){ $('modal-backdrop').classList.remove('show'); }
$('modal-backdrop').addEventListener('click', function(e){ if(e.target===this) closeModal(); });
$('modal-form').addEventListener('submit', function(e){
  e.preventDefault();
  var payload={};
  Object.keys(modalFields).forEach(function(k){ payload[k]=modalFields[k].value.trim(); });
  if(modalId){ db(modalTable).update(modalId,payload).then(function(){ toast('Saved','success'); closeModal(); refreshCurrent(); }); }
  else { db(modalTable).insert(payload).then(function(){ toast('Added','success'); closeModal(); refreshCurrent(); }); }
});
function refreshCurrent(){ loadOverview(); if(currentView==='services')loadTable('services','services-body'); if(currentView==='portfolio')loadTable('portfolio','portfolio-body'); if(currentView==='blogs')loadTable('blogs','blogs-body'); if(currentView==='testimonials')loadTable('testimonials','testimonials-body'); if(currentView==='team')loadTable('team','team-body'); }

/* ---------- Uploads ---------- */
var drop=$('upload-drop'), input=$('upload-input');
drop.addEventListener('click', function(){ input.click(); });
input.addEventListener('change', function(){ if(input.files.length) uploadFiles(input.files); });
['dragover','dragenter'].forEach(function(ev){ drop.addEventListener(ev, function(e){ e.preventDefault(); drop.classList.add('drag'); }); });
['dragleave','drop'].forEach(function(ev){ drop.addEventListener(ev, function(e){ e.preventDefault(); drop.classList.remove('drag'); }); });
drop.addEventListener('drop', function(e){ if(e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files); });
function uploadFiles(files){
  if(!sb){ toast('Connect Supabase to use uploads','error'); return; }
  var preview=$('upload-preview');
  Array.prototype.forEach.call(files, function(file){
    if(file.size>5*1024*1024){ toast(file.name+' is over 5MB','error'); return; }
    var path = 'uploads/'+Date.now()+'-'+file.name.replace(/[^a-zA-Z0-9.\-_]/g,'_');
    sb.storage.from('site-images').upload(path, file).then(function(res){
      if(res.error){ toast('Upload failed: '+res.error.message,'error'); return; }
      var url = SUPABASE_CONFIG.url + '/storage/v1/object/public/site-images/' + path;
      var card=document.createElement('div'); card.className='file-card';
      card.innerHTML='<img src="'+url+'" alt="'+esc(file.name)+'"><button class="btn btn-ghost copy-btn" data-url="'+url+'">Copy URL</button>';
      card.querySelector('.copy-btn').addEventListener('click', function(){
        var ta=document.createElement('textarea'); ta.value=url; document.body.appendChild(ta); ta.select();
        try{document.execCommand('copy');}catch(err){}
        document.body.removeChild(ta); toast('URL copied','success');
      });
      preview.prepend(card);
      toast('Uploaded '+file.name,'success');
    });
  });
  input.value='';
}
