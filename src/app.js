(function(){
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pl=(n,w,ws)=>`${n} ${n===1?w:(ws||w+'s')}`;

/* ---------- photos (Unsplash, embedded) ---------- */
const IMG={{IMGS}};
(function(){const st=document.createElement('style');st.textContent=Object.entries(IMG).map(([k,v])=>`.ph-${k}{background-image:url("${v}")}`).join('\n');document.head.appendChild(st)})();

/* ---------- icons: Lucide (ISC) ---------- */
const L={
 'message-circle':'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
 'message-square':'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
 'send':'<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
 'radio':'<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
 'target':'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
 'mic':'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
 'link':'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
 'video':'<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
 'file-text':'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
 'shopping-bag':'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
 'clipboard-list':'<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
 'smartphone':'<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
 'bell':'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
 'shuffle':'<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/>',
 'layers':'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
 'users':'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
 'inbox':'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
 'bar-chart':'<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
 'copy':'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
 'lock':'<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
 'shield-check':'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
 'info':'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
 'chevron-down':'<path d="m6 9 6 6 6-6"/>',
 'check':'<path d="M20 6 9 17l-5-5"/>',
 'x':'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
 'plus':'<path d="M5 12h14"/><path d="M12 5v14"/>',
 'clock':'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
 'sparkles':'<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
 'arrow-right':'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
 'arrow-left':'<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
 'instagram':'<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
 'repeat':'<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
 'play':'<polygon points="6 3 20 12 6 21 6 3"/>',
 'reply':'<polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>',
 'gift':'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
 'zap':'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
 'log-out':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
 'magnet':'<path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"/><path d="m5 8 4 4"/><path d="m12 15 4 4"/>',
 'trash':'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
 'upload':'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
 'crown':'<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>'
};
const ic=n=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${L[n]||''}</svg>`;
const icw=(n,cls='ic')=>`<span class="${cls}">${ic(n)}</span>`;
function hydrateIcons(root=document){root.querySelectorAll('i.ic[data-ic]').forEach(el=>{const p=el.parentElement;el.outerHTML=(p&&p.classList.contains('ic'))?ic(el.dataset.ic):`<span class="ic">${ic(el.dataset.ic)}</span>`})}
hydrateIcons();
$$('[data-wave]').forEach(w=>{let h='';for(let i=0;i<+w.dataset.wave;i++)h+=`<i style="height:${4+Math.round(Math.abs(Math.sin(i*1.7))*14)}px"></i>`;w.innerHTML=h});

/* ---------- sample data ---------- */
const SHOP='linen.studio';
const POSTS=[
 {n:'Linen shirt dress',ph:'p0',cap:'The summer drop is here. Comment “price” and we’ll DM you.'},
 {n:'Silk blouse',ph:'p1',cap:'Our silk blouse, now in four colors.'},
 {n:'Dress try-on',ph:'p2',reel:1,cap:'Trying on the linen dress in size S.'},
 {n:'Linen trousers',ph:'p3',cap:'Drawstring linen trousers, relaxed fit.'},
 {n:'Summer set',ph:'p4',cap:'Blouse and trousers, styled together.'},
 {n:'Leather tote',ph:'p5',cap:'Hand-stitched leather tote.'},
 {n:'Cotton scarf',ph:'p6',cap:'Striped cotton scarf.'},
 {n:'Weekend sale',ph:'p7',cap:'The sale ends Sunday.'}
];
const TEMPLATES={
 price:'Hi! Thanks for your comment.\nThe linen shirt dress is $89. Tap the button below to see colors and order.',
 welcome:'Hi, welcome to Linen Studio!\nAsk us anything. Our team replies fast.',
 link:'Here’s the link to the product. Any questions? Just ask here.',
 hours:'Thanks for your message! We’re online 10am–10pm and will get back to you soon.'
};
const BLOCKS={
 buttons:{l:'Buttons & links',i:'link'},
 voice:{l:'Voice note',i:'mic',lock:1},
 video:{l:'Video',i:'video',lock:1},
 file:{l:'PDF catalog',i:'file-text'},
 carousel:{l:'Product carousel',i:'shopping-bag'},
 form:{l:'Form & quiz',i:'clipboard-list'},
 sms:{l:'Phone & SMS',i:'smartphone',lock:1}
};
const NEWBLOCK={
 buttons:()=>({type:'buttons',items:[{t:'See colors & order',u:'linen.studio/dress'}]}),
 voice:()=>({type:'voice',name:'dress-intro.mp3',dur:'1:24'}),
 video:()=>({type:'video',name:'dress-try-on.mp4',dur:'0:42'}),
 file:()=>({type:'file',name:'summer-catalog.pdf',size:'2.4 MB'}),
 carousel:()=>({type:'carousel',items:[{n:'Linen dress',p:'$89',ph:'p0'},{n:'Silk blouse',p:'$65',ph:'p1'},{n:'Linen trousers',p:'$72',ph:'p3'}]}),
 form:()=>({type:'form',qs:['What’s your name?','What size do you usually wear?','Share your number for a quick fitting call']}),
 sms:()=>({type:'sms',text:'Linen Studio: here’s 15% off. Use code LINEN15'})
};
const EXTRA_PH=['p4','p5','p6','p7','p2'];
function freshRule(){return{
 trigger:'comment',postMode:'all',sel:new Set([0]),keywords:['price','link'],
 replyOn:true,variants:['Just sent you the price and colors in DM','Check your DMs, we sent all the details','Thanks for asking! The details are in your DMs'],
 dmOn:true,tpl:'price',dmText:TEMPLATES.price,blocks:[NEWBLOCK.buttons()],
 followOn:false,followDelay:'3',followText:'Still thinking about the linen dress? Size S is almost gone.'
}}
const S={email:'',plan:'free',start:null,connected:false,tab:'comment',vi:0,upsell:null,lastAdded:null,rule:freshRule(),view:'landing'};

/* ---------- router + wizard ---------- */
const STEPS=[['signup','Sign up'],['connect','Connect'],['builder','Build'],['done','Go live']];
function renderWiz(v){
  const idx=STEPS.findIndex(s=>s[0]===v);
  const html=`<ol class="wiz-steps" aria-label="Setup steps">${STEPS.map((s,i)=>{const st=(i<idx||v==='done')?'is-done':i===idx?'is-on':'';return `<li class="${st}" ${i===idx?'aria-current="step"':''}><span class="wl">${st==='is-done'?ic('check'):`<em>${i+1}</em>`}<span class="lb">${s[1]}</span></span><i></i></li>`}).join('')}</ol>`;
  $$(`#v-${v} [data-wiz]`).forEach(w=>w.innerHTML=html);
}
function renderActions(){
  const v=S.view;let label='',act='',noBack=false;
  if(v==='signup'){ if($('#codeStep').hidden){noBack=true;label='Send code';act='sendcode'} else {label='Verify and continue';act='verify'} }
  if(v==='connect'){ if(S.connected){label='Build your first auto-reply';act='builder'} else {label='Continue with Instagram';act='connect'} }
  if(v==='builder'){label='Turn on auto-reply';act='activate'}
  if(v==='done'){label='Build another reply';act='newrule'}
  const lead=act==='connect'?ic('instagram'):act==='newrule'?ic('plus'):'';
  const trail=(act==='connect'||act==='newrule')?'':ic('arrow-right');
  $$(`#v-${v} [data-actions]`).forEach(a=>{a.classList.toggle('solo',noBack);a.innerHTML=`${noBack?'':`<button type="button" class="btn btn-ghost btn-lg" data-back>${ic('arrow-left')}Back</button>`}<button type="button" class="btn btn-primary btn-lg" data-act="${act}" ${act==='activate'?'data-activate':''}>${lead}${label}${trail}</button>`});
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act;
  if(a==='sendcode')$('#emailForm').requestSubmit();
  if(a==='verify')$('#codeForm').requestSubmit();
  if(a==='connect')runConnect();
  if(a==='builder')go('builder');
  if(a==='newrule'){S.rule=freshRule();S.tab='comment';S.vi=0;go('builder')}
});
function go(v){
  S.view=v;
  $$('.view').forEach(x=>x.hidden=x.id!=='v-'+v);
  $('#flowHead').hidden=v==='landing';
  if(v!=='landing')renderWiz(v);
  if(v==='signup'){if(!S.start)S.start=Date.now(); if(S.email&&!S.editEmail){showCode()}else{showEmail()} S.editEmail=false}
  if(v==='connect'){$('#connectBefore').hidden=S.connected;$('#connectAfter').hidden=!S.connected;syncPlan()}
  if(v==='builder'){if(!S.start)S.start=Date.now();renderForm();renderPreview()}
  if(v==='done')renderDone();
  renderActions();
  try{history.replaceState(null,'','#'+v)}catch(e){}
  window.scrollTo(0,0);
}
function back(){
  const v=S.view;
  if(v==='signup'){ if(!$('#codeStep').hidden){showEmail();return} go('landing');return }
  if(v==='connect'){S.editEmail=true;go('signup');return}
  if(v==='builder'){go('connect');return}
  if(v==='done'){go('builder');return}
}
document.addEventListener('click',e=>{
  if(e.target.closest('[data-back]')){back();return}
  const g=e.target.closest('[data-go]'); if(g){e.preventDefault();go(g.dataset.go);return}
  const sc=e.target.closest('[data-scroll]'); if(sc){e.preventDefault();document.getElementById(sc.dataset.scroll).scrollIntoView({behavior:'smooth'})}
});
function toast(t){const el=$('#toast');el.textContent=t;el.hidden=false;el.style.animation='none';el.offsetHeight;el.style.animation='';clearTimeout(toast.t);toast.t=setTimeout(()=>el.hidden=true,2600)}

