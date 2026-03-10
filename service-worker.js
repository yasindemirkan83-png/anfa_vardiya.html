const cacheName = 'vardiya-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css', // Eğer ayrıysa
  '/manifest.json'
];

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(cacheName).then(cache=>cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(res=>{
      return res || fetch(e.request);
    })
  );
});
