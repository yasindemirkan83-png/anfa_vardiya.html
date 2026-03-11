const CACHE_NAME = 'vardiya-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './vardiya.png'
];

// Yükleme ve Önbelleğe Alma
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

// İnternet olmasa da çalışma (Offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

// Bildirime tıklandığında uygulamayı açma
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

