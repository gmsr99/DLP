const CACHE = 'dlp-v1';

const ASSETS = [
  './index.html',
  './manifest.json',
  './public/favicon.png',
  './public/icon-192.png',
  './public/disney-banner.jpg',
  './Prints/VOO - bilhetes 4px.png',
  './Prints/VOO - bilhete 1px.png',
  './Prints/HOTEL - 2noites 4px.png',
  './Prints/DISNEYLAND - bilhetes.png',
  './Prints/UBER - viagem de ida.png',
  './Prints/UBER - viagem de regresso.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
