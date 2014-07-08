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
        controller: 'RegCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


angular
  .module('bloc1App')
  .controller('RegCtrl', [
    '$scope',
    '$http',
    '$location',
    function($scope, $http, $location) {
    $scope.form = {};

    $scope.addUser = function () {
      $http.post('/users', $scope.form).
          success(function(data){
            $location.path('/');
          });
    }

    $http({method: 'jsonp', url:'http://host:1337/users?callback=JSON_CALLBACK'})
      .success(function(data, status, headers, config) {
        $scope.user = data;
      })
      .error(function(data, status, headers, config){

      });

}]);
