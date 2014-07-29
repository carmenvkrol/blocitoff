'use strict';

angular
  .module('bloc1App')
  .controller('TasksCtrl', [
        '$http',
        '$scope',
        '$location',
        '$timeout',
        'AuthenticationService',

        function($http, $scope, $location, $timeout, AuthenticationService) {

          $http
            .get('/userid')
            .success(function(data){

              $timeout(function(){
                data = data.substr(1, data.length - 2);
                $scope.user = data;
              });

            })
            .error(function(){
            });

          $scope.user = {};

          $http
            .get('/todos')
            .success(function(data) {
              
              $timeout(function(){
              
                $scope.todos = data;

                for (var i=0; i < $scope.todos.length; i++) {
                  var newdate = new Date($scope.todos[i].date);
                  var datems = newdate.getTime();
                  console.log(datems);
                  $scope.todos[i].date = datems;
                }

              });
            
            })
            .error(function(){
            });

          $scope.todos = [];


          //86400000 = 1 day

          $scope.form = {};

          $scope.addToDo = function () {
            console.log('add todo function');
            $http.post('/todos', $scope.form).
              success(function(data){
 
                console.log(data);

                $timeout(function(){

                  $scope.todos.push(data);

                  console.log($scope.data);

                  for (var i=0; i < $scope.todos.length; i++) {
                    var newdate = new Date($scope.todos[i].date);
                    var datems = newdate.getTime();
                    console.log(datems);
                    $scope.todos[i].date = datems;
                  }

                  $scope.form = {};

                });

            });
          };

          $scope.archiveToDo = function(todo) {
            console.log('archive todo', todo);
           
            $http.put('/todos', todo)
              .success(function(){
                todo.status = 'archive';
              })
              .error(function(data){
                console.log('error> ', data);
              });
          };

          $scope.logout = function(){

            AuthenticationService.logout().then(function(){
 
              $location.url('/');

            }, function(){

              $location.url('/');

            });

          };
    
    }]);

angular
  .module('bloc1App')
  .filter('daysleftFilter', function(){
    return function(date) {
      var seconds = Date.now();
      var output;

      if ((seconds - date) < (86400000)) {
        output = 7;
      } else if ((seconds - date) < (2*86400000)) {
        output = 6;
      } else if ((seconds - date) < (3*86400000)) {
        output = 5;
      } else if ((seconds - date) < (4*86400000)) {
        output = 4;
      } else if ((seconds - date) < (5*86400000)) {
        output = 3;
      } else if ((seconds - date) < (6*86400000)) {
        output = 2;
      } else if ((seconds - date) < (7*86400000)) {
        output = 1;
      } else if ((seconds - date) < (8*86400000)) {
        output = 0;
      }

      return output;
    };

  });