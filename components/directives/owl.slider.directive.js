;(function() {

  'use strict';


  angular.module('boilerplate')
    .directive('myslider', slider);

  function slider() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'A',
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
                //onTransitionEnd: center
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