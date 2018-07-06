/*!============================================================
 * jquery.sticky-nav.js
 * Copyright (c) Federico Cargnelutti <fedecarg@gmail.com>
 * http://www.fedecarg.com/
 ============================================================*/

(function($) {

  $.fn.stickynav = function(options) {

    const DEFAULT_SELECTORS = {
      navActiveClass:    'active',   // Selected nav item modifier class
      navStickyClass:    'sticky',   // Sticky nav modifier class
      sectionSelector:   'section'   // Section id, class or tag selector
    };

    // Merge options with defaults
    options = $.extend({}, DEFAULT_SELECTORS, options);

    // Set jQuery DOM elements
    const $nav = this;
    const $navLinks = $nav.find('a');
    const $sections = $(options.sectionSelector);

    const navHeight = $nav.height();
    const scrollTopOffset = $sections.first().height() / 2;

    let currentScrollPosition = 0;
    let offsetNumbers = [0];


    function initialise() {
      calculateOffsets();
      bindEvents();
    }

    function bindEvents() {
      $navLinks.on('click', onClick);
      $(window).on('scroll', throttle(onScroll, 20));
    }

    function onClick(e) {
      e.preventDefault();
      const targetEl = $(this).attr('href');

      if ($(targetEl).length) {
        selectNavItem(this);

          $('html, body').animate({
            scrollTop: $(targetEl).offset().top - navHeight
          });
        }
    }

    function onScroll() {
      var scrollTop = $(document).scrollTop() + navHeight,
          closestPosition = findClosestNumber(scrollTop, offsetNumbers);

      // select navbar item
      if (closestPosition !== currentScrollPosition) {
        selectNavItem('.section-offset-' + closestPosition);
        currentScrollPosition = closestPosition;
      }

      // fix navbar
      if (scrollTop > scrollTopOffset) {
        $nav.addClass(options.navStickyClass);
      } else {
        $nav.removeClass(options.navStickyClass);
      }
    }

    function findClosestNumber(num, arr) {
      return arr.reduce(function(prev, curr) {
        return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
      });
    }

    function calculateOffsets() {
      $sections.each(function(index) {
        const el = $(this)[0];
        const offsetTop = getOffsetTop(el);

        offsetNumbers.push(offsetTop);
        getNavItem(el).addClass('section-offset-' + offsetTop);
      });
    }

    function getOffsetTop(el) {
        const rect = el.getBoundingClientRect(),
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return Math.round(rect.top + scrollTop);
    }

    function getNavItem(el) {
      return $('nav a[href="#' + $(el).attr('id') + '"]');
    }

    function selectNavItem(el) {
      if (!$nav.hasClass(options.navStickyClass)) {
        $nav.addClass(options.navStickyClass);
      }

      $navLinks.removeClass(options.navActiveClass);
      $(el).addClass(options.navActiveClass);
    }

    function throttle(func, delay) {
      let timer = 0;

      return function() {
        const context = this,
        args = [].slice.call(arguments);

        clearTimeout(timer);
        timer = setTimeout(function() {
          func.apply(context, args);
        }, delay);
      };
    }

    initialise();
  };

}(jQuery))
;