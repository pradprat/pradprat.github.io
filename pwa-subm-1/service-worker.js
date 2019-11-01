const CACHE_NAME = 'praddesign-v1';
var urlsToChache = 
[
    '/',
    '/index.html',
    '/nav.html',
    '/assets/css/all.css',
    '/assets/js/all.js',
    '/css/main.css',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    '/js/nav.js',
    '/pages/about.html',
    '/pages/design.html',
    '/pages/explore.html',
    '/pages/find.html',
    '/images/17.jpg',
    '/images/prad.jpg',
    '/images/logo/Font_Awesome.jpg',
    '/images/logo/materialize.png',
    '/images/logo/praddesign-white.png',
    '/images/logo/praddesign.png',
    '/images/design/1.jpg',
    '/images/design/2.jpg',
    '/images/design/3.jpg',
    '/images/design/4.jpg',
    '/images/design/5.jpg',
    '/images/design/6.jpg',
    '/images/design/7.jpg',
    '/images/design/8.jpg',
    '/images/design/9.jpg',
];

self.addEventListener('install',function (event) 
{  
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) 
    {  
        return cache.addAll(urlsToChache);
    }));
});

self.addEventListener('fetch',function (event) 
{
    event.respondWith
    (
        caches.match(event.request,{cacheName : CACHE_NAME})
        .then(function (response) 
        {  
            if (response) 
            {
                console.log('serviceWorker: Gunakan aset dari cache:',response.url);
                return response;
            }

            console.log('ServiceWorker: Memuat aset dari server:',event.request.url);
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) 
{
    event.waitUntil
    (
        caches.keys().then(function(cacheNames) 
        {
            return Promise.all
            (
                cacheNames.map(function(cacheName) 
                {
                    if (cacheName != CACHE_NAME) 
                    {
                        console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});