/* ---------- email ---------- */
const cleanEmail=v=>String(v).trim().toLowerCase();
const okEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const EMAIL_ERR='That email doesn’t look right. Try something like name@shop.com.';
function bindEmail(form,input,err,onOk){
  form.addEventListener('submit',e=>{e.preventDefault();const p=cleanEmail(input.value);
    if(!okEmail(p)){err.textContent=EMAIL_ERR;err.hidden=false;input.classList.add('bad');input.focus();return}
    err.hidden=true;input.classList.remove('bad');S.email=p;onOk()});
  input.addEventListener('input',()=>{input.classList.remove('bad');err.hidden=true});
}
bindEmail($('#heroForm'),$('#heroEmail'),$('#heroErr'),()=>{S.start=Date.now();go('signup')});
bindEmail($('#emailForm'),$('#email'),$('#emailErr'),()=>showCode());
function showEmail(){$('#emailStep').hidden=false;$('#codeStep').hidden=true;renderActions();if(S.email)$('#email').value=S.email;setTimeout(()=>$('#email').focus(),50)}

/* ---------- one-time code ---------- */
const otps=$$('#otp input'),N=otps.length;let cdT;
function showCode(){
  $('#emailStep').hidden=true;$('#codeStep').hidden=false;renderActions();
  $('#sentTo').textContent=S.email;
  otps.forEach(o=>o.value='');$('#codeErr').hidden=true;
  setTimeout(()=>otps[0].focus(),50);
  let s=59;clearInterval(cdT);$('#resend').innerHTML='Resend code in <span id="cd">0:59</span>';
  cdT=setInterval(()=>{s--;const c=$('#cd');if(c)c.textContent='0:'+String(s).padStart(2,'0');if(s<=0){clearInterval(cdT);$('#resend').innerHTML='<button class="linkbtn" type="button" id="rs">Resend code</button>'}},1000);
}
document.addEventListener('click',e=>{if(e.target.id==='rs'){toast('New code sent');showCode()}});
$('#editEmail').addEventListener('click',()=>showEmail());
otps.forEach((o,i)=>{
  o.addEventListener('input',()=>{o.value=o.value.replace(/\D/g,'').slice(-1);if(o.value&&i<N-1)otps[i+1].focus();if(otps.every(x=>x.value))$('#codeForm').requestSubmit()});
  o.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!o.value&&i)otps[i-1].focus()});
  o.addEventListener('paste',e=>{const d=e.clipboardData.getData('text').replace(/\D/g,'').slice(0,N);if(d.length){e.preventDefault();d.split('').forEach((c,j)=>otps[j].value=c);(otps[d.length]||otps[N-1]).focus();if(d.length===N)$('#codeForm').requestSubmit()}});
});
$('#codeForm').addEventListener('submit',e=>{e.preventDefault();if(!otps.every(x=>x.value)){$('#codeErr').textContent='The code has 6 digits. Fill in all of them.';$('#codeErr').hidden=false;return}clearInterval(cdT);go('connect')});

