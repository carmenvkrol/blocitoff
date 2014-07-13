angular
  .module('bloc1App')
  .controller('ToDoCtrl', [
      '$scope',
      '$http',
      '$location',
      function('$scope', '$http', '$location') {
        $scope.form = {};

        $scope.addToDo = function () {
          $http.post('/tasks', $scope.form).
            success(function(data){
              $location.path('/');
          });
        }

        $http({method: 'jsonp', url:'http://host:1337/tasks?callback=JSON_CALLBACK'})
          .success(function(data, status, headers, config) {
            $scope.todo = data;
          })
          .error(function(data, status, headers, config){

          });


//need functionality so user can delete task when completed


}]);