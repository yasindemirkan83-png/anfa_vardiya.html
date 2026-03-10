const CACHE_NAME = "vardiya-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
  "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/vardiya.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
