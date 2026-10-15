const CACHE_NAME = 'radar-vendedor-rico-v19';
const urlsToCache = [
  '/Radar-Vendedor-Rico-PRO/',
  '/Radar-Vendedor-Rico-PRO/index.html',
  '/Radar-Vendedor-Rico-PRO/manifest.json',
  '/Radar-Vendedor-Rico-PRO/logo-dark.png',
  '/Radar-Vendedor-Rico-PRO/logo-light.png',
  '/Radar-Vendedor-Rico-PRO/icon-192.png',
  '/Radar-Vendedor-Rico-PRO/icon-512.png',
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
  // API (Apps Script) e qualquer POST vão direto pra rede: respostas com dados do aluno
  // (incluindo a lista de aulas) nunca passam pelo cache do service worker.
  if (event.request.method !== 'GET' || event.request.url.indexOf('script.google.com') !== -1) return;
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