/* ---------- connect ---------- */
function runConnect(msg){
  const ov=$('#ov');$('#ovT').textContent='Opening Instagram login…';$('#ovS').textContent=msg||'In the real product, Meta’s official login and permission window opens here.';ov.hidden=false;
  setTimeout(()=>{$('#ovT').textContent='Reading your account and posts';$('#ovS').textContent='This takes a few seconds.'},1500);
  setTimeout(()=>{ov.hidden=true;S.connected=true;$('#connectBefore').hidden=true;$('#connectAfter').hidden=false;syncPlan();renderActions()},2900);
}
$('#changePage').addEventListener('click',()=>runConnect('Pick the right account on Instagram’s screen. It replaces the current connection.'));
const planName=()=>S.plan==='free'?'Free':'Starter';
function syncPlan(){
  $('#kvPlan').textContent=planName();
  const u=$('#upg');
  if(S.plan!=='free'){u.classList.add('is-paid');u.innerHTML=`<div class="upg-h"><span class="pic sm ok">${ic('check')}</span><div><b>Starter is active</b><small>Voice notes, video and SMS are now unlocked in the builder.</small></div></div>`}
}
$('#upgBtn').addEventListener('click',()=>{S.plan='starter';syncPlan();toast('Starter is active (simulated payment)')});

