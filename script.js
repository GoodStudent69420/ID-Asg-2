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

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnFetch').addEventListener('click', sendReq);
  sessionStorage.setItem('MyUniqueUserToken', JSON.stringify('pkA7fg4vf3HpvZrcWvHHmPCVOxFCiGdMgz8FkuSQjv0fb8FlYKZUVV_ho3wqnaFmgV3DgjcCV4GG8Qg7kE-3QTiPJcKNG1S9vnbeARYjhgibjInVq7oC4mFq2K0mR0nIpZNlTcG7H1CzNbcBsNxJbn5zHsKZmKmTPNh-vhJanw8BKvloBKHChs5ByEtctkruvEj8b_ZdvtByXcXgROUYBgDhWHcc9TdsgrXavuY0smmCJ2MwVYBnZwDT4lWpBwASEWuVKj2YPG1aVg6uEZwyD8ukeQba5ShxqQxNf4LGtRm4qf5yU0RStgpkUrWMDxI_06bsScDPig8i4PPvnCw')
  );
});

let sendReq = (ev) => {
  let url = 'https://api.myanimelist.net/v2/anime?q=one&limit=4';
  let token = JSON.parse( sessionStorage.getItem('MyUniqueUserToken') );
  let h = new Headers();
h.append('Authentication', `Bearer ${token}`);
  let req = new Request(url, {
    method :'GET',
    mode: 'cors',
    headers : h
  });
  fetch(req)
    .then(resp => resp.json())
    .then(data => {
      console.log(data[0]);
    })
    .catch(err => {
      console.error(err.message);
    })
  }

