// 缓存版本号
var version = 'v111123332223333'
self.addEventListener('install', function (e) {
      
    e.waitUntil(
        caches.open(version).then(function (cache) {
            return cache.addAll([
                '/serviceWorker/',
                '/serviceWorker/index.html',
                '/serviceWorker/css/index.css',
                '/serviceWorker/js/haha.js',
                '/serviceWorker/js/1.js',
                // 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2552702174,1694191263&fm=27&gp=0.jpg'
            ])
        })
    )
})

self.addEventListener('activate', function (e) {
    var that = this;
    e.waitUntil(
        caches.keys().then(function (keylist) {
            console.log(keylist);
            return Promise.all(keylist.map(function (key) {
                if (version.indexOf(key) === -1) {
                    console.log(key)
                    return caches.delete(key);
                }
            }))
        })
    )
    return self.clients.claim();
})
var pattern = /\.html/gi;
self.addEventListener('fetch', function (e) {
    console.log('fetch',e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (response) {
            console.log(response);
            if (response) {
                console.log('新版本' + version + '，有缓存，从缓存中获取:', e.request.url);
                return response

            } else {
                return fetch(e.request)
                    .then(function (res) {
                        // return caches.open(version).then(function (cache) {
                        //     // cache.put(e.request, res.clone());
                        //     return res;
                        // })
                        return res

                    })
            } 

        }).catch(function () {

        })
    )
})