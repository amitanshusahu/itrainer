self.addEventListener("install", e => {
  console.log("install, running sw.js")
    e.waitUntil(
        caches.open("static")
        .then(cache => {
            console.log("files cached");
            return cache.addAll([
              "/",
              "/html/stats.html",
              "/js/startup.js",
              "/js/dom.js",
              "/js/script.js",
              "/js/common.js",
              "/js/chart.js",
              "/js/stats-script.js",
              "/css/common.css",
              "/css/style.css",
              "https://cdn.jsdelivr.net/npm/chart.js",
              "/img/logo192.png",
              "/img/cloud.png",
              "/img/badge.webp",
              "/img/badge2.webp",
              "/img/badge3.webp",
              "/img/badge4.webp",
              "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&display=swap",
              "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap",
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
