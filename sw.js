const C="nl-v4",F=["./","index.html","extra.js","pron.js","manifest.webmanifest","font.woff2","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>(x.startsWith("nl-")&&x!=C)||/transformers/i.test(x)).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);
if(e.request.method!="GET"||u.origin!=location.origin||u.pathname.includes("/api/"))return;
e.respondWith(caches.open(C).then(c=>c.match(e.request).then(m=>{const f=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>m||c.match("index.html"));return m||f})))});
