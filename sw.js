const C="nl-v3",CDN="nl-cdn",F=["./","index.html","extra.js","pron.js","asr.js","asr-worker.js","tjs.js","manifest.webmanifest","font.woff2","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith("nl-")&&x!=C&&x!=CDN).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!="GET")return;
if(u.hostname=="cdn.jsdelivr.net"){e.respondWith(caches.open(CDN).then(c=>c.match(e.request).then(m=>m||fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}))));return}
if(u.origin!=location.origin||u.pathname.includes("/api/"))return;
e.respondWith(caches.open(C).then(c=>c.match(e.request).then(m=>{const f=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>m||c.match("index.html"));return m||f})))});
