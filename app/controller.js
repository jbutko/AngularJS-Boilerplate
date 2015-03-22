/**
 * Main controller
 */
;(function() {

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['$location', '$scope', 'LocalStorage', 'QueryService', '$routeParams',
    '$sce'
  ];


  function MainController($location, $scope, LocalStorage, QueryService,
    $routeParams, $sce) {

    var self = this;


    ////////////  function definitions


    /**
     * Load themes from WP API
     * @return {Object} Object with themes
     */
    QueryService.query('GET', 'posts', {}, {})
      .then(function(ovocie) {
        self.ovocie = ovocie.data;
      });
  }


})();
