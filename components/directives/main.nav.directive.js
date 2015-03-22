;(function() {

  'use strict';

  /**
   * Main navigation, just a HTML template
   * @author Jozef Butko
   * @ngdoc  Directive
   *
   * @example
   * <input type="text" clear-input/>
   *
   */
  angular.module('boilerplate')
    .directive('mainNav', tinMainNav);

  function tinMainNav() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/main-nav.html'
    };

    return directiveDefinitionObject;
  }

})();