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
  var value = ""
  var red = 60
  var green = 60
  var blue = 60
  var genres = document.getElementById("genres").childNodes
  
  contentType = JSON.parse(sessionStorage.getItem("type"))
  console.log(contentType)

  //what to do if the content type is anime or manga
  if (contentType == "anime"){
    $("#44").css("display", "none")
    $("#45").css("display", "none")
    genres[1].style.top= "7.5%"
  }
  else{
    $('#42').attr("id","41")
    $('#43').attr("id","42")
    $('#41').attr("id","45")
    $('#45').attr("id","43")

    genres[1].style.top= "5.5%"
    topHeight = 7.5
  }

  
  //get data when content page is loaded
  var req1 = "top"
  var type1 = ""
  var subtype1 = ""

  if (contentType == "anime"){
    var type1 = "anime"
    var subtype1 = "tv"
  }
  else{
    var type1 = "manga"
    var subtype1 = "manga"
  }
  function fetchData(req = req1, type = type1, subtype = subtype1){
    fetch('https://api.jikan.moe/v3/'+req+'/'+type+'/'+ pageNo.toString() +'/'+subtype+'')
    .then(response => response.json()) 
    .then(function(data){
      console.log(data)
  
      let i = 0
      while (i < (data.top).length){
        container.innerHTML += ("<div class='items' id='"+ data.top[i].mal_id +"' title='"+ data.top[i].title +"'><img src='" + data.top[i].image_url + "' id='aContent"+i+"'></div>");
        i ++
      }
    });
  }

  
  //set colours for each genre bar
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

  // function to make the genre selection work
  $('.aGenre').click(function() {
    container.innerHTML = ''
    currentGenre = this.id
    pageNo = 1
    value = ""
    fetch('https://api.jikan.moe/v3/genre/'+contentType+'/'+ currentGenre.toString() +'/'+pageNo.toString()+'')
    .then(response => response.json()) 
    .then(function(data){
      console.log(data)
      let i = 0
      if (contentType == "anime"){
        while (i < (data.anime).length){
          container.innerHTML += ("<div class='items' id='"+ data.anime[i].mal_id +"' title='"+ data.anime[i].title +"'><img src='" + data.anime[i].image_url + "' id='aContent"+i+"'></div>");
          i ++
        }
      }
      else{
        while (i < (data.manga).length){
          container.innerHTML += ("<div class='items' id='"+ data.manga[i].mal_id +"' title='"+ data.manga[i].title +"'><img src='" + data.manga[i].image_url + "' id='aContent"+i+"'></div>");
          i ++
        }
      }           
    });
  });

  //search function
  function search(){
    container.innerHTML = ''
    value = document.getElementById("searchTxt").value
    fetch("https://api.jikan.moe/v3/search/"+contentType+"?q="+ value)
    .then(response => response.json()) 
    .then(function(data){
      console.log(data)
      let i = 0
      while (i < (data.results).length){
        container.innerHTML += ("<div class='items' id='"+ data.results[i].mal_id +"' title='"+ data.results[i].title +"'><img src='" + data.results[i].image_url + "' id='aContent"+i+"'></div>");
        i ++  
      }
    });
  }

  // for displaying data when the item is clicked
  $("body").on("click", ".items", function(event){
    let aId = this.id
    fetch('https://api.jikan.moe/v3/'+contentType+'/' + aId)
    .then(response => response.json()) 
    .then(function(data){
      console.log(data)
      document.getElementById("detailsBox").style.display = "block";

      document.getElementById("title").innerHTML = data.title
      document.getElementById("contentImage").src = data.image_url
      document.getElementById("synopsis").innerHTML = data.synopsis
    });
  })

  //function to make the more button work
  function more(){
    if (currentGenre == "" && value == ""){
      pageNo += 1
      if (contentType == "anime"){
        fetchData('top', 'anime', 'tv')
      }
      else{
        fetchData('top', 'manga', 'manga')
      }
    }
    else if (value == ""){
      pageNo ++ 
      fetch('https://api.jikan.moe/v3/genre/'+contentType+'/'+ currentGenre.toString() +'/'+pageNo.toString()+'')
      .then(response => response.json()) 
      .then(function(data){
        console.log(data)
        let i = 0
        if (contentType == "anime"){
          while (i < (data.anime).length){
            container.innerHTML += ("<div class='items' id='"+ data.anime[i].mal_id +"' title='"+ data.anime[i].title +"'><img src='" + data.anime[i].image_url + "' id='aContent"+i+"'></div>");
            i ++
          }
        }
        else{
          while (i < (data.manga).length){
            container.innerHTML += ("<div class='items' id='"+ data.manga[i].mal_id +"' title='"+ data.manga[i].title +"'><img src='" + data.manga[i].image_url + "' id='aContent"+i+"'></div>");
            i ++
          }
        }           
      });
    }
  }
}

//will work on all pages
//pass content type data
$('.type').click(function() {
  sessionStorage.setItem("type",JSON.stringify(this.id));
});

//login and sign up form
var login = document.getElementById('login'); 
var signup = document.getElementById('signup'); 
var detailsBox = document.getElementById('detailsBox'); 
window.onclick = function(event) { 
    if (event.target == login || event.target == signup || event.target == detailsBox) { 
        login.style.display = "none"; 
        signup.style.display = "none";
        detailsBox.style.display = "none";
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