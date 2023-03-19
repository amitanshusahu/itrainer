if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js")
  .then( registration => {
    console.log("sw registered");
    console.log(registration);
  }).catch( err => {
    console.error(err);
  });
}
else{
  alert("pwa not supported in your browser please use latest version of chrome")
}
