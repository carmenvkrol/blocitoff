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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
