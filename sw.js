self.addEventListener("install", e => {
  console.log("install, running sw.js")
    e.waitUntil(
        caches.open("static")
        .then(cache => {
            console.log("files cached");
            return cache.addAll([
              "/",
              "/js/startup.js",
              "/js/dom.js",
              "/js/script.js",
              "/css/common.css",
              "/css/style.css",
              "https://cdn.jsdelivr.net/npm/chart.js",
              "/img/logo192.png",
              "/img/cloud.png",
              "/img/time.png",
              "/img/weight.png",
              "/img/badge.webp",
              "/img/badge2.webp",
              "/img/badge3.webp",
              "/img/badge4.webp",
            ]);
        })
        .catch(e =>{
          console.log(e);
        })
    )
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
    .then(res =>{
      return res || fetch(e.request);
    })
    .catch( e => {
      console.log(e)
    })
  );
})
