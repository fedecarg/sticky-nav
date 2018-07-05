# jQuery StickyNav
A simple, lightweight and performant jQuery plugin to fix a navigation bar and highlight navigation items when scrolling a Single Page Application (SPA).

* Demo 1: http://stickynav.fedecarg.com/
* Demo 2: http://www.fedecarg.com/

![](https://raw.githubusercontent.com/fedecarg/sticky-nav/master/src/images/sticky-nav-screenshot.png)

# Features

* Clickable nav links that smooth scroll to content sections.
* Responsive behavior when clicking nav links perfect for single page applications.
* Highlights which section of the page you're on in the navigation bar.
* Minimal custom CSS so you are free to explore your own unique design options.
* Simple and efficient. It uses a variant of the Binary Search Algorithm to determine the position of an element before binding an event handler to the scroll event.
* Fast and performant. It creates and returns a new, throttled version of the onScroll() event handler when scrolling. It only calls the event handler function once per every given number of milliseconds. Useful for rate-limiting events like scroll and resize.
* There's no need to include bootstrap.bundle.min.js, jquery.waypoints.min.js or any other bloated js library.

# Usage
Simply call `.stickynav()` on any selector targeting a navigation element, for example:

```html
<nav>
  <ul>
    <li><a href="#section1">section 1</a></li>
    <li><a href="#section2">section 2</a></li>
    <li><a href="#section3">section 3</a></li>
    <li><a href="#section4">section 4</a></li>
  </ul>
</nav>
```

```javascript
<script src="js/jquery.sticky-nav-1.1.0.min.js"></script>
<script>
$(function(){
  $('nav').stickynav();
});
</script>
```
