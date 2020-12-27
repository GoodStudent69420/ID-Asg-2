//slideshow
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

//login and sign up form
var modal = document.getElementById('login'); 
var modal2 = document.getElementById('signup'); 
window.onclick = function(event) { 
    if (event.target == modal || event.target == modal2) { 
        modal.style.display = "none"; 
        modal2.style.display = "none";
    } 
}

function show(a){
  if (a == "login"){
    document.getElementById("signup").style.display = "none";
    document.getElementById(a).style.display = "flex";
  }
  else{
    document.getElementById("login").style.display = "none";
    document.getElementById(a).style.display = "flex";
  }
}