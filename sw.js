const CACHE='matwise-v17';
const FILES=['./','./index.html','./style.css','./app.js','./coach-ai.js','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(Promise.all([caches.open(CACHE).then(cache=>cache.addAll(FILES)),self.skipWaiting()])));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('matwise-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(url.origin!==location.origin)return;event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));return response}).catch(()=>caches.match('./index.html'))))});
