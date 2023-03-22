// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  let modal = document.querySelector(".modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openMenu(){
  let modal = document.querySelector(".modal");
  modal.style.display = "flex";
}

let isOnline = navigator.onLine;
if(isOnline == false){
  let cloudBtn = document.querySelector(".cloud-btn");
  cloudBtn.classList.toggle("bg-red");
  cloudBtn.innerText = "Offline";
}