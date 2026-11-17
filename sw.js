const V='diario-v1',LOCAL=['./','index.html','manifest.json','icon-192.png','icon-512.png','apple-touch-icon.png'],
LIBS=['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(LOCAL);await Promise.allSettled(LIBS.map(u=>c.add(u)));self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 e.respondWith((async()=>{const c=await caches.open(V),hit=await c.match(r,{ignoreSearch:true});
  const net=fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}).catch(()=>null);
  return hit||(await net)||(await c.match('index.html'))})())});
