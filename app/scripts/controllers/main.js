'use strict';

/**
 * @ngdoc function
 * @name bloc1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bloc1App
 */
angular.module('bloc1App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
