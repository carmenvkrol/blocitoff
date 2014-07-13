'use strict';

/**
 * @ngdoc function
 * @name bloc1App.controller:TasksCtrl
 * @description
 * # TasksCtrl
 * Controller of the bloc1App
 */
angular.module('bloc1App')
  .controller('TasksCtrl', [
      '$scope',
      '$http',
      '$location',
      function($scope, $http, $location) {
        $scope.form = {};

        $scope.addToDo = function () {
          $http.post('/todos', $scope.form).
            success(function(data){
              $location.path('/tasks');
          });
        }

  }]);