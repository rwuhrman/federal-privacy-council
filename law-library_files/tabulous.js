/*
 * tavulou.js
 * Original author: @aaronlumsden
 * Extented by @lext
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
(function ($) {
  var pluginName = "tabulous",
    defaults = {
      effect: 'scale',
      targetSelector: '> div',
      containerSelector: '.tabs_container'
    },
    cssPrefix = "tabulous-";


  function Plugin(element, options) {
    this.element = element;
    this.$elem = $(this.element);
    this.options = $.extend( {}, defaults, options );
    this.init();
  }

  Plugin.prototype = {

    init: function () {

      var $elem = this.$elem;
      var options = this.options;

      var $links = $elem.find('> ul li');
      var $firstLinks = $links.first();

      var $container = $elem.find(options.containerSelector);
      var $tabs = $container.find(options.targetSelector);


      var tabContent = $tabs.not(':first').not(':nth-child(1)');

      var hideMode;
      if (options.effect == 'scale') {
        hideMode = "hidescale";
      } else if (options.effect == 'slideLeft') {
        hideMode = "hideleft";
      } else if (options.effect == 'scaleUp') {
        hideMode = "hidescaleup";
      } else if (options.effect == 'flip') {
        hideMode = "hideflip";
      }

      tabContent.addClass(cssPrefix+hideMode);

      //var firstdivheight = $tabs.first().outerHeight();

      $container.addClass(cssPrefix+'container').
        addClass(cssPrefix + 'transition');

      $tabs.addClass(cssPrefix+"tab").
        addClass(cssPrefix + 'make_transist');


      //$container.height(firstdivheight + 'px');


      $links.bind('click', function (e) {

        e.preventDefault();

        var effect = options.effect;
        var $this = $(this);
        var targetHref = $this.data('href');
        var $targetTab = $container.find('.' + targetHref);

        var tabRemoveClass, tabAddClass,
          targetRemoveClass, targetAddClass;
        if (effect == 'scale') {
          tabRemoveClass = "showscale";
          tabAddClass = "hidescale";
          targetRemoveClass = "hidescale";
          targetAddClass = "showscale";
        } else if (effect == 'slideLeft') {
          tabRemoveClass = "showleft";
          tabAddClass = "hideleft";
          targetRemoveClass = "hideleft";
          targetAddClass = "showleft";
        } else if (effect == 'scaleUp') {
          tabRemoveClass = "showscaleup";
          tabAddClass = "hidescaleup";
          targetRemoveClass = "hidescaleup";
          targetAddClass = "showscaleup";
        } else if (effect == 'flip') {
          tabRemoveClass = "showflip";
          tabAddClass = "hideflip";
          targetRemoveClass = "hideflip";
          targetAddClass = "showflip";
        }

        var targetTabHeight = $targetTab.outerHeight();

        $container.css('min-height' , targetTabHeight + 'px');
        $links.removeClass('active');
        $this.addClass('active');
        $tabs.removeClass(cssPrefix+'tab-active').
          removeClass(cssPrefix+tabRemoveClass).
          addClass(cssPrefix+tabAddClass);
        $targetTab.removeClass(cssPrefix+targetRemoveClass).
          addClass(cssPrefix+targetAddClass);

        setTimeout(function () {
          $targetTab.outerHeight(targetTabHeight + 'px');
          $targetTab.addClass(cssPrefix + 'tab-active');
        }, 400);


      });

      $firstLinks.trigger('click');

    },

    yourOtherFunction: function (el, options) {
      // some logic
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      new Plugin(this, options);
    });
  };

})(jQuery);