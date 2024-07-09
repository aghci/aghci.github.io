const cacheName = "DefaultCompany-Ton-1.0";
const contentToCache = [
    "Build/0145c752a950e797e3f5c26444736e72.loader.js",
    "Build/ea328ad3e8937062c94fec9cc50111e8.framework.js",
    "Build/a622f3dfe4a0e11caa8e9c93e3c08f15.data",
    "Build/b6fd598ed8c659699e73ce16d644ecb3.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
