const cacheName = "DefaultCompany-Ton-1.0";
const contentToCache = [
    "Build/0145c752a950e797e3f5c26444736e72.loader.js",
    "Build/9902efa1c71c290837f78bc813daa66f.framework.js",
    "Build/c48e01514ec88f83b189aff235f11f8e.data",
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
