const CACHE_NAME = 'firstpwa';
var urlsToChache = 
[
    "/",
    "/index.html",
    "/html/nav.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js"
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