// service-worker.prod.js
const CACHE_NAME = 'blazor-app-cache-v1';
const OFFLINE_URL = '/offline.html';

// Lista de arquivos para cachear na instalação.
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/css/app.css',
    '/js/app.js',
    '/_framework/blazor.webassembly.js',
];

// Instala o Service Worker e faz o pré-cache dos arquivos.
self.addEventListener('install', (event) => {
    console.log('Service Worker de produção instalado.');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Adicionando arquivos ao cache...');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Ativa o Service Worker e limpa caches antigos.
self.addEventListener('activate', (event) => {
    console.log('Service Worker de produção ativado.');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Intercepta requisições e serve do cache ou busca na rede.
self.addEventListener('fetch', (event) => {
    console.log('Interceptando requisição:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Retorna o cache ou faz o fetch.
            return response || fetch(event.request).catch(() => {
                // Retorna offline.html se a rede falhar.
                if (event.request.mode === 'navigate') {
                    return caches.match(OFFLINE_URL);
                }
            });
        })
    );
});
