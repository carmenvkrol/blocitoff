'use strict';

describe('Controller: TasksCtrl', function () {

  // load the controller's module
  beforeEach(module('bloc1App'));

  var TasksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TasksCtrl = $controller('TasksCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    
  });
});