/* ---------- builder form ---------- */
const R=()=>S.rule;
const cl=(open,inner,id='',extra='')=>`<div class="cl ${open?'open':''} ${extra}" ${id?`id="${id}"`:''}><div class="cl-in">${inner}</div></div>`;
const selTxt=n=>`${pl(n,'post')} selected`;
function postsHtml(){const r=R();return `<div class="posts">${POSTS.map((p,i)=>`<button type="button" class="post ph ph-${p.ph}" data-post="${i}" aria-pressed="${r.sel.has(i)}" aria-label="${p.n}">${p.reel?'<span class="rl">Reel</span>':''}<span>${p.n}</span></button>`).join('')}</div><p class="hint" id="selCount">${selTxt(r.sel.size)}</p>`}
function variantsHtml(){const r=R();const solo=r.variants.length<2;return r.variants.map((v,i)=>`<div class="var-row ${solo?'solo':''}"><span class="num">${i+1}</span><input class="input" data-var="${i}" value="${esc(v)}" aria-label="Reply ${i+1}">${solo?'':`<button type="button" class="icon-btn" data-rmvar="${i}" aria-label="Delete reply ${i+1}">${ic('trash')}</button>`}</div>`).join('')+(r.variants.length<5?`<button type="button" class="add-btn" id="addVar">${ic('plus')}Add a variation</button>`:'')}
function addbarHtml(){const r=R();return `<div class="addbar">${Object.entries(BLOCKS).map(([k,b])=>{const has=r.blocks.some(x=>x.type===k);const locked=b.lock&&S.plan==='free';return `<button type="button" data-add="${k}" ${has?'disabled':''} ${locked?'data-tip="Unlocks on Starter"':''}>${icw(b.i)}${b.l}${locked?`<span class="ic lk">${ic('lock')}</span>`:''}</button>`}).join('')}</div>`}
function renderForm(fade){
  const r=R(),t=r.trigger;
  const trig=[['comment','Post comments','Recommended','message-circle'],['dm','DMs','Incoming messages','send'],['live','Live','While you’re live','radio']];
  let h=`<div class="blk"><div class="blk-h"><h2>Where should we reply?</h2></div>
   <div class="seg" role="group" aria-label="Reply type">${trig.map(x=>`<button type="button" data-trig="${x[0]}" aria-pressed="${t===x[0]}">${icw(x[3])}<span class="tx">${x[1]}<small>${x[2]}</small></span></button>`).join('')}</div></div>`;
  if(t==='comment'){
    h+=`<div class="blk"><div class="blk-h"><h2>Which posts?</h2></div><div class="blk-body">
     <div class="radios"><button type="button" data-pm="all" aria-pressed="${r.postMode==='all'}">All posts and reels</button><button type="button" data-pm="sel" aria-pressed="${r.postMode==='sel'}">Selected posts</button></div>
     ${cl(r.postMode==='sel',postsHtml(),'postsCl')}
     ${cl(r.postMode==='all','<p class="hint">Posts you publish from now on are included too.</p>','allCl')}
    </div></div>`;
  }
  if(t==='live'){h+=`<div class="blk"><div class="info">${icw('info')}<span>This reply runs during every live you host and answers live comments.</span></div></div>`}
  h+=`<div class="blk"><div class="blk-h"><h2>Keywords</h2></div>
   <p class="hint">When a ${t==='dm'?'message':'comment'} contains any of these words, the reply goes out. Press Enter after each word.</p>
   <div class="blk-body"><div class="chips" id="chips">${chipsHtml()}</div></div></div>`;
  if(t!=='dm'){
    h+=`<div class="blk"><div class="blk-h"><h2>Reply under the comment</h2><label class="switch"><input type="checkbox" id="replyOn" ${r.replyOn?'checked':''} aria-label="Reply under the comment"><span></span></label></div>
    ${cl(r.replyOn,`<p class="hint">Each time, one of these replies is picked at random and sent after a few seconds, so Instagram doesn’t read it as spam.</p><div class="blk-body" id="varsBox">${variantsHtml()}</div>`,'replyCl')}</div>`;
  }
  const dmTitle=t==='dm'?'DM reply':'DM the '+(t==='live'?'live commenter':'commenter');
  const dmOpen=t==='dm'||r.dmOn;
  h+=`<div class="blk"><div class="blk-h"><h2>${dmTitle}</h2>${t==='dm'?'':`<label class="switch"><input type="checkbox" id="dmOn" ${r.dmOn?'checked':''} aria-label="${dmTitle}"><span></span></label>`}</div>`;
  h+=cl(dmOpen,`<div class="blk-body">
     <div class="row2"><label class="lbl" for="dmText">DM text</label>
      <select class="input" id="tpl" aria-label="Template"><option value="">Use a template</option><option value="price" ${r.tpl==='price'?'selected':''}>Price info</option><option value="welcome" ${r.tpl==='welcome'?'selected':''}>Welcome</option><option value="link" ${r.tpl==='link'?'selected':''}>Product link</option><option value="hours" ${r.tpl==='hours'?'selected':''}>Business hours</option></select></div>
     <textarea class="input" id="dmText" rows="4">${esc(r.dmText)}</textarea>
     <div id="blocksBox" style="display:flex;flex-direction:column;gap:12px">${r.blocks.map((b,i)=>blockEditor(b,i)).join('')}</div>
     <div><p class="lbl" style="margin-bottom:8px">Add to the DM <span class="hint">(optional)</span></p>
      ${addbarHtml()}
      ${S.upsell?upsellHtml(S.upsell):''}
     </div>
     ${t!=='dm'?`<div class="info">${icw('info')}<span>Each person gets one DM per ${t==='live'?'live':'post'}, so it never feels like spam.</span></div>`:''}
    </div>`,'dmCl');
  h+=`</div>`;
  h+=`<div class="wrapblk cl ${dmOpen?'open':''}" id="followCl"><div class="cl-in"><div class="blk"><div class="blk-h"><h2>Auto follow-up <span class="q">Optional</span></h2><label class="switch"><input type="checkbox" id="followOn" ${r.followOn?'checked':''} aria-label="Auto follow-up"><span></span></label></div>
    ${cl(!r.followOn,'<p class="hint">If the customer doesn’t reply, send them one more message a few hours later.</p>','followOffCl')}
    ${cl(r.followOn,`<div class="blk-body"><div class="row2"><label class="lbl" for="fDelay">Send the follow-up</label><select class="input" id="fDelay">${['1','3','6','12','20'].map(d=>`<option value="${d}" ${r.followDelay===d?'selected':''}>${pl(+d,'hour')} later</option>`).join('')}</select></div>
     <textarea class="input" id="fText" rows="2">${esc(r.followText)}</textarea>
     <div class="info">${icw('clock')}<span>Instagram only allows messages within 24 hours of the customer’s last message. If that window has passed, the follow-up isn’t sent.</span></div></div>`,'followCl2')}
    </div></div></div>`;
  const f=$('#form');f.innerHTML=h;
  if(fade){f.classList.remove('fade');void f.offsetWidth;f.classList.add('fade')}
  $('#pvTabs [data-tab="comment"]').hidden=t==='dm';
  if(t==='dm')S.tab='dm';
  setTabs();
}
function chipsHtml(){const r=R();return r.keywords.map((k,i)=>`<span class="chip">${esc(k)}<button type="button" data-rmkw="${i}" aria-label="Remove ${esc(k)}">${ic('x')}</button></span>`).join('')+`<input id="kwIn" placeholder="${r.keywords.length?'Add another…':'e.g. price'}" aria-label="Add a keyword">`}
function upsellHtml(k){return `<div class="upsell"><div class="u-h">${icw('crown')}<div><b>${BLOCKS[k].l} unlocks on Starter</b><span>Upgrading also adds:</span></div></div>
 <ul><li>${ic('check')}Voice &amp; video up to 5 min</li><li>${ic('check')}Phone capture &amp; SMS</li><li>${ic('check')}Unlimited sends</li></ul>
 <div class="acts"><button type="button" class="btn btn-primary btn-sm" data-upgrade="${k}">${ic('crown')}Upgrade to Starter</button><button type="button" class="btn btn-text btn-sm" data-cancelup>Not now</button><small>$19 / month</small></div></div>`}
