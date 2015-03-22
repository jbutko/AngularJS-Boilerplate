/**
 * 
 * AngularJS Boilerplate
 * @description           Description
 * @author                Jozef Butko // www.jozefbutko.com/resume
 * @url                   www.jozefbutko.com
 * @version               1.0.0
 * @date                  March 2015
 * 
 */
;(function() {


  angular
    .module('boilerplate', [
      'ngRoute',
      'ngSanitize'
    ])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', config]);
    

  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });


    $httpProvider.interceptors.push('authInterceptor');

  }


  angular
    .module('boilerplate')
    .factory('authInterceptor', function($rootScope, $q, LocalStorage, $location) {

      return {

        // intercept every request
        request: function(config) {
          config.headers = config.headers || {};
          return config;
        },

        // Catch 404 errors and redirect everythink
        responseError: function(response) {
          if (response.status === 404) {
            $location.path('/');
            return $q.reject(response);
          } else {
            return $q.reject(response);
          }
        }
      };
    })
    .run(function($rootScope, $location) {

      // put here everything that you need to run on page start

    });


})();
