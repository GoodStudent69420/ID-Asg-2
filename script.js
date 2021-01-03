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

fetch('https://api.jikan.moe/v3/top/anime/1/upcoming')
  .then(response => response.json()) 
  .then(function(data){
    console.log(data)

    let i = 0
    while (i < 21){
      document.getElementById("up" + (i + 1).toString()).src = data.top[i].image_url;
      document.getElementById("upName" + (i + 1).toString()).innerHTML = data.top[i].title;
      i ++
    }
});

fetch('https://api.jikan.moe/v3/top/anime/1/tv')
  .then(response => response.json()) 
  .then(function(data){
    console.log(data)

    let i = 0
    while (i < 21){
      document.getElementById("anime" + (i + 1).toString()).src = data.top[i].image_url;
      document.getElementById("aTitle" + (i + 1).toString()).innerHTML = data.top[i].title;
      document.getElementById("aDesc" + (i + 1).toString()).innerHTML = 'Score: ' + data.top[i].score;
      i ++
    }
});

fetch('https://api.jikan.moe/v3/top/manga/1/manga')
  .then(response => response.json()) 
  .then(function(data){
    console.log(data)

    let i = 0
    while (i < 21){
      document.getElementById("manga" + (i + 1).toString()).src = data.top[i].image_url;
      document.getElementById("mTitle" + (i + 1).toString()).innerHTML = data.top[i].title;
      document.getElementById("mDesc" + (i + 1).toString()).innerHTML = 'Score: ' + data.top[i].score;
      i ++
    }
});

fetch('https://api.jikan.moe/v3/genre/anime/1/1')
  .then(response => response.json()) 
  .then(function(data){
    console.log(data)
});

//Loop Divs
var i;
for (i = 0; i <= 100; i++) {
  text += cars[i] + "<br>";
}