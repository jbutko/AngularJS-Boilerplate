;(function() {


  'use strict';

  /**
   * Responsive navigation
   *
   * Usage:
   * <responsive-nav></responsive-nav>
   *
   * Example in main-nav.html file
   * 
   */
  angular.module('boilerplate')
    .directive('responsiveNav', responsiveNav);


  function responsiveNav() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/responsive-nav.html',
      link: function(scope, elem, attrs, ctrl) {
      	elem.on('click', function(e) {
      		$('.responsive-wrapper').slideToggle( 150, 'swing');
          e.preventDefault();
      	});
      }
    };

    return directiveDefinitionObject;
  }


})();