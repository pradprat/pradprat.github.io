var webPush = require('web-push');

var pushSubscription = {
    "endpoint": "https://updates.push.services.mozilla.com/wpush/v1/gAAAAABcUndPPFgAbCgy-WGtySotyyJv-EMKaBgy9cchGjTiUi-SNOvtUQClVlOKwOyQYc7riZb2hjK8N9XdRl7VjiumWHkacY7idaA5v-zetc4SN3JDUiOq3owNidCqss7x_mp8U8bw",
    "keys": {
        "p256dh": "BNCpK0RK4vyjzFpsSR8SnG7q0/bJisUB7JyxWY9UsTZfXXfx1ydiQsbfJoLYUQTUWaRviNSYiL459K4CDtpnWKM=", 
        "auth": "JS6BAmbMoL3XNscySuGUoQ=="
    }
};

var payload = 'jangan lupa untuk melihat jadwal Hari ini!';

var options = {
    gcmAPIKey: "AIzaSyBRAKs6EvDU2le0WY5AtD65NLrWIxfnfRE",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
