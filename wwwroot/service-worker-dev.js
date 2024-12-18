// service-worker.dev.js
self.addEventListener('install', (event) => {
    console.log('Service Worker em desenvolvimento instalado.');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker em desenvolvimento ativado.');
});

self.addEventListener('fetch', (event) => {
    // Apenas passa as requisições diretamente, sem cache.
    console.log('Interceptando requisição:', event.request.url);
    event.respondWith(fetch(event.request));
});
