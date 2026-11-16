// Learn and Talk hubs, and the pages under them: grammar list lives in grammar.js; here are drills, stories, phrases, dialogues, role-play and shadowing.
document.head.append(Object.assign(document.createElement("style"),{textContent:`.story{font-size:21px;line-height:1.9;margin:6px 0 18px}.sn{cursor:pointer;border-radius:8px;padding:2px 3px;margin:0 -1px;-webkit-box-decoration-break:clone;box-decoration-break:clone;transition:background-color .15s}.sn.on{background:var(--c2);color:var(--on2)}@media(hover:hover){.sn:not(.on):hover{background:color-mix(in srgb,var(--c2) 45%,transparent)}}#sp{margin:0 0 16px;position:sticky;bottom:calc(8px + env(safe-area-inset-bottom,0px));box-shadow:0 2px 14px rgba(0,0,0,.14)}#sp .pronhelp{margin-top:8px;padding:10px 14px;background:var(--c)}details.phd{padding:14px 18px;margin-bottom:8px}details.phd summary::after{display:none}details.phd summary span{display:flex;flex-direction:column;gap:2px;min-width:0}details.phd summary small{font-size:15px;font-weight:400}details.phd .spk{margin:0}.phx{margin-top:12px;padding-top:12px;border-top:2px solid var(--c)}.qo{margin:8px 0 0}.chat .ex{margin-top:10px}.chat .say{margin-right:28px}.chat .say.b{margin-right:0;margin-left:28px}.rpn{margin:16px 0 0}.hdl{display:flex;gap:10px}.hdl>*{flex:1}`}));
const SPKI=spk(0).replace(/^<button[^>]*>|<\/button>$/g,"");
const KD=id=>(S.k||{})[id];
function markDone(id,s){S.k=S.k||{};S.k[id]={u:Date.now(),d:T(),s:s==null?1:s};if(!S.d.includes(T()))S.d.push(T());save()}
const sub=(label,id)=>`<div class="gtop"><button class="x" id="${id||"sb"}" aria-label="Back">×</button><span class="mut">${label}</span></div>`;
const row=(attr,t,s,tag)=>`<button class="card" ${attr}><span>${t}<small>${s}</small></span>${tag?`<em>${tag}</em>`:""}</button>`;
const plain=()=>document.body.classList.remove("in");
// ---------- hubs ----------
function learn(){plain();const gd=window.gDueIds?gDueIds().length:0,p0=PH0(),pl=Object.keys(S.c).filter(i=>+i>=p0).length;
app.innerHTML=`<header class="hd"><h2>Learn</h2><p class="mut">Pick one. Each is short.</p></header><div class="list">${row('data-h="gram"',"Grammar",GT.length+" short topics, with examples",gd?gd+" to review":"")}${row('data-h="drills"',"Drills","Numbers, time, prices, de or het")}${row('data-h="stories"',"Stories","Short texts. Tap a sentence to translate",STORIES.length)}${row('data-h="phrases"',"Everyday phrases","What people really say",pl+" of "+(W.length-p0))}</div>`}
function talk(){plain();
app.innerHTML=`<header class="hd"><h2>Talk</h2><p class="mut">Listen to conversations and practise saying things.</p></header><div class="list">${row('data-h="dialogues"',"Dialogues","Listen, read, then answer a question",DIALOGUES.length)}${row('data-h="roleplay"',"Role-play","Have a conversation. You choose or type your reply",ROLEPLAYS.length)}${row('data-h="shadow"',"Shadowing","Say it along with the speaker")}${IOS?"":row('data-h="speak"',"Pronunciation check","Say a sentence and get it checked")}</div>`}
// ---------- drills ----------
const DRL=[["Numbers","Hear and read numbers up to 999"],["Time","Clock times in Dutch"],["Prices","Euros and cents"],["de or het","Pick the right word for “the”"],["Verb endings","ik werk, hij werkt"],["Word order","Build the sentence"]];
function drillsPage(){plain();app.innerHTML=sub("Learn")+`<h2>Drills</h2><p class="mut" style="margin:-8px 0 20px">Ten quick questions each.</p><div class="list">${DRL.map(([n,s])=>row('data-dr="'+n+'"',n,s)).join("")}</div>`;$("sb").onclick=learn}
// ---------- stories ----------
function storiesPage(){plain();app.innerHTML=sub("Learn")+`<h2>Stories</h2><p class="mut" style="margin:-8px 0 8px">Short texts at your level. Tap any sentence to see it in English and hear it.</p>`+["A1","A2"].map(lv=>`<h3>${lv}</h3><div class="list">${STORIES.filter(s=>s.lv==lv).map(s=>row('data-st="'+s.id+'"',s.t,s.s.length+" sentences",KD("s:"+s.id)?"✓":"")).join("")}</div>`).join("");$("sb").onclick=learn}
function story(id){plain();const st=STORIES.find(x=>x.id==id);
app.innerHTML=sub(st.lv+" · Story")+`<h2>${st.t}</h2><p class="story" id="stx">${st.s.map((l,k)=>`<span class="sn" data-k="${k}">${esc(l[0])}</span>`).join(" ")}</p><p class="mut" id="sen" hidden>${st.s.map(l=>esc(l[1])).join(" ")}</p><div class="ex" id="sp" hidden><div><div id="spe" style="font-size:19px;line-height:1.4"></div><details class="pronhelp"><summary>How to say it</summary><div class="pron"><div class="resp" id="spr" style="font-size:19px"></div></div></details></div><button class="spk" id="sps" aria-label="Listen">${SPKI}</button></div><div class="acts tight"><button class="ghost" id="stp">Play story</button><button class="ghost" id="ste">Show English</button><button class="ghost" id="sts">Shadow</button></div><h3>Check your understanding</h3>${st.q.map((q,i)=>`<div class="big2" style="font-size:19px;margin-top:${i?22:0}px">${esc(q.q)}</div><div class="qo" data-q="${i}">${shuf(q.o.map((x,j)=>[x,j])).map(([x,j])=>`<button class="opt" data-j="${j}">${esc(x)}</button>`).join("")}</div>`).join("")}<div id="qf"></div>`;
let cur=-1,got=0,right=0;
const pick=k=>{cur=k;document.querySelectorAll(".sn").forEach(x=>x.classList.toggle("on",+x.dataset.k==k));$("sp").hidden=false;$("spe").textContent=st.s[k][1];$("spr").textContent=respLine(st.s[k][0]);say([[st.s[k][0],.85]],0,150)};
$("stx").onclick=e=>{const s=e.target.closest(".sn");if(s)pick(+s.dataset.k)};
$("sps").onclick=()=>{if(cur>=0)say([[st.s[cur][0],.85]],0,100)};
$("stp").onclick=()=>say(st.s.map(l=>[l[0],.85,550]),0,250);
$("ste").onclick=()=>{const h=$("sen");h.hidden=!h.hidden;$("ste").textContent=h.hidden?"Show English":"Hide English"};
$("sts").onclick=()=>shadow(st.s.map(l=>({t:l[0],e:l[1]})),st.t,()=>story(id));
$("sb").onclick=storiesPage;
app.querySelectorAll(".qo").forEach(q=>q.onclick=e=>{const b=e.target.closest(".opt");if(!b||q.dataset.d)return;q.dataset.d=1;got++;const ok=+b.dataset.j==0;if(ok)right++;
[...q.children].forEach(x=>{x.disabled=true;if(+x.dataset.j==0)x.classList.add("good");else if(x==b)x.classList.add("miss")});
if(got==st.q.length){markDone("s:"+id,right);$("qf").innerHTML=`<div class="fb ${right==got?"ok":"bad"}" style="margin-top:20px">${right} of ${got} correct</div>`}})}
// ---------- phrases ----------
function phrasesPage(){plain();const p0=PH0(),ix={};W.slice(p0).forEach((w,i)=>ix[w[0]]=p0+i);
app.innerHTML=sub("Learn")+`<h2>Everyday phrases</h2><p class="mut" style="margin:-8px 0 8px">What people really say. Tap one to see it in a sentence. A new phrase joins your daily practice each session.</p>`+PHRASE_GROUPS.map(([g,hs])=>`<h3>${g}</h3>${hs.map(h=>{const i=ix[h],w=W[i],p=PR[h];return`<details class="phd"><summary><span><b>${esc(h)}</b><small class="mut">${esc(w[1])}</small></span><button class="spk" data-ph="${i}" aria-label="Listen">${SPKI}</button></summary><div class="phx"><div>${hl(esc(w[2]).replace(/\{/g,"{"))}<br><i>${esc(w[3])}</i></div>${p?`<div class="resp" style="font-size:18px;margin-top:10px">${p[0]}</div>`:""}</div></details>`}).join("")}`).join("");$("sb").onclick=learn}
// ---------- dialogues (the dialogue page itself is dialog() in learn.js) ----------
function dialoguesPage(){plain();app.innerHTML=sub("Talk")+`<h2>Dialogues</h2><p class="mut" style="margin:-8px 0 8px">Listen, read along, then answer a question.</p>`+["A1","A2"].map(lv=>`<h3>${lv}</h3><div class="list">${DIALOGUES.map((d,i)=>(d.lv||"A1")==lv?row('data-dl="'+i+'"',d.t,d.l.length+" lines",KD("d:"+d.t)?"✓":""):"").join("")}</div>`).join("");$("sb").onclick=talk}
// ---------- role-play ----------
let RP=null;const rmode=()=>{try{return localStorage.getItem("nl-rpm")||"choose"}catch(e){return"choose"}};
function roleplayPage(){plain();app.innerHTML=sub("Talk")+`<h2>Role-play</h2><p class="mut" style="margin:-8px 0 8px">A real conversation. The other person speaks, then you reply. Choose from options, or type it.</p>`+["A1","A2"].map(lv=>`<h3>${lv}</h3><div class="list">${ROLEPLAYS.filter(r=>r.lv==lv).map(r=>row('data-rp="'+r.id+'"',r.t,r.steps.length+" replies",KD("r:"+r.id)?"✓":"")).join("")}</div>`).join("");$("sb").onclick=talk}
function roleplay(id){plain();const r=ROLEPLAYS.find(x=>x.id==id);
app.innerHTML=sub(r.lv+" · Role-play")+`<h2>${r.t}</h2><p class="mut" style="margin:-8px 0 0">${r.intro}</p><h3>Your replies</h3><div class="seg" id="rm">${[["choose","Choose"],["type","Type"]].map(([v,l])=>`<button data-v="${v}"${v==rmode()?' class="on"':""}>${l}</button>`).join("")}</div><p class="mut" style="margin:10px 0 0">Choose gives you three options. Type is harder, and you learn more from it.</p><button class="pri" id="rgo">Start</button>`;
$("sb").onclick=roleplayPage;$("rm").onclick=e=>{const b=e.target.closest("button");if(!b)return;try{localStorage.setItem("nl-rpm",b.dataset.v)}catch(x){}$("rm").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x==b))};
$("rgo").onclick=()=>{RP={r,i:0,ok:0,log:[],mode:rmode()};document.body.classList.add("in");rpStep()}}
const rpBub=(log,k)=>log.map((m,j)=>`<div class="ex say${m.me?" b":""}"><div>${esc(m.t)}${m.en?`<div class="tr">${esc(m.en)}</div>`:""}</div><button class="spk" data-rl="${j}" aria-label="Listen">${SPKI}</button></div>`).join("");
function rpStep(){const P=RP,r=P.r;if(P.i>=r.steps.length)return rpEnd();
const s=r.steps[P.i],top=`<div class="top"><button class="x" id="mx" aria-label="Close">×</button><div class="bar"><i style="width:${P.i/r.steps.length*100}%"></i></div></div>`;
P.log.push({t:s.them[0],en:s.them[1],me:0});let done=false,td=0;
app.innerHTML=top+`<div class="chat" id="chat">${rpBub(P.log)}</div><h3 style="margin-top:26px">Your turn</h3><div class="big2" style="font-size:20px">${esc(s.task)}</div>`+(P.mode=="choose"?`<div id="opts">${shuf([s.ok[0],...s.no]).map(x=>`<button class="opt">${esc(x)}</button>`).join("")}</div>`:`<input id="in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"><div class="acts tight"><button class="ghost" id="rh">Hint</button></div><button class="pri" id="ck">Check</button>`)+`<div id="fb"></div><button class="pri" id="ok" hidden>Continue</button>`;
$("mx").onclick=roleplayPage;
const finish=(good,line,msg)=>{done=true;td=Date.now();if(good&&!P.missed)P.ok++;P.log.push({t:line,me:1});
$("chat").innerHTML=rpBub(P.log);$("fb").innerHTML=`<div class="fb ${good?"ok":"bad"}">${msg}</div>${s.tip?`<p class="mut" style="margin-top:14px">${esc(s.tip)}</p>`:""}`;say([[line,.85,0,0,1]],0,150);
if($("ck"))$("ck").hidden=true;if($("rh"))$("rh").parentElement.hidden=true;$("ok").hidden=false;setTimeout(()=>$("ok").focus(),60)};
if(P.mode=="choose"){$("opts").onclick=e=>{const b=e.target.closest(".opt");if(!b||done)return;const good=b.textContent==s.ok[0];[...$("opts").children].forEach(x=>{x.disabled=true;if(x.textContent==s.ok[0])x.classList.add("good");else if(x==b)x.classList.add("miss")});finish(good,s.ok[0],good?"Correct":"Not quite")}}
else{let hinted=0;$("rh").onclick=()=>{hinted=1;$("rh").textContent="Starts with: "+s.ok[0].split(" ").slice(0,2).join(" ")+"…";$("rh").disabled=true};
const chk=()=>{if(done)return;const v=nz($("in").value);if(!v)return;$("in").disabled=true;const hit=s.ok.find(o=>nz(o)==v),near=!hit&&s.ok.find(o=>nz(o).length>=5&&near1(v,nz(o)));
if(hit)finish(true,hit,"Correct");else if(near)finish(true,near,"Almost: check the spelling");else finish(false,s.ok[0],"Not quite. You could say:")};
$("ck").onclick=chk;$("in").onkeydown=e=>{if(e.key=="Enter")chk()};$("in").focus()}
$("ok").onclick=()=>{if(Date.now()-td<600)return;P.i++;rpStep()};
if(P.mode=="choose")say([[s.them[0],.85]],0,350);else say([[s.them[0],.85]],0,350)}
function rpEnd(){const P=RP,r=P.r;P.log.push({t:r.end[0],en:r.end[1],me:0});markDone("r:"+r.id,P.ok);plain();
app.innerHTML=sub(r.lv+" · Role-play","rb2")+`<h2>${P.ok==r.steps.length?"Well done":"Good work"}</h2><p class="mut" style="margin:-8px 0 0">${P.ok} of ${r.steps.length} replies right the first time.</p><h3>The conversation</h3><div class="chat">${rpBub(P.log)}</div><div class="acts tight"><button class="ghost" id="rpa">Play it</button><button class="ghost" id="rag">Try again</button></div><button class="pri" id="rbk">Back to role-plays</button>`;
$("rb2").onclick=roleplayPage;$("rbk").onclick=roleplayPage;$("rag").onclick=()=>roleplay(r.id);$("rpa").onclick=()=>say(P.log.map(m=>[m.t,.85,500,0,m.me]),0,250)}
// ---------- shadowing ----------
let SH=null;
function shadow(items,title,back){SH={items,i:0,title,back:back||talk};document.body.classList.add("in");shStep()}
function shStep(){const h=SH,it=h.items[h.i];if(!it)return shEnd();const rec=!IOS,last=h.i==h.items.length-1,spkr=it.b?1:0;
app.innerHTML=`<div class="top"><button class="x" id="mx" aria-label="Close">×</button><div class="bar"><i style="width:${h.i/h.items.length*100}%"></i></div></div><h3>Shadowing · ${h.i+1} of ${h.items.length}</h3><div class="big2" id="sht">${esc(it.t)}</div>${it.e?`<div class="tr" id="she">${esc(it.e)}</div>`:""}${window.sguide?sguide(it.t):""}<p class="mut" style="margin-top:16px">Listen once. Then play it again and say it along with the speaker, copying the rhythm. Last, say it on your own.</p><div class="acts tight"><button class="ghost" id="shp">Listen</button><button class="ghost" id="shs">Slow</button><button class="ghost" id="shh">Hide text</button></div>${rec?'<button class="pri" id="rc">Record</button><p class="mut" id="eng" style="margin-top:12px"></p><div id="dict"></div><div id="res"></div>':""}<button class="${rec?"ghost":"pri"}" id="shn" style="${rec?"margin-top:18px":""}">${last?"Finish":"Next"}</button>`;
$("mx").onclick=()=>h.back();$("shp").onclick=()=>say([[it.t,.85,0,0,spkr]],0,100);$("shs").onclick=()=>say([[it.t,.6,0,0,spkr]],0,100);
$("shh").onclick=()=>{const t=$("sht"),hid=t.style.visibility=="hidden";t.style.visibility=hid?"":"hidden";if($("she"))$("she").style.visibility=hid?"":"hidden";$("shh").textContent=hid?"Hide text":"Show text"};
if(rec){CUR=it.t;$("rc").onclick=()=>record(it.t);engNote()}
$("shn").onclick=()=>{h.i++;shStep()};say([[it.t,.85,0,0,spkr]],0,DLY())}
function shEnd(){const h=SH;document.body.classList.remove("in");if(!S.d.includes(T())){S.d.push(T());save()}
app.innerHTML=`<h2>Nice work</h2><p class="mut" style="margin:-8px 0 0">${h.items.length} lines shadowed${h.title?" from “"+esc(h.title)+"”":""}.</p><button class="pri" id="shd">Done</button><button class="ghost" id="sha" style="margin-top:14px">Again</button>`;$("shd").onclick=()=>h.back();$("sha").onclick=()=>shadow(h.items,h.title,h.back)}
function shadowPage(){plain();app.innerHTML=sub("Talk")+`<h2>Shadowing</h2><p class="mut" style="margin:-8px 0 0">Hear a line, then say it along with the speaker. Copying rhythm and melody is the quickest way to sound natural.</p><button class="pri" id="shg">Start with my words</button><h3>Or shadow a text</h3><details><summary>Stories</summary><div class="list">${STORIES.map(s=>row('data-shs="'+s.id+'"',s.t,s.lv)).join("")}</div></details><details><summary>Dialogues</summary><div class="list">${DIALOGUES.map((d,i)=>row('data-shd="'+i+'"',d.t,d.lv||"A1")).join("")}</div></details>`;
$("sb").onclick=talk;$("shg").onclick=()=>{const ids=Object.keys(S.c).map(Number).filter(i=>i<PH0()&&isSent(W[i][2].replace(/[{}]/g,""))),pool=ids.length>=6?shuf(ids).slice(0,8):shuf(W.slice(0,PH0()).map((_,i)=>i).filter(i=>isSent(W[i][2].replace(/[{}]/g,"")))).slice(0,8);
shadow(pool.map(i=>({t:W[i][2].replace(/[{}]/g,""),e:W[i][3]})),"",shadowPage)}}
// ---------- one click handler for everything above ----------
app.addEventListener("click",e=>{const g=s=>e.target.closest(s);let a;
if(a=g("[data-ph]")){e.preventDefault();return say([[W[+a.dataset.ph][0],.7]],0,100)}
if(a=g("[data-rl]")){const m=RP&&RP.log[+a.dataset.rl];if(m)say([[m.t,.85,0,0,m.me]],0,100);return}
if(a=g("[data-h]"))return({gram:gramPage,drills:drillsPage,stories:storiesPage,phrases:phrasesPage,dialogues:dialoguesPage,roleplay:roleplayPage,shadow:shadowPage,speak:()=>speak()})[a.dataset.h]();
if(a=g("[data-st]"))return story(a.dataset.st);
if(a=g("[data-rp]"))return roleplay(a.dataset.rp);
if(a=g("[data-shs]")){const st=STORIES.find(x=>x.id==a.dataset.shs);return shadow(st.s.map(l=>({t:l[0],e:l[1]})),st.t,shadowPage)}
if(a=g("[data-shd]")){const d=DIALOGUES[+a.dataset.shd];return shadow(d.l.map((l,k)=>({t:l[0],e:l[1],b:k%2})),d.t,shadowPage)}});
