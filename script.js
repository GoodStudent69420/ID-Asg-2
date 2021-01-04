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
  var topHeight = 9.5
  var currentGenre = ""

  red = 60
  green = 60
  blue = 60

  function fetchData(req, type, subtype){
    fetch('https://api.jikan.moe/v3/'+req+'/'+type+'/'+ pageNo.toString() +'/'+subtype+'')
    .then(response => response.json()) 
    .then(function(data){
      console.log(data)
  
      let i = 0
      while (i < (data.top).length){
        container.innerHTML += ("<div class='items' id='"+ data.top[i].mal_id +"'><img src='" + data.top[i].image_url + "' id='aContent"+i+"'></div>");
        i ++
      }
    });
  }

  var genres = document.getElementById("genres").childNodes
  genres[1].style.top= "7.5%"
  genres[1].style.backgroundColor = "rgb("+red+", "+green+", "+blue+")"

  for (let i = 3; i <= genres.length - 1; i += 2){
    if (red == 60){
      red += 20
      green += 20
      blue += 20
    }
    else if (red == 80){
      red -= 20
      green -= 20
      blue -= 20
    }

    genres[i].style.top = topHeight.toString() + "%"
    genres[i].style.backgroundColor = "rgb("+red+", "+green+", "+blue+")"
    topHeight += 2
  }

  $('.aGenre').click(function() {
    container.innerHTML = ''
    currentGenre = this.id
    pageNo = 1

    fetch('https://api.jikan.moe/v3/genre/anime/'+ currentGenre.toString() +'/'+pageNo.toString()+'')
    .then(response => response.json()) 
    .then(function(data){
      console.log(data)
      let i = 0
      while (i < (data.anime).length){
        container.innerHTML += ("<div class='items' id='"+ data.anime[i].mal_id +"'><img src='" + data.anime[i].image_url + "' id='aContent"+i+"'></div>");
        i ++
      }
    });
  });

  // for displaying data when the item is clicked
  $("body").on("click", ".items", function(event){
    let aId = this.id
    fetch('https://api.jikan.moe/v3/anime/' + aId)
    .then(response => response.json()) 
    .then(function(data){
      alert(data.title)
      console.log(data)
    });
  })
 
 function more(){
    if (currentGenre == ""){
      pageNo += 1
      fetchData('top', 'anime', 'tv')
    }
    else{
      pageNo ++
      fetch('https://api.jikan.moe/v3/genre/anime/'+ currentGenre.toString() +'/'+pageNo.toString()+'')
      .then(response => response.json()) 
      .then(function(data){
      console.log(data)
      let i = 0
      while (i < (data.anime).length){
        container.innerHTML += ("<div class='items' id='"+ data.anime[i].mal_id +"'><img src='" + data.anime[i].image_url + "' id='aContent"+i+"'></div>");
        i ++
      }
      });
    }
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