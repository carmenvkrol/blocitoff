'use strict';

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
      $http
        .post('/users', $scope.form)
        .success(function(){
          $location.path('/');
        });
    };

}]);