// Learn tab (drills, dialogues, grammar), progress details, pacing, backup, reminder, text size
var DR="";
const shuf=a=>a.slice().sort(()=>Math.random()-.5),rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pickOne=a=>a[Math.floor(Math.random()*a.length)];
document.head.append(Object.assign(document.createElement("style"),{textContent:".grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.card{border:0;border-radius:18px;background:var(--bg);color:var(--ink);font:inherit;font-weight:500;font-size:17px;padding:18px;text-align:left;cursor:pointer}.list .card{display:flex;justify-content:space-between;align-items:center;width:100%;margin-top:10px}.card small{color:var(--mut);font-weight:400;font-size:14px}.card:active{opacity:.8}.bars{display:flex;gap:4px;align-items:flex-end;height:60px;margin:6px 0 4px}.bars div{flex:1;display:flex;align-items:flex-end}.bars i{display:block;width:100%;border-radius:4px 4px 0 0;background:var(--ac)}.chips{display:flex;flex-wrap:wrap;gap:8px}.chips span{background:var(--c2);color:var(--on2);border-radius:99px;padding:6px 14px;font-size:15px}.urow{display:flex;justify-content:space-between;font-size:16px;margin:6px 0}.hint{margin:12px 0 0}details h3{margin:18px 0 8px}"}));
// ---------- history, pacing ----------
function hist(r){S.h=S.h||{};const d=T(),x=S.h[d]||[0,0];x[1]++;if(r)x[0]++;S.h[d]=x}
function pace(){const base=NEWD();if(localStorage.getItem("nl-pace")=="0")return{limit:base,msg:""};
const days=Object.keys(S.h||{}).map(Number).filter(d=>d<=T()&&S.h[d][1]>=5).sort((a,b)=>b-a).slice(0,3);
if(days.length<2)return{limit:base,msg:""};let c=0,t=0;days.forEach(d=>{c+=S.h[d][0];t+=S.h[d][1]});const acc=c/t,pc=Math.round(acc*100);
if(acc<.7)return{limit:Math.max(3,Math.round(base/2)),msg:"Fewer new words today while your accuracy recovers ("+pc+"% recently)."};
if(acc>.92&&streak()>=3)return{limit:base+3,msg:"A few extra new words today. You are doing well ("+pc+"% recently)."};
return{limit:base,msg:""}}
// ---------- number, time and price words ----------
const N1="nul één twee drie vier vijf zes zeven acht negen tien elf twaalf dertien veertien vijftien zestien zeventien achttien negentien".split(" "),TENS=["","","twintig","dertig","veertig","vijftig","zestig","zeventig","tachtig","negentig"];
function nw(n){if(n<20)return N1[n];
if(n<100){const t=TENS[Math.floor(n/10)],u=n%10;if(!u)return t;const ul=u==1?"een":N1[u];return ul+(ul.endsWith("e")?"ën":"en")+t}
if(n<1000){const h=Math.floor(n/100),r=n%100;return(h==1?"honderd":nw(h)+"honderd")+(r?(r==1?"een":nw(r)):"")}return"duizend"}
const pw=(e,c)=>nw(e)+" euro"+(c?" "+nw(c):"");
const hn=n=>{n=n%12||12;return n==1?"één":N1[n]};
function tw(h,m){const nx=hn(h+1);return{0:hn(h)+" uur",5:"vijf over "+hn(h),10:"tien over "+hn(h),15:"kwart over "+hn(h),20:"tien voor half "+nx,25:"vijf voor half "+nx,30:"half "+nx,35:"vijf over half "+nx,40:"tien over half "+nx,45:"kwart voor "+nx,50:"tien voor "+nx,55:"vijf voor "+nx}[m]}
const clk=(h,m)=>String(h).padStart(2,"0")+":"+String(m).padStart(2,"0");
const rt=()=>{const h=rnd(1,23),m=pickOne([0,5,10,15,20,25,30,35,40,45,50,55]);return{s:clk(h,m),w:tw(h,m)}};
const uniq=(good,gen,n=4)=>{const s=new Set([good]);let g=0;while(s.size<n&&g++<60)s.add(gen());return shuf([...s])};
// ---------- drills (each returns a list of questions) ----------
function dNum(){return Array.from({length:10},(_,i)=>{const n=i<4?rnd(0,20):i<7?rnd(21,99):rnd(100,999),w=nw(n);
if(i%2==0)return{k:"dq",p:{h:"Type the number you hear",say:[[w,.7]],slow:[[w,.45]],typed:true,num:true,ans:String(n),reveal:n+" = "+w}};
const o=uniq(w,()=>nw(Math.max(0,Math.min(999,n+pickOne([-10,-1,1,10,rnd(2,9),-rnd(2,9)])))));return{k:"dq",p:{h:"Choose the Dutch",big:String(n),opts:o,ans:o.indexOf(w),reveal:n+" = "+w,aftersay:[[w,.7]]}}})}
function dTime(){return Array.from({length:10},(_,i)=>{const g=rt();
if(i%2==0){const o=uniq(g.w,()=>rt().w);return{k:"dq",p:{h:"How do you say this time?",big:g.s,opts:o,ans:o.indexOf(g.w),reveal:g.s+" = "+g.w,aftersay:[[g.w,.7]]}}}
const o=uniq(g.s,()=>rt().s);return{k:"dq",p:{h:"Listen and choose the time",say:[[g.w,.7]],slow:[[g.w,.45]],opts:o,ans:o.indexOf(g.s),reveal:g.s+" = "+g.w}}})}
function dPrice(){const rp=()=>({e:rnd(1,60),c:pickOne([0,0,25,50,50,75,95,99])}),show=p=>"€ "+p.e+","+String(p.c).padStart(2,"0"),say=p=>pw(p.e,p.c);
return Array.from({length:10},(_,i)=>{const g=rp(),sh=show(g),sy=say(g);
if(i%2==0){const o=uniq(sy,()=>say(rp()));return{k:"dq",p:{h:"How do you say this price?",big:sh,opts:o,ans:o.indexOf(sy),reveal:sh+" = "+sy,aftersay:[[sy,.7]]}}}
const o=uniq(sh,()=>show(rp()));return{k:"dq",p:{h:"Listen and choose the price",say:[[sy,.7]],slow:[[sy,.45]],opts:o,ans:o.indexOf(sh),reveal:sh+" = "+sy}}})}
function dDeHet(){const nouns=W.map((w,i)=>[w,i]).filter(([w])=>/^(de|het) /.test(w[0]));let L=nouns.filter(([w,i])=>S.c[i]);if(L.length<6)L=nouns;
return shuf(L).slice(0,10).map(([w,i])=>{const[art,...r]=w[0].split(" ");return{k:"dq",p:{h:"de or het?",big:r.join(" "),sub:w[1],opts:["de","het"],ans:art=="de"?0:1,reveal:w[0],aftersay:[[w[0],.6]],after:window.guide?guide(i,0,1):""}}})}
const VERBS="werken|work|werk|werkt|werkt|werken;wonen|live|woon|woont|woont|wonen;eten|eat|eet|eet|eet|eten;drinken|drink|drink|drinkt|drinkt|drinken;spreken|speak|spreek|spreekt|spreekt|spreken;begrijpen|understand|begrijp|begrijpt|begrijpt|begrijpen;weten|know|weet|weet|weet|weten;kopen|buy|koop|koopt|koopt|kopen;betalen|pay|betaal|betaalt|betaalt|betalen;komen|come|kom|komt|komt|komen;gaan|go|ga|gaat|gaat|gaan;zijn|be|ben|bent|is|zijn;hebben|have|heb|hebt|heeft|hebben;willen|want|wil|wilt|wil|willen;kunnen|can|kan|kunt|kan|kunnen;zien|see|zie|ziet|ziet|zien;horen|hear|hoor|hoort|hoort|horen;lezen|read|lees|leest|leest|lezen;schrijven|write|schrijf|schrijft|schrijft|schrijven;leren|learn|leer|leert|leert|leren;helpen|help|help|helpt|helpt|helpen;vragen|ask|vraag|vraagt|vraagt|vragen;denken|think|denk|denkt|denkt|denken;zeggen|say|zeg|zegt|zegt|zeggen;praten|talk|praat|praat|praat|praten;bellen|call|bel|belt|belt|bellen;spelen|play|speel|speelt|speelt|spelen;geven|give|geef|geeft|geeft|geven;nemen|take|neem|neemt|neemt|nemen;vinden|find|vind|vindt|vindt|vinden;houden|hold, love|hou|houdt|houdt|houden;blijven|stay|blijf|blijft|blijft|blijven;bestellen|order|bestel|bestelt|bestelt|bestellen;koken|cook|kook|kookt|kookt|koken;kosten|cost|kost|kost|kost|kosten;rijden|drive|rijd|rijdt|rijdt|rijden;lopen|walk|loop|loopt|loopt|lopen;vliegen|fly|vlieg|vliegt|vliegt|vliegen;reizen|travel|reis|reist|reist|reizen;vertrekken|leave|vertrek|vertrekt|vertrekt|vertrekken;slapen|sleep|slaap|slaapt|slaapt|slapen;wassen|wash|was|wast|wast|wassen;zitten|sit|zit|zit|zit|zitten".split(";");
function dVerb(){const all=VERBS.map(l=>l.split("|"));let vs=all.filter(v=>W.some((w,i)=>(w[0]==v[0]||w[0].startsWith(v[0]+" "))&&S.c[i]));if(vs.length<4)vs=all;
return shuf(vs).slice(0,10).map(v=>{const pi=rnd(0,3),pr=["ik","jij","hij","wij"][pi],f=v.slice(2),o=shuf([...new Set(f)]);
return{k:"dq",p:{h:"Choose the right verb form",big:pr+" ___",sub:v[0]+" (to "+v[1]+")",opts:o,ans:o.indexOf(f[pi]),reveal:pr+" "+f[pi],after:'<p class="mut">ik '+f[0]+" · jij "+f[1]+" · hij "+f[2]+" · wij "+f[3]+"</p>",aftersay:[[pr+" "+f[pi],.75]]}}})}
function dOrder(){const ids=Object.keys(S.c).map(Number).filter(i=>W[i][2].replace(/[{}]/g,"").split(" ").length>=5);return ids.length<3?null:shuf(ids).slice(0,8).map(w=>({w,k:"build"}))}
function startDrill(nm){const q=({Numbers:dNum,Time:dTime,Prices:dPrice,"de or het":dDeHet,"Verb endings":dVerb,"Word order":dOrder})[nm]();
if(!q||!q.length){toast("Learn a few more words first, then try this drill.");return}
DR=nm;Q=q;qi=0;H=0;N=0;EX=true;document.body.classList.add("in");step()}
// ---------- one drill question (called from step) ----------
function dqStep(t){const p=t.p;
app.innerHTML=`<div class="top"><button class="x" id="x" aria-label="Close session">×</button><div class="bar"><i style="width:${qi/Q.length*100}%"></i></div></div><h3>${p.h}</h3>`+(p.big?`<div class="big">${p.big}</div>`:"")+(p.sub?`<div class="tr">${p.sub}</div>`:"")+(p.say?`<button class="ghost" id="pl">Play</button><button class="ghost" id="ps">Slow</button>`:"")
+(p.opts?`<div id="opts">${p.opts.map(x=>`<button class="opt">${x}</button>`).join("")}</div>`:`<input id="in" ${p.num?'inputmode="numeric" ':""}autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"><button class="pri" id="ck">Check</button>`)+`<div id="fb"></div><button class="pri" id="ok" hidden>Continue</button>`;
let done=false,td=0;
const fin=r=>{if(done)return;done=true;td=Date.now();N++;H+=r;hist(r);if(!S.d.includes(T()))S.d.push(T());save();
$("fb").innerHTML=`<div class="fb ${r?"ok":"bad"}">${r?"Correct":"Not quite"}</div>`+(p.reveal?`<div class="big2">${p.reveal}</div>`:"")+(p.after||"");
if(p.aftersay)say(p.aftersay,0,150);$("ok").hidden=false;if($("ck"))$("ck").hidden=true;setTimeout(()=>$("ok").focus(),60)};
if(p.opts){$("opts").onclick=e=>{const b=e.target.closest(".opt");if(!b||done)return;const k=[...$("opts").children],i=k.indexOf(b);k.forEach((x,j)=>{x.disabled=true;if(j==p.ans)x.classList.add("good");else if(x==b)x.classList.add("miss")});fin(i==p.ans)}}
else{const chk=()=>{const v=$("in").value.replace(/\D/g,"");$("in").disabled=true;fin(v==p.ans)};$("ck").onclick=chk;$("in").onkeydown=e=>{if(e.key=="Enter")chk()};$("in").focus()}
$("ok").onclick=()=>{if(Date.now()-td<600)return;qi++;step()};
if(p.say){$("pl").onclick=()=>say(p.say);$("ps").onclick=()=>say(p.slow||p.say);say(p.say,0,DLY())}}
// ---------- Learn tab ----------
function learn(){app.innerHTML=`<h2>Learn</h2><h3>Drills</h3><div class="grid">${["Numbers","Time","Prices","de or het","Verb endings","Word order"].map(n=>`<button class="card" data-dr="${n}">${n}</button>`).join("")}</div><h3>Dialogues</h3><div class="list">${DIALOGUES.map((d,i)=>`<button class="card" data-dl="${i}"><span>${d.t}</span><small>${d.l.length} lines</small></button>`).join("")}</div><h3>Grammar notes</h3>`+G.map(([a,b])=>`<details><summary>${a}</summary><p>${b}</p></details>`).join("")}
const respLine=l=>l.split(/\s+/).map(t=>{const q=PW[PL(t)],tail=(t.match(/[^\p{L}]+$/u)||[""])[0];return(q?q[0]:PL(t))+tail}).join(" ");
function dialog(i){const d=DIALOGUES[i],icon=spk(0).replace('data-w="0"','data-dline="@"');
app.innerHTML=`<h2>${d.t}</h2><div id="dl">${d.l.map((l,k)=>`<div class="ex" style="margin-top:12px"><div><b>${k%2?"B":"A"}</b> ${l[0]}<div class="tr dtr" hidden>${l[1]}</div><div class="resp dpr" hidden style="font-size:18px">${respLine(l[0])}</div></div>${icon.replace("@",k)}</div>`).join("")}</div>
<button class="ghost" id="dpa">Play all</button><button class="ghost" id="dte">Show English</button><button class="ghost" id="dsp">How to say it</button>
<h3>Question</h3><div class="big2">${d.q}</div><div id="opts">${d.o.map(x=>`<button class="opt">${x}</button>`).join("")}</div><div id="fb"></div><button class="ghost" id="dbk">Back</button>`;
const tog=(id,cls,off)=>{$(id).onclick=()=>{const hs=document.querySelectorAll(cls),on=hs[0].hidden;hs.forEach(x=>x.hidden=!on);$(id).textContent=on?off:$(id).dataset.l};$(id).dataset.l=$(id).textContent};tog("dte",".dtr","Hide English");tog("dsp",".dpr","Hide pronunciation");
$("dpa").onclick=()=>say(d.l.map(l=>[l[0],.8,900]),0,250);$("dbk").onclick=learn;
$("opts").onclick=e=>{const b=e.target.closest(".opt");if(!b||$("opts").dataset.d)return;$("opts").dataset.d=1;const k=[...$("opts").children],ok=k.indexOf(b)==d.a;k.forEach((x,j)=>{x.disabled=true;if(j==d.a)x.classList.add("good");else if(x==b)x.classList.add("miss")});$("fb").innerHTML=`<div class="fb ${ok?"ok":"bad"}">${ok?"Correct":"Not quite"}</div>`}}
app.addEventListener("click",e=>{const a=e.target.closest("[data-dr]");if(a)return startDrill(a.dataset.dr);const b=e.target.closest("[data-dl]");if(b)return dialog(+b.dataset.dl);
const s=e.target.closest("[data-dline]");if(s){const m=app.querySelector("h2").textContent,d=DIALOGUES.find(x=>x.t==m);if(d)say(d.l[+s.dataset.dline][0],.8)}});
// ---------- progress details on the Today screen ----------
function progressHTML(){const t=T(),H0=S.h||{},ids=Object.keys(S.c).map(Number);if(!ids.length)return"";
let c=0,n=0;Object.values(H0).forEach(x=>{c+=x[0];n+=x[1]});
const bars=Array.from({length:14},(_,k)=>{const x=H0[t-13+k],h=x&&x[1]?Math.max(6,Math.round(x[0]/x[1]*58)):4;return`<div title="${x?x[0]+" of "+x[1]+" correct":"no practice"}"><i style="height:${h}px;opacity:${x&&x[1]?1:.25}"></i></div>`}).join("");
const tomorrow=ids.filter(i=>S.c[i].d==t+1).length,strong=ids.filter(i=>S.c[i].b>=4).length,
shaky=ids.filter(i=>(S.c[i].l||0)>0||S.c[i].b<2).sort((a,b)=>(S.c[b].l||0)-(S.c[a].l||0)||S.c[a].b-S.c[b].b).slice(0,6),
us=(window.UNITS||[["Basics",0]]).map((u,k,a)=>{const e=k+1<a.length?a[k+1][1]:W.length,l=ids.filter(i=>i>=u[1]&&i<e).length;return`<div class="urow"><span>${u[0]}</span><span>${l} of ${e-u[1]}</span></div>`}).join("");
return`<details><summary>Progress details</summary><h3>Accuracy, last 14 days${n?" · "+Math.round(c/n*100)+"% overall":""}</h3><div class="bars">${bars}</div>
<h3>Coming up</h3><div class="urow"><span>Reviews tomorrow</span><span>${tomorrow}</span></div><div class="urow"><span>Strong words</span><span>${strong}</span></div>
${shaky.length?`<h3>Needs attention</h3><div class="chips">${shaky.map(i=>`<span>${W[i][0]} · ${W[i][1]}</span>`).join("")}</div>`:""}<h3>Units</h3>${us}</details>`}
// ---------- Settings extras ----------
const seg=(id,opts,cur)=>`<div class="seg" id="${id}">${opts.map(([v,l])=>`<button data-v="${v}"${v==cur?' class="on"':""}>${l}</button>`).join("")}</div>`;
function share(f){if(navigator.canShare&&navigator.canShare({files:[f]}))return navigator.share({files:[f]}).catch(()=>{});const a=document.createElement("a");a.href=URL.createObjectURL(f);a.download=f.name;document.body.append(a);a.click();a.remove()}
function remind(){const [h,m]=($("rt").value||"19:00").split(":"),d=new Date(),p=n=>String(n).padStart(2,"0"),ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Nederlands//EN","BEGIN:VEVENT","UID:nederlands-daily@"+location.host,"DTSTAMP:"+new Date().toISOString().replace(/[-:]|\.\d+/g,""),"DTSTART:"+d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+"T"+p(h)+p(m)+"00","DURATION:PT15M","RRULE:FREQ=DAILY","SUMMARY:Dutch practice","DESCRIPTION:Open the Nederlands app and do a short session.","URL:"+location.href.split("#")[0].split("?")[0],"BEGIN:VALARM","TRIGGER:PT0M","ACTION:DISPLAY","DESCRIPTION:Dutch practice","END:VALARM","END:VEVENT","END:VCALENDAR"].join("\r\n");
share(new File([ics],"dutch-practice.ics",{type:"text/calendar"}))}
function paintLearnSettings(){const el=$("ls");if(!el)return;const g=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
el.innerHTML=`<h3>Text size</h3>${seg("zs",[[".92","Small"],["1","Normal"],["1.15","Large"]],g("nl-size")||"1")}<h3>Learning</h3><p class="mut" style="margin:0 0 8px">Smart pacing: fewer new words when accuracy dips, a few more when you are doing well</p>${seg("pc",[["1","On"],["0","Off"]],g("nl-pace")=="0"?"0":"1")}<p class="mut" style="margin:14px 0 8px">Hide pronunciation help for words you know well</p>${seg("fd",[["1","On"],["0","Off"]],g("nl-fade")=="0"?"0":"1")}
<h3>Daily reminder</h3><input type="time" id="rt" value="19:00" style="margin-top:0"><button class="ghost" id="rb" style="margin-top:12px">Add to calendar</button><p class="mut" style="margin-top:10px">Adds a repeating daily event with an alert. Your phone asks you to confirm it.</p>
<h3>Backup</h3><button class="ghost" id="ex" style="margin-top:0">Export progress</button><button class="ghost" id="im" style="margin-top:0">Import progress</button><input type="file" id="imf" accept="application/json,.json" hidden>`;
const bind=(id,key,after)=>$(id).querySelectorAll("button").forEach(b=>b.onclick=()=>{try{localStorage.setItem(key,b.dataset.v)}catch(e){}$(id).querySelectorAll("button").forEach(x=>x.classList.toggle("on",x==b));after&&after(b.dataset.v)});
bind("zs","nl-size",v=>document.documentElement.style.setProperty("--zoom",v));bind("pc","nl-pace");bind("fd","nl-fade");
$("rb").onclick=remind;$("ex").onclick=()=>share(new File([JSON.stringify({app:"nederlands",v:1,at:Date.now(),S})],"nederlands-progress.json",{type:"application/json"}));
$("im").onclick=()=>$("imf").click();
$("imf").onchange=async()=>{try{const o=JSON.parse(await $("imf").files[0].text());if(!o||!o.S||!o.S.c)throw 0;S=merge(S,o.S);save();toast("Imported. You now have "+Object.keys(S.c).length+" words.")}catch(e){toast("That file is not a Nederlands backup.")}$("imf").value=""}}
