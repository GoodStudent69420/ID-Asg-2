var path = window.location.pathname;
var page = path.split("/").pop();
console.log( page );

// if user is in index page
if(page == "index.html")
{
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

      var i = 0
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
}

// if user is in content page
if(page == "content.html"){
  var container = document.getElementById('div-container')
  var pageNo = 1
  var topHeight = 10.5

  red = 200
  green = 200
  blue = 200

  function fetchData(){
    fetch('https://api.jikan.moe/v3/top/anime/'+ pageNo.toString() +'/tv')
    .then(response => response.json()) 
    .then(function(data){
      console.log(data)
  
      let i = 0
      while (i < (data.top).length){
        var id = "aContent" + (i).toString()
        container.innerHTML += ("<div class='items'><img src='" + data.top[i].image_url + "' id='aContent"+i+"'></div>");
        i ++
      }
    });
  }

  function more(){
    pageNo += 1
    fetchData()
  }

  var genres = document.getElementById("genres").childNodes
  genres[1].style.top= "8.5%"
  genres[1].style.backgroundColor = "rgb("+red+", "+green+", "+blue+")"

  console.log(genres.length)
  for (let i = 3; i <= genres.length; i += 2){
    
    if (red <= 50){
      red = 200
      green = 200
      blue = 200
    }
    else{
      red -= 10
      green -= 10
      blue -= 10
    }

    genres[i].style.top = topHeight.toString() + "%"
    genres[i].style.backgroundColor = "rgb("+red+", "+green+", "+blue+")"

    topHeight += 2
  }
}

//on all pages
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