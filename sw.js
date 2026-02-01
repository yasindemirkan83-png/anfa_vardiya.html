const CACHE_NAME = 'parkfaaliyet-cache-v1';
const urlsToCache = ['/', '/index.html', '/style.css', '/app.js', '/manifest.json', '/logo.png', '/acilis.mp4'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if(!cacheWhitelist.includes(key)) return caches.delete(key);
      })
    ))
  );
});
