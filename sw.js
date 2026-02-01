// sw.js - Service Worker

const CACHE_NAME = 'parkfaaliyet-cache-v1'; const urlsToCache = [ '/', '/index.html', '/kayit.html', '/ayarlar.html', '/style.css', '/app.js', '/manifest.json', '/logo.png', '/acilis.mp4' ];

self.addEventListener('install', event => { event.waitUntil( caches.open(CACHE_NAME) .then(cache => cache.addAll(urlsToCache)) ); });

self.addEventListener('fetch', event => { event.respondWith( caches.match(event.request) .then(response => response || fetch(event.request)) ); });

self.addEventListener('activate', event => { const cacheWhitelist = [CACHE_NAME]; event.waitUntil( caches.keys().then(cacheNames => { return Promise.all( cacheNames.map(name => { if (!cacheWhitelist.includes(name)) { return caches.delete(name); } }) ); }) ); });
