const CACHE_NAME = 'radar-vendedor-rico-v2';
const urlsToCache = [
  '/radar-vendedor-rico-pro/',
  '/radar-vendedor-rico-pro/index.html',
  '/radar-vendedor-rico-pro/manifest.json',
  '/radar-vendedor-rico-pro/logo-customizada.png',
  '/radar-vendedor-rico-pro/icon-192.png',
  '/radar-vendedor-rico-pro/icon-512.png',
  'https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