function rmBtn(attr,label){return `<button type="button" class="icon-btn md" ${attr} aria-label="${label}">${ic('trash')}</button>`}
function blockEditor(b,i){
  const head=`<div class="dblk-h">${icw(BLOCKS[b.type].i)}${BLOCKS[b.type].l}<button type="button" class="icon-btn sm" data-rmblk="${i}" aria-label="Remove ${BLOCKS[b.type].l}">${ic('x')}</button></div>`;
  let body='';
  if(b.type==='buttons'){body=b.items.map((x,j)=>`<div class="mini"><input class="input" data-bt="${i}:${j}" value="${esc(x.t)}" aria-label="Button text" placeholder="Button text"><input class="input" data-bu="${i}:${j}" value="${esc(x.u)}" aria-label="Button link" placeholder="Link (optional)">${b.items.length>1?rmBtn(`data-rmbt="${i}:${j}"`,'Remove button'):''}</div>`).join('')+(b.items.length<3?`<button type="button" class="add-btn" data-addbt="${i}">${ic('plus')}Add a button</button>`:'')}
  if(b.type==='voice'){body=`<div class="filebox">${icw('mic')}<b>${b.name}</b><span class="hint">${b.dur}</span><button type="button" class="linkbtn">Replace</button></div><p class="hint">Sent as a playable voice note. Up to ${S.plan==='pro'?'20':'5'} minutes on ${S.plan==='pro'?'Pro':'Starter'}.</p>`}
  if(b.type==='video'){body=`<div class="filebox">${icw('video')}<b>${b.name}</b><span class="hint">${b.dur}</span><button type="button" class="linkbtn">Replace</button></div>`}
  if(b.type==='file'){body=`<div class="filebox">${icw('file-text')}<b>${b.name}</b><span class="hint">${b.size}</span><button type="button" class="linkbtn">Replace</button></div>`}
  if(b.type==='carousel'){body=b.items.map((x,j)=>`<div class="mini"><span class="av ph-${x.ph}" style="width:40px;height:40px;border-radius:8px"></span><input class="input" data-cn="${i}:${j}" value="${esc(x.n)}" aria-label="Product name"><input class="input price-in" data-cp="${i}:${j}" value="${esc(x.p)}" aria-label="Price">${b.items.length>2?rmBtn(`data-rmcar="${i}:${j}"`,'Remove product'):''}</div>`).join('')+(b.items.length<10?`<button type="button" class="add-btn" data-addcar="${i}">${ic('plus')}Add a product</button>`:'')+`<p class="hint">2 to 10 cards, each with a photo, a price and a “Buy now” button.</p>`}
  if(b.type==='form'){const solo=b.qs.length<2;body=b.qs.map((q,j)=>`<div class="var-row ${solo?'solo':''}"><span class="num">${j+1}</span><input class="input" data-fq="${i}:${j}" value="${esc(q)}" aria-label="Question ${j+1}">${solo?'':rmBtn(`data-rmfq="${i}:${j}"`,'Remove question')}</div>`).join('')+`<button type="button" class="add-btn" data-addfq="${i}">${ic('plus')}Add a question</button><p class="hint">Questions are asked one at a time in the DM. Answers are saved to your dashboard and can be exported.</p>`}
  if(b.type==='sms'){body=`<label class="lbl" for="sms${i}">SMS text</label><input class="input" id="sms${i}" data-sms="${i}" value="${esc(b.text)}"><p class="hint">We ask the customer for their number. If it doesn’t look right, we ask again with an example, then send the SMS.</p>`}
  return `<div class="dblk ${S.lastAdded===b.type?'new':''}">${head}${body}</div>`;
}
function rerenderVars(){const box=$('#varsBox');if(box)box.innerHTML=variantsHtml()}
function rerenderBlocks(){const r=R();$('#blocksBox').innerHTML=r.blocks.map((b,i)=>blockEditor(b,i)).join('');const ab=$('#blocksBox').parentElement.querySelector('.addbar');ab.outerHTML=addbarHtml();const up=$('#form .upsell');if(up)up.remove();if(S.upsell){$('#form .addbar').insertAdjacentHTML('afterend',upsellHtml(S.upsell))};S.lastAdded=null}

