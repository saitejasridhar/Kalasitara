var inkbox = document.getElementById("inked-painted");
var colorbox = document.getElementById("colored");
var fillerImage = document.getElementById("inked");
inkbox.addEventListener("mousemove", trackLocation, false);
inkbox.addEventListener("touchstart", trackLocation, false);
inkbox.addEventListener("touchmove", trackLocation, false);

function trackLocation(e) {
  var rect = inked.getBoundingClientRect();
  var position = ((e.pageX - rect.left) / inked.offsetWidth) * 100;
  if (position <= 100) {
    colorbox.style.width = position + "%";
  }
}


$('.burger, .overlay').click(function(){
  $('.burger').toggleClass('clicked');
  $('.overlay').toggleClass('show');
  $('nav').toggleClass('show');
  $('body').toggleClass('overflow');
});