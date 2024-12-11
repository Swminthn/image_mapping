const CACHE_NAME = 'pwa-cache-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/map.png',
    '/jammu_kashmir.jpg',
    '/punjab.png',
    '/hp.jpg',
    '/style.css',
    '/script.js',
    '/manifest.json'
];

// Install event: Cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets...');
            return cache.addAll(assetsToCache);
        })
    );
});

// Fetch event: Serve assets from cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

// Activate event: Remove old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
