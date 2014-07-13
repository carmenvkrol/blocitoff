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
      /*.when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'ToDoCtrl'
      })*/
      .when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksCtrl'
      })
      .otherwise({
        redirectTo: '/fail'
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
    };

    

}]);

angular
  .module('bloc1App')
  .controller('TaskTableCtrl', [
        '$http',
        '$scope',
        function($http, $scope) {
        $http.jsonp('http://localhost:1337/todos?callback=JSON_CALLBACK')
          .success(function(data) {
            console.log('grabbing todos');
            $scope.todos = data;
          })
          .error(function(data){
            console.log('not getting todos');
          });

    }]);


/*angular
  .module('bloc1App')
  .controller('TasksCtrl', [
      '$scope',
      '$http',
      '$location',
      function($scope, $http, $location) {
        $scope.form = {};

        $scope.addToDo = function () {
          $http.post('/tasks', $scope.form).
            success(function(data){
              $location.path('/');
          });
        }

        $http({method: 'jsonp', url:'http://host:1337/todos?callback=JSON_CALLBACK'})
          .success(function(data, status, headers, config) {
            $scope.todo = data;
          })
          .error(function(data, status, headers, config){

          });


//need functionality so user can delete task when completed


}]);*/