/* form events */
const form=$('#form');
form.addEventListener('click',e=>{
  const r=R(),el=e.target.closest('button');if(!el)return;const d=el.dataset;
  const ij=v=>v.split(':').map(Number);
  if(d.trig){if(r.trigger===d.trig)return;r.trigger=d.trig;S.tab=d.trig==='dm'?'dm':'comment';S.upsell=null;renderForm(true);renderPreview();return}
  if(d.pm){r.postMode=d.pm;$$('.radios button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pm===d.pm));$('#postsCl').classList.toggle('open',d.pm==='sel');$('#allCl').classList.toggle('open',d.pm==='all');renderPreview();return}
  if(d.post!==undefined){const i=+d.post;if(r.sel.has(i)){if(r.sel.size>1)r.sel.delete(i)}else r.sel.add(i);el.setAttribute('aria-pressed',r.sel.has(i));$('#selCount').textContent=selTxt(r.sel.size);renderPreview();return}
  if(d.rmkw!==undefined){r.keywords.splice(+d.rmkw,1);$('#chips').innerHTML=chipsHtml();renderPreview();$('#kwIn').focus();return}
  if(el.id==='addVar'){r.variants.push('');rerenderVars();const ins=$$('[data-var]');ins[ins.length-1].focus();return}
  if(d.rmvar!==undefined){r.variants.splice(+d.rmvar,1);S.vi=0;rerenderVars();renderPreview();return}
  if(d.add){const k=d.add;if(BLOCKS[k].lock&&S.plan==='free'){S.upsell=k;rerenderBlocks();return}r.blocks.push(NEWBLOCK[k]());S.lastAdded=k;S.upsell=null;S.tab='dm';setTabs();rerenderBlocks();renderPreview();return}
  if(d.upgrade){S.plan='starter';r.blocks.push(NEWBLOCK[d.upgrade]());S.lastAdded=d.upgrade;S.upsell=null;S.tab='dm';setTabs();rerenderBlocks();renderPreview();toast('Starter is active (simulated payment)');return}
  if(d.cancelup!==undefined){S.upsell=null;rerenderBlocks();return}
  if(d.rmblk!==undefined){r.blocks.splice(+d.rmblk,1);rerenderBlocks();renderPreview();return}
  if(d.addbt!==undefined){r.blocks[+d.addbt].items.push({t:'',u:''});rerenderBlocks();renderPreview();return}
  if(d.rmbt){const[a,b]=ij(d.rmbt);r.blocks[a].items.splice(b,1);rerenderBlocks();renderPreview();return}
  if(d.addcar!==undefined){const it=r.blocks[+d.addcar].items;it.push({n:'New product',p:'$0',ph:EXTRA_PH[(it.length-3)%EXTRA_PH.length]});rerenderBlocks();renderPreview();return}
  if(d.rmcar){const[a,b]=ij(d.rmcar);r.blocks[a].items.splice(b,1);rerenderBlocks();renderPreview();return}
  if(d.addfq!==undefined){r.blocks[+d.addfq].qs.push('');rerenderBlocks();renderPreview();return}
  if(d.rmfq){const[a,b]=ij(d.rmfq);r.blocks[a].qs.splice(b,1);rerenderBlocks();renderPreview();return}
});
form.addEventListener('input',e=>{
  const r=R(),el=e.target,d=el.dataset;const ij=v=>v.split(':').map(Number);
  if(d.var!==undefined){r.variants[+d.var]=el.value;S.vi=+d.var;if(S.tab!=='comment'&&r.trigger!=='dm'){S.tab='comment';setTabs()}}
  else{
    if(el.id==='dmText')r.dmText=el.value;
    else if(el.id==='fText')r.followText=el.value;
    else if(d.bt){const[a,b]=ij(d.bt);r.blocks[a].items[b].t=el.value}
    else if(d.bu){const[a,b]=ij(d.bu);r.blocks[a].items[b].u=el.value}
    else if(d.cn){const[a,b]=ij(d.cn);r.blocks[a].items[b].n=el.value}
    else if(d.cp){const[a,b]=ij(d.cp);r.blocks[a].items[b].p=el.value}
    else if(d.fq){const[a,b]=ij(d.fq);r.blocks[a].qs[b]=el.value}
    else if(d.sms!==undefined){r.blocks[+d.sms].text=el.value}
    else return;
    if(S.tab!=='dm'){S.tab='dm';setTabs()}
  }
  renderPreview(true);
});
form.addEventListener('change',e=>{
  const r=R(),el=e.target;
  if(el.id==='replyOn'){r.replyOn=el.checked;$('#replyCl').classList.toggle('open',el.checked);renderPreview()}
  if(el.id==='dmOn'){r.dmOn=el.checked;$('#dmCl').classList.toggle('open',el.checked);$('#followCl').classList.toggle('open',el.checked);renderPreview()}
  if(el.id==='followOn'){r.followOn=el.checked;$('#followCl2').classList.toggle('open',el.checked);$('#followOffCl').classList.toggle('open',!el.checked);if(el.checked){S.tab='dm';setTabs()}renderPreview()}
  if(el.id==='fDelay'){r.followDelay=el.value;renderPreview()}
  if(el.id==='tpl'&&el.value){r.tpl=el.value;r.dmText=TEMPLATES[el.value];$('#dmText').value=r.dmText;S.tab='dm';setTabs();renderPreview()}
});
form.addEventListener('keydown',e=>{
  if(e.target.id!=='kwIn')return;const v=e.target.value.trim().replace(/,$/,'');
  if((e.key==='Enter'||e.key===',')&&v){e.preventDefault();if(!R().keywords.includes(v))R().keywords.push(v);$('#chips').innerHTML=chipsHtml();renderPreview();$('#kwIn').focus()}
  else if(e.key==='Enter')e.preventDefault();
  else if(e.key==='Backspace'&&!e.target.value&&R().keywords.length){R().keywords.pop();$('#chips').innerHTML=chipsHtml();renderPreview();$('#kwIn').focus()}
});

/* ---------- preview ---------- */
function setTabs(){$$('#pvTabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===S.tab))}
$('#pvTabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.tab=b.dataset.tab;setTabs();renderPreview()});
const kw0=()=>R().keywords[0]||'…';
function curVariant(){const v=R().variants.filter(x=>x.trim());if(!v.length)return null;return {txt:v[S.vi%v.length],i:S.vi%v.length,n:v.length}}
function commentScreen(){
  const r=R();const p=POSTS[r.postMode==='sel'?[...r.sel][0]:0];const v=r.replyOn?curVariant():null;
  if(r.trigger==='live'){
    return `<div class="notch"></div><div class="live ph ph-p2"><span class="badge">LIVE</span>
    <div class="lc"><span class="av sm ph-avsara"></span><div><b>ella.r</b>${esc(kw0())}?</div></div>
    ${v?`<div class="lc"><span class="av sm ph-avpage"></span><div><b>${SHOP}</b>${esc(v.txt)}</div></div>`:''}</div>`;
  }
  return `<div class="notch"></div><div class="scroll">
   <div class="ig-head"><span class="av story ph-avpage"></span><b>${SHOP}</b></div>
   <div class="ig-img ph ph-${p.ph}"><span>${p.n}</span></div>
   <div class="ig-cap"><b>${SHOP}</b>${p.cap}</div>
   <div class="cms"><div class="cm"><span class="av ph-avsara"></span><div><b>ella.r</b>${esc(kw0())}?<div class="meta">just now</div></div></div>
   ${v?`<div class="cm reply"><span class="av ph-avpage"></span><div><b>${SHOP}</b>${esc(v.txt)}<div class="meta">a few seconds later</div></div></div>`:''}
   <div class="cm"><span class="av ph-avmaryam"></span><div><b>nina.k</b>Do you have it in cream?<div class="meta">2m ago</div></div></div></div></div>`;
}
function blockView(b){
  if(b.type==='buttons')return `<div class="tbtns">${b.items.filter(x=>x.t.trim()).map(x=>`<span>${esc(x.t)}</span>`).join('')}</div>`;
  if(b.type==='voice'){let w='';for(let i=0;i<26;i++)w+=`<i style="height:${6+Math.round(Math.abs(Math.sin(i*1.7))*14)}px"></i>`;return `<div class="voice"><span class="pp">${ic('play')}</span><span class="wave">${w}</span><small>${b.dur}</small></div>`}
  if(b.type==='video')return `<div class="media ph ph-p2"><span class="pp">${ic('play')}</span><small>${b.dur}</small></div>`;
  if(b.type==='file')return `<div class="filecard"><span class="fi">PDF</span><div><b>${b.name}</b><span>${b.size}</span></div></div>`;
  if(b.type==='carousel')return `<div class="car">${b.items.map(x=>`<div class="pc"><div class="im ph ph-${x.ph}"></div><div class="t"><b>${esc(x.n)}</b><span>${esc(x.p)}</span></div><span class="by">Buy now</span></div>`).join('')}</div>`;
  if(b.type==='form'){const q=b.qs.filter(x=>x.trim());return q.length?`<div class="bub me">${esc(q[0])}</div><div class="bub them">Ella</div>${q[1]?`<div class="bub me">${esc(q[1])}</div>`:''}`:''}
  if(b.type==='sms')return `<div class="bub me">Send your phone number and we’ll text you a discount code.</div><div class="bub them">+1 415 555 0134</div><div class="bub me">Thanks! Your code is on its way.</div>`;
  return '';
}
function dmScreen(){
  const r=R();
  if(r.trigger!=='dm'&&!r.dmOn)return `<div class="notch"></div><div class="pv-empty">DMs are off.<br>We’ll only reply under the comment.</div>`;
  let th='';
  if(r.trigger==='dm')th+=`<div class="bub them">${esc(kw0())}</div>`;
  else th+=`<div class="sys">Replying to your comment${r.trigger==='live'?' on a live':''}</div>`;
  if(r.dmText.trim())th+=`<div class="bub me">${esc(r.dmText)}</div>`;
  const order=['buttons','voice','video','file','carousel','form','sms'];
  [...r.blocks].sort((a,b)=>order.indexOf(a.type)-order.indexOf(b.type)).forEach(b=>th+=blockView(b));
  if(r.followOn&&r.followText.trim())th+=`<div class="later">${pl(+r.followDelay,'hour')} later</div><div class="bub me">${esc(r.followText)}</div>`;
  return `<div class="notch"></div><div class="dm-head"><span class="av ph-avsara"></span>ella.r</div><div class="scroll"><div class="thread">${th}</div></div>`;
}
function renderPreview(keepScroll){
  const sc=$('#pvScreen');const prev=sc.querySelector('.scroll');const top=prev?prev.scrollTop:0;
  sc.innerHTML=S.tab==='comment'&&R().trigger!=='dm'?commentScreen():dmScreen();
  const nw=sc.querySelector('.scroll');if(nw){if(keepScroll)nw.scrollTop=top;else if(S.tab==='dm')nw.scrollTop=nw.scrollHeight}
  thumb(sc);
  const v=curVariant();
  $('#pvCap').textContent=S.tab==='comment'&&R().trigger!=='dm'?(R().replyOn&&v?`Comment reply ${v.i+1} of ${v.n}. A different one goes out each time.`:'Comment reply is off'):'What the customer sees in their DMs';
}
setInterval(()=>{if(!$('#v-builder').hidden&&S.tab==='comment'&&document.activeElement?.dataset?.var===undefined){const v=curVariant();if(v&&v.n>1){S.vi=(S.vi+1)%v.n;renderPreview(true)}}},2800);

/* overlay scrollbar inside phone: takes no space, appears on hover */
function thumb(screen){const s=screen.querySelector('.scroll');if(!s)return;let t=screen.querySelector('.sthumb');if(!t){t=document.createElement('span');t.className='sthumb';screen.appendChild(t)}
  const upd=()=>{const ch=s.clientHeight,sh=s.scrollHeight;if(sh<=ch+1){t.style.display='none';return}t.style.display='block';const h=Math.max(32,ch*ch/sh);t.style.height=h+'px';t.style.top=(s.offsetTop+(ch-h)*s.scrollTop/(sh-ch))+'px'};
  s.addEventListener('scroll',upd,{passive:true});requestAnimationFrame(upd)}
/* mobile preview sheet */
$('#pvOpen').addEventListener('click',()=>{$('#pvCol').classList.add('sheet');$('#pvClose').hidden=false;renderPreview()});
$('#pvClose').addEventListener('click',()=>{$('#pvCol').classList.remove('sheet');$('#pvClose').hidden=true});
$('#pvCol').addEventListener('click',e=>{if(e.target.id==='pvCol'){$('#pvCol').classList.remove('sheet');$('#pvClose').hidden=true}});

/* ---------- activate ---------- */
function validate(){
  const r=R();
  if(!r.keywords.length)return 'Add at least one keyword to turn this on.';
  if(r.trigger==='comment'&&r.postMode==='sel'&&!r.sel.size)return 'Pick at least one post.';
  if(r.trigger!=='dm'&&!r.replyOn&&!r.dmOn)return 'Turn on the comment reply, the DM, or both.';
  if(r.trigger!=='dm'&&r.replyOn&&!r.variants.some(v=>v.trim()))return 'Write the reply that goes under the comment.';
  if((r.trigger==='dm'||r.dmOn)&&!r.dmText.trim())return 'Write the DM text.';
  return '';
}
document.addEventListener('click',e=>{
  if(!e.target.closest('[data-activate]'))return;
  const m=validate();const fe=$('#fErr');
  if(m){fe.textContent=m;fe.hidden=false;fe.scrollIntoView({behavior:'smooth',block:'center'});return}
  fe.hidden=true;
  $('#pvCol').classList.remove('sheet');
  const ov=$('#ov');$('#ovT').textContent='Turning it on…';$('#ovS').textContent='Saving your auto-reply and switching it on for your account.';ov.hidden=false;
  setTimeout(()=>{ov.hidden=true;go('done')},1100);
});

/* ---------- done ---------- */
function renderDone(){
  const r=R();
  const sec=S.start?Math.max(1,Math.round((Date.now()-S.start)/1000)):0;
  const mm=Math.floor(sec/60),ss=sec%60;
  const place=r.trigger==='dm'?'in your DMs':'under your '+(r.trigger==='live'?'lives':'posts');
  $('#doneLead').textContent=sec?`Sign-up to first live reply: ${mm?mm+' min ':''}${ss} sec. From now on, anyone who writes one of your keywords ${place} gets a reply.`:'Your auto-reply is now running on your account.';
  const where=r.trigger==='dm'?'DMs':r.trigger==='live'?'Live comments':r.postMode==='all'?'All posts and reels':selTxt(r.sel.size);
  const acts=[];if(r.trigger!=='dm'&&r.replyOn)acts.push(`Comment reply (${pl(r.variants.filter(v=>v.trim()).length,'variation')})`);if(r.trigger==='dm'||r.dmOn)acts.push('DM');
  const extras=r.blocks.map(b=>BLOCKS[b.type].l);if(r.followOn)extras.push(`Follow-up after ${pl(+r.followDelay,'hour')}`);
  $('#doneSum').innerHTML=`<div><span>Account</span><b>@${SHOP}</b></div><div><span>Replies on</span><b>${where}</b></div><div><span>Keywords</span><b>${r.keywords.map(esc).join(', ')}</b></div><div><span>Response</span><b>${acts.join(' + ')}</b></div>${extras.length?`<div><span>DM attachments</span><b>${extras.map(esc).join(', ')}</b></div>`:''}<div><span>Plan</span><b>${planName()}</b></div>`;
  $('#testText').textContent=r.trigger==='dm'?`From another account, DM yours with “${kw0()}”, or run the simulation.`:`From another account, comment “${kw0()}” ${r.trigger==='live'?'on your live':'on one of your posts'}, or run the simulation.`;
  $('#tl1').textContent=r.trigger==='dm'?'DM received':'Comment received';
  $('#tl li[data-k="2"]').hidden=!(r.trigger!=='dm'&&r.replyOn);
  $('#tl li[data-k="3"]').hidden=!(r.trigger==='dm'||r.dmOn);
  $$('#tl li').forEach(li=>{li.classList.remove('ok');li.querySelector('small').textContent=''});
  S.tab='comment';
  $('#doneScreen').innerHTML=r.trigger==='dm'?dmScreen():commentScreen();thumb($('#doneScreen'));
}
$('#simBtn').addEventListener('click',()=>{
  const r=R();const lis=$$('#tl li').filter(l=>!l.hidden);lis.forEach(l=>{l.classList.remove('ok');l.querySelector('small').textContent=''});
  const times=['just now','3s later','4s later'];
  lis.forEach((l,i)=>setTimeout(()=>{l.classList.add('ok');l.querySelector('small').textContent=times[i];
    if(i===lis.length-1&&(r.trigger==='dm'||r.dmOn)){S.tab='dm';$('#doneScreen').innerHTML=dmScreen();thumb($('#doneScreen'))}},700+i*1100));
});

/* ---------- landing demo loop ---------- */
const demo=$('#demo');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce){let s=5;const rt=demo.querySelector('.rtxt');const full=rt.textContent;
  setInterval(()=>{if($('#v-landing').hidden)return;s=(s+1)%7;demo.dataset.s=Math.min(s,4);
    if(s===2)rt.innerHTML='<span class="typing"><i></i><i></i><i></i></span>';if(s===3)rt.textContent=full},1400);}

/* ---------- start ---------- */
const h=(location.hash||'').slice(1);
if(['signup','connect','builder','done'].includes(h)){S.start=Date.now();if(h!=='signup'){S.email='hello@linen.studio'}if(h==='builder'||h==='done')S.connected=true;go(h)}
else go('landing');
})();
