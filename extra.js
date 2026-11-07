const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function merge(a,b){const o={c:{},n:{},d:[]},A=a.c||{},B=b.c||{};
for(const i of new Set([...Object.keys(A),...Object.keys(B)])){const x=A[i],y=B[i];o.c[i]=!x?y:!y?x:(y.u||0)>(x.u||0)?y:x}
const An=a.n||{},Bn=b.n||{};for(const k of new Set([...Object.keys(An),...Object.keys(Bn)]))o.n[k]=Math.max(An[k]||0,Bn[k]||0);
o.d=[...new Set([...(a.d||[]),...(b.d||[])])].sort((p,q)=>p-q);return o}
function lev(a,b){const d=Array.from({length:a.length+1},(_,i)=>[i,...Array(b.length).fill(0)]);for(let j=1;j<=b.length;j++)d[0][j]=j;
for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]!=b[j-1]));return d[a.length][b.length]}
const sc=(a,b)=>a==b?0:lev(a,b)<=Math.max(1,Math.round(Math.max(a.length,b.length)*.3))?.5:1;
function align(t,h){const n=t.length,m=h.length,C=Array.from({length:n+1},()=>Array(m+1).fill(0));
for(let i=1;i<=n;i++)C[i][0]=i;for(let j=1;j<=m;j++)C[0][j]=j;
for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)C[i][j]=Math.min(C[i-1][j]+1,C[i][j-1]+1,C[i-1][j-1]+sc(t[i-1],h[j-1]));
const R=Array(n);let i=n,j=m;
while(i>0||j>0){if(i>0&&j>0&&C[i][j]==C[i-1][j-1]+sc(t[i-1],h[j-1])){const c=sc(t[i-1],h[j-1]);R[i-1]={s:c==0?"ok":c<1?"close":"bad",j:j-1};i--;j--}
else if(i>0&&C[i][j]==C[i-1][j]+1){R[i-1]={s:"miss"};i--}else j--}
return R}
//--ui
document.head.append(Object.assign(document.createElement("style"),{textContent:"h2~h2{margin-top:28px}.w{font-weight:600}.w.ok{color:var(--ok)}.w.close,.w.bad,.w.miss{color:var(--bad)}.w.miss{text-decoration:line-through}.w.u{border-bottom:2px dotted var(--mut)}input+input{margin-top:10px}"}));
// ---- Supabase sync: set up in Settings, hidden once signed in ----
let sb=null,user=null,msg="",bad=false,tm,cfg={};
try{cfg=JSON.parse(localStorage.getItem("nl-sb")||"{}")}catch(e){}
const SBJS="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";
const loadSb=()=>new Promise((ok,no)=>{if(window.supabase)return ok();const s=document.createElement("script");s.src=SBJS;s.onload=ok;s.onerror=()=>no(new Error("Could not load the sync library. Check your connection."));document.head.append(s)});
async function initSb(){if(sb||!cfg.url||!cfg.key)return;await loadSb();sb=supabase.createClient(cfg.url,cfg.key);
sb.auth.onAuthStateChange((ev,s)=>{if(ev=="INITIAL_SESSION")return;user=s?s.user:null;setTimeout(()=>{paintSync();sync()},0)});
const {data}=await sb.auth.getSession();user=data.session?data.session.user:null;if(user){paintSync();sync()}}
async function sync(){if(!sb||!user)return;
try{const r=await sb.from("progress").select("data").eq("user_id",user.id).maybeSingle();if(r.error)throw r.error;
S=merge(S,(r.data&&r.data.data)||{});try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}
const w=await sb.from("progress").upsert({user_id:user.id,data:S,updated_at:new Date().toISOString()});if(w.error)throw w.error;
bad=false;msg="Last sync "+new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch(e){bad=true;msg=e.message||String(e)}
paintSync();if($("go"))home()}
window.onSave=()=>{clearTimeout(tm);tm=setTimeout(sync,2500)};
document.addEventListener("visibilitychange",()=>{if(!document.hidden)sync()});
const FA='autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"';
function paintSync(){const e=$("sync");if(!e)return;
if(user){e.innerHTML=`<div class="fb ${bad?"bad":"ok"}" style="margin-top:0">${bad?"Sync failed":"Synced"}</div><p class="mut">${esc(user.email)}${msg?". "+esc(msg):""}</p><button class="ghost" id="sn" style="margin-top:6px">Sync now</button><button class="ghost" id="so" style="margin-top:6px">Turn off</button>`;
$("sn").onclick=sync;$("so").onclick=()=>sb.auth.signOut();return}
e.innerHTML=`<p class="mut">Connect once to keep progress in sync across your Mac, web and phone.</p><input id="su" placeholder="Project URL" value="${esc(cfg.url||"")}" ${FA}><input id="sk" placeholder="Anon or publishable key" value="${esc(cfg.key||"")}" ${FA}><input id="em" type="email" placeholder="Email" value="${esc(cfg.email||"")}" autocomplete="email"><input id="pw" type="password" placeholder="Password" autocomplete="current-password"><button class="pri" id="si">Connect and sync</button><p class="mut" id="er"></p>`;
$("si").onclick=connect}
async function connect(){const url=$("su").value.trim().replace(/\/+$/,""),key=$("sk").value.trim(),email=$("em").value.trim(),pw=$("pw").value,er=$("er"),b=$("si");
if(!/^https:\/\/\S+$/.test(url)||!key||!email||!pw){er.textContent="Fill in the project URL, key, email and password.";return}
if(cfg.url!=url||cfg.key!=key)sb=null;cfg={url,key,email};try{localStorage.setItem("nl-sb",JSON.stringify(cfg))}catch(e){}
b.disabled=true;er.textContent="";
try{await initSb();const r=await sb.auth.signInWithPassword({email,password:pw});if(r.error)throw r.error}catch(e){const x=$("er"),y=$("si");if(x)x.textContent=e.message;if(y)y.disabled=false}}
initSb().catch(()=>{});
// ---- Speech practice (only when the local Mac server answers) ----
fetch("api/health").then(r=>r.ok?r.json():null).then(j=>{if(j&&j.speech){document.querySelector('nav [data-v="s"]').hidden=false;setInterval(()=>{if(!document.hidden)fetch("api/health").catch(()=>{})},3e5)}}).catch(()=>{});
let SQ=null,rec=null;const NUM="nul een twee drie vier vijf zes zeven acht negen tien".split(" ");
function speak(){if(SQ===null){const ids=Object.keys(S.c);SQ=ids.length?+ids[Math.floor(Math.random()*ids.length)]:Math.floor(Math.random()*10)}
const full=W[SQ][2].replace(/[{}]/g,"");
app.innerHTML=`<h3>Say this sentence</h3><div class="big2">${full}</div><div class="mut">${W[SQ][3]}</div>${window.sguide?sguide(full):""}<button class="ghost" id="ls">Listen first</button><button class="ghost" id="sl">Slow</button><button class="pri" id="rc">Record</button><div id="res"></div><button class="ghost" id="nx">Another sentence</button>`;
$("ls").onclick=()=>say(full);$("sl").onclick=()=>say(full,.55);$("nx").onclick=()=>{SQ=null;speak()};$("rc").onclick=()=>record(full)}
async function record(full){const b=$("rc"),out=$("res");if(rec){rec.stop();return}
try{const st=await navigator.mediaDevices.getUserMedia({audio:true}),ch=[];rec=new MediaRecorder(st);
rec.ondataavailable=e=>ch.push(e.data);
rec.onstop=async()=>{st.getTracks().forEach(x=>x.stop());const type=rec.mimeType||"audio/webm";rec=null;b.textContent="Checking";b.disabled=true;
try{const r=await fetch("api/transcribe",{method:"POST",headers:{"Content-Type":"application/octet-stream"},body:await pcm(new Blob(ch,{type}))}),j=await r.json();if(!r.ok)throw new Error(j.error||r.status);result(full,j)}
catch(e){out.textContent="Could not check: "+e.message+". If the server stopped, open the Nederlands app again."}
b.textContent="Record";b.disabled=false};
rec.start();b.textContent="Stop";out.textContent=""}catch(e){out.textContent="Microphone unavailable: "+e.message}}
function result(full,j){if(!j.text){$("res").textContent="Nothing heard. Check your microphone and try again.";return}const tw=full.split(/\s+/),hw=(j.words&&j.words.length?j.words:j.text.split(/\s+/).map(w=>({w,p:1}))).filter(x=>nz(x.w)),
R=align(tw.map(nz),hw.map(x=>{const h=nz(x.w);return /^\d+$/.test(h)&&NUM[h]||h})),fix=[];
const pct=Math.round(R.reduce((a,r)=>a+(r.s=="ok"?1:r.s=="close"?.5:0),0)/tw.length*100);
const html=R.map((r,k)=>{const u=r.s=="ok"&&hw[r.j].p<.5;
if(r.s=="close"||r.s=="bad")fix.push(`${esc(tw[k].replace(/[^\p{L}]+$/u,""))}: heard “${esc(hw[r.j].w.trim())}”${window.hintOf?hintOf(tw[k]):""}`);
if(r.s=="miss")fix.push(`${esc(tw[k].replace(/[^\p{L}]+$/u,""))}: not heard${window.hintOf?hintOf(tw[k]):""}`);
if(u)fix.push(`${esc(tw[k].replace(/[^\p{L}]+$/u,""))}: unclear, say it more clearly${window.hintOf?hintOf(tw[k]):""}`);
return `<span class="w ${r.s}${u?" u":""}">${esc(tw[k])}</span>`}).join(" ");
if(!S.d.includes(T())){S.d.push(T());save()}
$("res").innerHTML=`<div class="fb ${pct>=80?"ok":"bad"}">${pct}% match</div><p class="big2">${html}</p><p class="mut">${fix.length?fix.join("<br>"):"Clean. Try another sentence."}</p><p class="mut">I heard: ${esc(j.text)}</p>`}
async function pcm(blob){const x=new (window.AudioContext||webkitAudioContext)(),b=await x.decodeAudioData(await blob.arrayBuffer());x.close();
const o=new OfflineAudioContext(1,Math.ceil(b.duration*16e3),16e3),s=o.createBufferSource();s.buffer=b;s.connect(o.destination);s.start();return (await o.startRendering()).getChannelData(0)}
