const CACHE_NAME = 'vardiya-vfinal';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './vardiya.jpg'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

