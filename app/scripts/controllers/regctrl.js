//for the registration form on the home page

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

    $http({method: 'jsonp', url:'http://host:1337/users?callback=JSON_CALLBACK'})
      .success(function(data, status, headers, config) {
        $scope.user = data;
      })
      .error(function(data, status, headers, config){

      });

}]);