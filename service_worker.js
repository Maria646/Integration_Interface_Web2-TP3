//Nom de la cache
const CACHE_NAME = 'site-static-cache-v1';
//Listes des fichiers a mettre en cache
const FILES_TO_CACHE = [
    "horsLigne.html",
    "index.html",
    "portfolio.html",
    "apropos.html",
    "contact.html",
    "confirmationForm.html",
    "style/css/apropos.css",
    "style/css/pageAcceuil.css",
    "style/css/portfolio.css",
    "style/css/style.css"
];
self.addEventListener('install', (evt) => {
console.log('[ServiceWorker] Install');
// Mets les fichiers du FILES_TO_CACHE en cache
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
    console.log('[ServiceWorker] Pre-caching offline page');
    return cache.addAll(FILES_TO_CACHE);
    })
    );
self.skipWaiting();
});
self.addEventListener('activate', (evt) => {
console.log('[ServiceWorker] Activate');
//Suppression de la vielle cache
evt.waitUntil(
    caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
    if (key !== CACHE_NAME) {
    console.log('[ServiceWorker] Removing old cache',
    key);
    return caches.delete(key);
    }
    }));
    })
    );
self.clients.claim();
});
self.addEventListener('fetch', (evt) => {
console.log('[ServiceWorker] Fetch', evt.request.url);
//Avertissement et suivie de la navigation hors ligne
if (evt.request.mode !== 'navigate') {
    return;
    }
    evt.respondWith(
    fetch(evt.request)
    .catch(() => {
    return caches.open(CACHE_NAME)
    .then((cache) => {
    return cache.match('/TP3_MariamaDiaby/horsLigne.html');
    });
    })
    );
});