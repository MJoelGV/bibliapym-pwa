const CACHE_NAME = 'biblia-pwa-v1';
const STATIC_RESOURCES = [
    '/',
    '/index.html',
    '/lectura.html',
    '/styles.css',
    '/app.js',
    '/bible-loader.js',
    '/manifest.json',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'
];

const BIBLE_FILES = [
    '/biblia-files/Reina-Valera 1960.xmm',
    '/biblia-files/Dios Habla Hoy.xmm',
    '/biblia-files/La Biblia de Las Americas.xmm',
    '/biblia-files/Nueva Traducción Viviente.xmm',
    '/biblia-files/Traducción en Lenguaje Actual.xmm'
];

// Instalar el Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            // Cachear recursos estáticos
            caches.open(CACHE_NAME).then((cache) => {
                console.log('Cacheando recursos estáticos');
                return cache.addAll(STATIC_RESOURCES);
            }),
            // Cachear archivos de la Biblia
            caches.open('bible-files').then((cache) => {
                console.log('Cacheando archivos de la Biblia');
                return cache.addAll(BIBLE_FILES);
            })
        ])
    );
});

// Activar el nuevo Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== 'bible-files') {
                        console.log('Eliminando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptar peticiones y servir desde caché
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Si encontramos el recurso en caché, lo devolvemos
            if (response) {
                return response;
            }

            // Si no está en caché, hacemos la petición a la red
            return fetch(event.request).then((response) => {
                // Si la respuesta no es válida, la devolvemos tal cual
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clonamos la respuesta porque se consume al leerla
                const responseToCache = response.clone();

                // Guardamos la nueva respuesta en caché
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            }).catch(() => {
                // Si falla la petición y es una página HTML, mostramos la página offline
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            });
        })
    );
});

// Manejar mensajes desde la aplicación
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
