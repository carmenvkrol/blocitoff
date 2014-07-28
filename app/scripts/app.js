'use strict';

/**
 * @ngdoc overview
 * @name bloc1App
 * @description
 * # bloc1App
 *
 * Main module of the application.
 */
angular
  .module('bloc1App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/AuthView.html',
        controller: 'AuthCtrl'
      })
      .when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      var interceptor = ['$rootScope', '$q', function (scope, $q, $location) {

        function success(response) {
            return response;
        }

        function error(response) {
            var status = response.status;

            if (status === 401) {
                $location.path = '/';
                window.alert('Wrong username and/or password.');
                return;
            }
            return $q.reject(response);

        }

        return function (promise) {
            return promise.then(success, error);
        };

    }];
    $httpProvider.responseInterceptors.push(interceptor);

  })
  .run([

    '$rootScope',
    '$location',
    'AuthenticationService',

    function($rootScope, $location, AuthenticationService){

      $rootScope.$on('$routeChangeStart', function(e, data){

        if(data.$$route.redirectTo !== '/' && !AuthenticationService.isAuthorized()){

          e.preventDefault();

          $location.url('/');

        }

      });

    }

  ]);