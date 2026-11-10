// On-device Dutch speech recognition: Whisper via Transformers.js (WebGPU, falling back to WASM)
import {pipeline,env} from "./tjs.js";
env.allowLocalModels=false;
if(!self.crossOriginIsolated)env.backends.onnx.wasm.numThreads=1;
let asr=null,key="",dev="";const files={};
const post=m=>self.postMessage(m);
const prog=p=>{if(p.status=="progress"&&p.total){files[p.file]=[p.loaded,p.total];let l=0,t=0;for(const k in files){l+=files[k][0];t+=files[k][1]}post({type:"progress",pct:Math.round(l/t*100)})}};
const make=(model,device)=>pipeline("automatic-speech-recognition",model,{device,dtype:device=="webgpu"?{encoder_model:"fp32",decoder_model_merged:"q4"}:{encoder_model:"q8",decoder_model_merged:"q8"},progress_callback:prog});
const OPT={language:"dutch",task:"transcribe"};
self.onmessage=async e=>{const m=e.data;
try{
if(m.type=="load"){if(asr&&key==m.model){post({type:"ready",device:dev});return}
let d=self.navigator&&navigator.gpu?"webgpu":"wasm";
try{asr=await make(m.model,d)}catch(err){if(d!="webgpu")throw err;post({type:"progress",pct:0,note:"The GPU could not be used, so it is running on the CPU."});d="wasm";for(const k in files)delete files[k];asr=await make(m.model,d)}
key=m.model;dev=d;post({type:"ready",device:d})}
else if(m.type=="run"){let o;
try{o=await asr(m.audio,OPT)}catch(err){if(dev!="webgpu")throw err;post({type:"note",note:"The GPU failed, so it switched to the CPU."});asr=await make(key,"wasm");dev="wasm";o=await asr(m.audio,OPT)}
post({type:"result",id:m.id,text:(o.text||"").trim()})}
}catch(err){post({type:"error",id:m.id,message:String(err&&err.message||err)})}};
