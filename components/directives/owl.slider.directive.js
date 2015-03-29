;(function() {
  

  'use strict';


  /**
   * Owl slider directive
   *
   * Usage:
   * <div myslider></div>
   *
   * or
   *
   * <myslider></myslider>
   * 
   */
  angular
    .module('boilerplate')
    .directive('myslider', slider);

  function slider() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'AE',
      link: function(scope, element, attrs) {

        scope.$watch(function() {
          angular.element(document).ready(function(i) {
            $('.gallery').owlCarousel({
              center: true,
              items: 1,
              singleItem: true,
              itemsScaleUp: false,
              loop: true,
              margin: 0,
              nav: true,
              dots: false,
              autoplay: true,
              navText: ''
            });
          });
        });

        // keyboard navigation
        $(document).keyup(function(i) {
          if (i.keyCode == 37) {
            $('.gallery').trigger('prev.owl.carousel');
          } else if (i.keyCode == 39) {
            $('.gallery').trigger('next.owl.carousel');
          }
        });

      }
    };

    return directiveDefinitionObject;
  }

})();