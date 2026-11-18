// Recorded voice. Plays the neural recordings made by make_audio.py (audio/index.json plus a few pack files)
// and lets say() fall back to the device voice for anything that has no recording.
const REC={idx:null,packs:{},urls:{},live:{},livep:{},a:null,id:0},RCACHE="voice-audio";
const recOn=()=>{try{return localStorage.getItem("nl-rec")!="0"}catch(e){return true}};
// keep the download: ask the phone not to clear it, and fetch the new packs by itself when the recordings are updated
const recDL=()=>{try{return localStorage.getItem("nl-recdl")=="1"}catch(e){return false}},recMark=()=>{try{localStorage.setItem("nl-recdl","1")}catch(e){}};
const recKeep=()=>{try{return navigator.storage&&navigator.storage.persist?navigator.storage.persist().catch(()=>false):Promise.resolve(false)}catch(e){return Promise.resolve(false)}};
async function recKeepNote(){try{const p=await navigator.storage.persisted();return p?" Kept on this device.":(navigator.standalone||matchMedia("(display-mode: standalone)").matches)?"":" Add this app to your Home Screen and open it from there, so the phone keeps it."}catch(e){return""}}
async function recFill(){if(!REC.idx||REC.filling)return;REC.filling=1;try{for(let i=0;i<REC.idx.packs.length;i++)await recPack(i)}catch(e){}REC.filling=0;window.paintRec&&paintRec()}
const packUrl=p=>"audio/"+p+"?v="+REC.idx.v;
async function recInit(){let t=null;
try{const r=await fetch("audio/index.json",{cache:"no-cache"});if(!r.ok)throw 0;t=await r.text();JSON.parse(t);try{(await caches.open(RCACHE)).put("audio/index.json",new Response(t))}catch(e){}}
catch(e){t=null;try{const m=await(await caches.open(RCACHE)).match("audio/index.json");if(m)t=await m.text()}catch(x){}}
try{if(t)REC.idx=JSON.parse(t)}catch(e){REC.idx=null}
if(REC.idx){try{const c=await caches.open(RCACHE),tag="?v="+REC.idx.v;for(const k of await c.keys())if(/\/audio\/p\d+\.bin/.test(k.url)&&!k.url.endsWith(tag))c.delete(k)}catch(e){}}
if(REC.idx&&recOn())recCached().then(ok=>{if(ok){recMark();recKeep()}else if(recDL()&&!(navigator.connection&&navigator.connection.saveData))recFill()});
window.paintRec&&paintRec()}
const recPack=n=>REC.packs[n]||(REC.packs[n]=(async()=>{const u=packUrl(REC.idx.packs[n]);
try{let c=null,m=null;try{c=await caches.open(RCACHE);m=await c.match(u)}catch(e){}
if(!m){m=await fetch(u);if(!m.ok)throw new Error("HTTP "+m.status);if(c)c.put(u,m.clone()).catch(()=>{})}
return await m.arrayBuffer()}catch(e){delete REC.packs[n];throw e}})());
async function recUrl(key){const e=REC.idx.clips[key];if(REC.urls[key])return REC.urls[key];const buf=await recPack(e[0]);
return REC.urls[key]=URL.createObjectURL(new Blob([buf.slice(e[1],e[1]+e[2])],{type:REC.idx.mime}))}
// Mac app only: any text without a recording is spoken live in the same voice (window.LIVETTS is set from /api/health)
function liveUrl(text,b){const k=(b?"b|":"a|")+text;if(REC.live[k])return Promise.resolve(REC.live[k]);
return REC.livep[k]||(REC.livep[k]=fetch("api/tts?v="+(b?"b":"a")+"&t="+encodeURIComponent(text)).then(r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.blob()}).then(bl=>{const ks=Object.keys(REC.live);if(ks.length>120){URL.revokeObjectURL(REC.live[ks[0]]);delete REC.live[ks[0]]}return REC.live[k]=URL.createObjectURL(bl)}).catch(e=>{if(e&&e.name=="TypeError")window.LIVETTS=false;throw e}).finally(()=>{delete REC.livep[k]}))}
function recAudio(){if(!REC.a){REC.a=new Audio();REC.a.preload="auto";try{REC.a.preservesPitch=true;REC.a.webkitPreservesPitch=true}catch(e){}}return REC.a}
function recStop(){REC.id++;try{if(REC.a){REC.a.onended=REC.a.onerror=null;REC.a.pause()}}catch(e){}}
// plays the recording for this exact text (second speaker: text|b). Returns false when there is none, so the caller uses the device voice.
function recPlay(text,b,q,sid,onstart,onend,fallback){
if(!recOn())return false;const C=REC.idx?REC.idx.clips:{},key=b&&C[text+"|b"]?text+"|b":text,rec=!!C[key];if(!rec&&!window.LIVETTS)return false;
const my=++REC.id;let fell=0;const fb=()=>{if(fell||my!=REC.id||sid!=SID)return;fell=1;fallback()};
(rec?recUrl(key):liveUrl(text,b)).then(u=>{if(my!=REC.id||sid!=SID)return;const a=recAudio(),pb=Math.max(.5,Math.min(1.5,Math.min(1,Math.max(.6,q+.25))*SPD()));
a.onended=()=>{if(my==REC.id&&!fell){fell=1;onend()}};a.onerror=fb;a.defaultPlaybackRate=pb;a.src=u;a.playbackRate=pb;a.onloadedmetadata=()=>{a.playbackRate=pb};
const p=a.play();onstart();if(p&&p.catch)p.catch(fb)}).catch(fb);
return true}
// iOS only lets audio start from a tap: play a silent clip on the first tap so later audio can start by itself
function recUnlock(){try{const a=recAudio();a.src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";const p=a.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}}
["click","touchend"].forEach(ev=>addEventListener(ev,recUnlock,{once:true,capture:true}));
// Settings > Voice
async function recCached(){try{const c=await caches.open(RCACHE);const r=await Promise.all(REC.idx.packs.map(p=>c.match(packUrl(p))));return r.every(Boolean)}catch(e){return false}}
function paintRec(){const el=$("rv");if(!el)return;if(!REC.idx&&!window.LIVETTS){el.innerHTML="";return}
const n=REC.idx?Object.keys(REC.idx.clips).length:0,mb=REC.idx?Math.round(REC.idx.sizes.reduce((a,b)=>a+b,0)/1e6):0,lv=window.LIVETTS?" On this Mac every other sentence is spoken live in the same voice.":"";
el.innerHTML=`<p class="mut" style="margin:14px 0 8px">Recorded voice</p><div class="seg" id="rvs">${[["1","On"],["0","Off"]].map(([v,l])=>`<button data-v="${v}"${(recOn()?"1":"0")==v?' class="on"':""}>${l}</button>`).join("")}</div><p class="mut" id="rvn" style="margin:10px 0 0">${REC.idx?`Natural recordings of ${n} words, sentences and lines.${lv||" Anything else uses the device voice."}`:"Natural voice, made live on this Mac."}</p>${REC.idx?`<button class="ghost" id="rvd" style="margin-top:12px">Download for offline use (${mb} MB)</button>`:""}`;
$("rvs").onclick=e=>{const b=e.target.closest("button");if(!b)return;try{localStorage.setItem("nl-rec",b.dataset.v)}catch(x){}$("rvs").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x==b));if(b.dataset.v=="1")say(SAMPLE)};
if(!REC.idx)return;recCached().then(async ok=>{if(ok&&$("rvd")){$("rvd").hidden=true;recMark();await recKeep();const t=await recKeepNote();if($("rvn"))$("rvn").textContent+=" Downloaded for offline use."+t}});
$("rvd").onclick=async()=>{const b=$("rvd");b.disabled=true;try{for(let i=0;i<REC.idx.packs.length;i++){b.textContent="Downloading "+(i+1)+" of "+REC.idx.packs.length+"…";await recPack(i)}b.hidden=true;recMark();await recKeep();$("rvn").textContent="Downloaded. The recorded voice now works offline."+await recKeepNote()}catch(e){b.disabled=false;b.textContent="Download failed. Tap to try again"}}}
recInit();
