'use strict';

describe('Controller: TasksCtrl', function () {

  // load the controller's module
  beforeEach(module('bloc1App'));

  var TasksCtrl,
    scope,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    TasksCtrl = $controller('TasksCtrl', {
      $scope: scope
    });
  }));

  /*it('should make get request to /userid', function () {
    
  });

  it('get request to /userid should get user data', function () {
    
  });

  it('should make get request to /todos', function () {
    
  });

  it('get request to /todos should get todos data', function () {
    
  });

  it('get request to /todos should convert DatemsService.convertms', function () {
    
  });

  it('addToDo should make a post request to /todos', function () {
    
  });

  it('addToDo should push data onto todos', function () {
    
  });

  it('addToDo should call DatemsService.convertms', function(){

  });

  it('archiveToDo should make put request to /todos', function(){

  });

  it('archiveToDo should change todo status to archive', function(){

  });

  it('logout should call AuthenticationService.logout', function() {

  });

  it('logout should redirect user to home page', function(){

  });*/

});
