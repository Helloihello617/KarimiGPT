// Service Worker ساده برای فعال‌سازی قابلیت نصب PWA
const CACHE_NAME = 'karimigpt-cache-v1';
const URLS_TO_CACHE = [
  './chatbot7-5.html',
  './manifest.json',
  './logoo.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE).catch(() => {
        // اگر برخی فایل‌ها موجود نبودند، نصب متوقف نشود
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => cachedResponse)
      );
    })
  );
});
