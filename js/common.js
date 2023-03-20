// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  let modal = document.querySelector(".modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openMenu(){
  let modal = document.querySelector(".modal");
  modal.style = "scale:1;"
}