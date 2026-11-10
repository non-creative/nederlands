// Main-thread side of on-device speech recognition (see asr-worker.js)
const ASRM={base:"onnx-community/whisper-base",small:"onnx-community/whisper-small"};
function asrModel(){try{return localStorage.getItem("nl-asr")||"off"}catch(e){return"off"}}
window.ASR={w:null,ready:"",dev:"",pct:-1,err:"",note:"",lp:null,lm:"",res:null,id:0,pend:{},ui1:null,ui2:null,
emit(){this.ui1&&this.ui1();this.ui2&&this.ui2()},
text(){const m=asrModel(),g=navigator.gpu?"WebGPU is available.":"WebGPU is not available, so it will use the slower CPU mode.";
if(m=="off")return"Off. Turn on to check your speech on this phone, no Mac needed. "+g;
if(this.err)return this.err+" Dictation is used instead.";
if(this.ready==ASRM[m])return"Ready. Running on "+(this.dev=="webgpu"?"your phone’s GPU":"the CPU")+". Works offline."+(this.note?" "+this.note:"");
if(this.lp)return"Downloading the speech model"+(this.pct>=0?" "+this.pct+"%":"…")+" (one time, keep this page open). "+g;
return"On. The model loads when you open Speak. It downloads once, on first use. "+g},
start(){if(this.w)return;const w=this.w=new Worker("asr-worker.js",{type:"module"});
w.onmessage=e=>{const m=e.data;
if(m.type=="progress"){this.pct=m.pct;if(m.note)this.note=m.note}
else if(m.type=="note")this.note=m.note;
else if(m.type=="ready"){this.ready=this.lm;this.dev=m.device;this.lp=null;this.res&&this.res.ok(true)}
else if(m.type=="result"){const p=this.pend[m.id];delete this.pend[m.id];p&&p.ok(m.text)}
else if(m.type=="error"){if(m.id){const p=this.pend[m.id];delete this.pend[m.id];p&&p.no(new Error(m.message))}else this.fail(m.message)}
this.emit()};
w.onerror=e=>this.fail("Could not start the speech model"+(e&&e.message?": "+e.message:"."))},
fail(msg){this.err=msg;this.lp=null;this.w&&this.w.terminate();this.w=null;this.res&&this.res.no(new Error(msg));Object.values(this.pend).forEach(p=>p.no(new Error(msg)));this.pend={};this.emit()},
load(){const m=ASRM[asrModel()];if(!m)return Promise.resolve(false);if(this.ready==m)return Promise.resolve(true);if(this.lp&&this.lm==m)return this.lp;
this.err="";this.pct=-1;this.start();this.lm=m;this.lp=new Promise((ok,no)=>{this.res={ok,no}});this.lp.catch(()=>{});this.w.postMessage({type:"load",model:m});this.emit();return this.lp},
run(a){return new Promise((ok,no)=>{if(!this.w)return no(new Error("The speech model is not loaded."));const id=++this.id,c=Float32Array.from(a);this.pend[id]={ok,no};this.w.postMessage({type:"run",id,audio:c},[c.buffer])})},
remove(){this.w&&this.w.terminate();this.w=null;this.ready="";this.lp=null;this.err="";this.pct=-1;this.note="";try{caches.keys().then(ks=>ks.filter(k=>/transformers/i.test(k)).forEach(k=>caches.delete(k)))}catch(e){}this.emit()}};
