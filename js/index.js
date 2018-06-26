var currentPosition = 0;
var offsetsArray = [];

var $navLinks = $('nav a');
var $sections = $('section');
var $window = $(window);

function init() {
  calculateOffsets();
  bindEvents();
}

function bindEvents() {
  $navLinks.on('click', onClick);
  $window.on('scroll', debounce(onScroll, 100));
}

function onClick(e) {
  e.preventDefault();
  var targetEl = $(this).attr('href');

  $navLinks.removeClass('active');
  $(this).addClass('active');
  
  $('html, body').animate({
    scrollTop: $(targetEl).offset().top - 63
  });
}

function onScroll() {
  var pos = $(document).scrollTop() + 64;
  closestPosition = findClosestNumber(pos, offsetsArray);

  console.log(pos);
  console.log('----> cosest number: ' + closestPosition);

  if (closestPosition !== currentPosition) {
    $navLinks.removeClass('active');
    $('.offset-top-' + closestPosition).addClass('active');
    currentPosition = closestPosition;
  }
}

function calculateOffsets() {
  $sections.each(function(index) {
    var el = $(this)[0];
    var offsetTop = getOffsetTop(el);

    offsetsArray.push(offsetTop);
    getNavItemByElement(el).addClass('offset-top-' + offsetTop);
  });
}

function getOffsetTop(el) {
    var rect = el.getBoundingClientRect(),
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return Math.round(rect.top + scrollTop);
}

function getNavItemByElement(el){
  return $('nav a[href="#' + $(el).attr('id') + '"]');
}

function findClosestNumber(num, arr) {
  var closest = arr.reduce(function(prev, curr) {
    return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
  });

  return closest;
}

// taken from Underscore.js
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, 
        args = arguments;
        
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    var callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}


$(document).ready(function() {
  init();
});