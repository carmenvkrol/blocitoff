'use strict';

angular
  .module('bloc1App')
  .controller('TasksCtrl', [
        '$http',
        '$scope',
        '$location',
        '$timeout',

        function($http, $scope, $location, $timeout) {

          $http
            .jsonp('/todos?callback=JSON_CALLBACK')
            .success(function(data) {
              
              $timeout(function(){
              
                $scope.todos = data;

              });
            
            })
            .error(function(){
            });

          $scope.todos = [];

          $scope.form = {};

          $scope.addToDo = function () {
            console.log('add todo function');
            $http.post('/todos', $scope.form).
              success(function(data){

                $timeout(function(){

                  $scope.todos.push(data);

                  console.log($scope.data);

                  $scope.$digest();

                });

            });
          };

          /*$scope.deleteToDo = function() {
            $http.delete('/todos/:id', $scope.todo)
              .success(function(data) {
                $location.path('/tasks');
              })
              .error(function(data){
              });
          }; */
    
    }]);