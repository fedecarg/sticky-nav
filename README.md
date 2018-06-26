# Sticky Navigation Bar
A simple, lightweight and performant jQuery plugin to fix a navigation bar and highlight navigation items when scrolling a Single Page Application (SPA).

# Elevator Pitch
* **Simple solution**: It uses a variant of the Binary Search Algorithm and `Element.getBoundingClientRect()` method to determine the position of an element before binding an event handler to the `scroll` event.

* **Fast and performant**: It creates and returns a new, throttled version of the `onScroll()` event handler when scrolling. It only calls the event handler function once per every given number of milliseconds. Useful for rate-limiting events like `scroll` and `resize`.

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
<script src="js/jquery.sticky-nav-1.0.0.min.js"></script>
<script>
$(function(){
	$('nav').stickynav();
});
</script>
```
