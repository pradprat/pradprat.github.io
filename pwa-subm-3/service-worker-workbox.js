importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/main.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/indexedDB.js', revision: '1' },
    { url: '/js/jquery-3.3.1.min.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/tabs.js', revision: '1' },
    { url: '/img/ball.png', revision: '1' }
]);

workbox.routing.registerRoute(
    new RegExp('^http://api.football-data.org/v2/competitions/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data'
    })
);


self.addEventListener('push', function(event) 
{
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/ball.png',
        vibrate: [200, 20, 50],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
