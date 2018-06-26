# Sticky navigation bar
A simple, lightweight and performant jQuery plugin to fix a navigation bar and highlight navigation items when scrolling a Single Page Application (SPA).

# Usage
Simply call `.stickynav()` on any selector targeting a navigation element, for example:

```
<nav>
  <ul>
    <li><a href="#section1">section 1</a></li>
    <li><a href="#section2">section 2</a></li>
    <li><a href="#section3">section 3</a></li>
    <li><a href="#section4">section 4</a></li>
  </ul>
</nav>

<script src="js/jquery.sticky-nav-1.0.0.min.js"></script>
<script>
$(function(){
	$('nav').stickynav();
});
</script>
```
