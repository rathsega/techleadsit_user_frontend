const CACHE_VERSION = 'lms-v1';
const CSS_CACHE = 'css-cache-v1';
const FONT_CACHE = 'font-cache-v1';

// Critical resources to cache
const CRITICAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap',
  'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
  'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2'
];

const NON_CRITICAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css'
];

// Install - Cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(CRITICAL_ASSETS);
    })
  );
  self.skipWaiting();
});

// Fetch - Serve from cache first, update in background
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Handle CSS files
  if (request.destination === 'style' || request.url.includes('.css')) {
    event.respondWith(
      caches.open(CSS_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Serve from cache, update in background
            fetch(request).then((fetchResponse) => {
              if (fetchResponse.ok) {
                cache.put(request, fetchResponse.clone());
              }
            }).catch(() => {});
            return cachedResponse;
          }
          
          // Not in cache, fetch and cache
          return fetch(request).then((fetchResponse) => {
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        });
      })
    );
  }

  // Handle font files
  else if (request.url.includes('fonts.gstatic.com') || request.destination === 'font') {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          return cachedResponse || fetch(request).then((fetchResponse) => {
            if (fetchResponse.ok) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        });
      })
    );
  }
});

// Activate - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheName.includes('lms-v1') && !cacheName.includes('css-cache') && !cacheName.includes('font-cache')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});