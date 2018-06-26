/*!============================================================
 * sticky-nav.js v1.0.0
 * Copyright (c) 2018 Federico Cargnelutti <fedecarg@gmail.com>
 * http://www.fedecarg.com/
 ============================================================*/

(function($) {

  const DEFAULT_SELECTORS = {
    navSelector:       'nav',          // Navbar container id, class or tag selector
    navLinkSelector:   'nav a',        // Navbar link id, class or tag selector
    navActiveClass:    'active',       // Selected nav item modifier class
    navStickyClass:    'sticky',       // Sticky nav modifier class
    sectionSelector:   'section'       // Section id, class or tag selector
  };

  $.fn.stickyNavbar = (options) => {

    // Merge options with defaults
    const selectors = $.extend({}, DEFAULT_SELECTORS, options);

    // Set jQuery DOM elements
    const $navbarContainer = $(selectors.navSelector),
          $navbarLinks = $(selectors.navLinkSelector),
          $sections = $(selectors.sectionSelector);
    
    const navbarHeight = $(selectors.navSelector).height();

    let currentScrollPosition = 0,
          sectionOffsetArray = [];      


    function initialise() {
      calculateOffsets();
      bindEvents();
    }

    function bindEvents() {
      $navbarLinks.on('click', onClick);
      $(window).on('scroll', throttle(onScroll, 50));
    }

    function onClick(e) {
      e.preventDefault();
      const targetEl = $(this).attr('href');

      if ($(targetEl).length) {
        selectNavItem(this);

        if (window.scroll) {
          window.scroll({
            top: $(targetEl).offset().top - navbarHeight,
            left: 0,
            behavior: 'smooth'
          });
        } else {
          $('html, body').animate({
            scrollTop: $(targetEl).offset().top - navbarHeight
          });
        }
      }
    }

    function onScroll() {
      var scrollTop = $(document).scrollTop() + navbarHeight,
          closestPosition = findClosestNumber(scrollTop, sectionOffsetArray);

      // select navbar item
      if (closestPosition !== currentScrollPosition) {
        selectNavItem('.section-offset-' + closestPosition);
        currentScrollPosition = closestPosition;
      }

      // fix position of navbar
      if (scrollTop > ($sections.first().height() / 2)) {
        $navbarContainer.addClass(selectors.navStickyClass);
      } else {
        $navbarContainer.removeClass(selectors.navStickyClass);
      }
    }

    function calculateOffsets() {
      $sections.each(function(index) {
        const el = $(this)[0];
        const offsetTop = getOffsetTop(el);

        sectionOffsetArray.push(offsetTop);
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
      $navbarLinks.removeClass(selectors.navActiveClass);
      $(el).addClass(selectors.navActiveClass);
    }

    function findClosestNumber(num, arr) {
      return arr.reduce(function(prev, curr) {
        return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
      });
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