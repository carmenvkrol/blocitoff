'use strict';

describe('Controller: AuthCtrl', function () {

  var scope,
      httpBackend,
      location,
      route,
      q,
      rootScope,
      AuthCtrl;

  // load the controller's module
  beforeEach(module('bloc1App'));

  beforeEach(inject(function($controller, $httpBackend, $rootScope, $location, $route, $q) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    q = $q;
    rootScope = $rootScope;
    location = $location;
    route = $route;

    AuthCtrl = $controller('AuthCtrl', {
      $scope: scope,
      $route: route,
      $location: location
    });


  }));

  it('register should send user info to AuthenticationService', function(){
    spyOn(AuthCtrl.AuthenticationService, 'register').andCallThrough();
    scope.register('foo', 'foo@foo.com', 'foo');
    expect(AuthCtrl.AuthenticationService.register).toHaveBeenCalledWith('foo', 'foo@foo.com', 'foo');
  });

  it('register should redirect user to home page and post message in scope', function(){
    httpBackend.expectGET('views/AuthView.html').respond(200);
    var deferred = q.defer();
    spyOn(AuthCtrl.AuthenticationService, 'register').andReturn(deferred.promise);
    spyOn(location, 'url');
    scope.register('foo', 'foo@foo.com', 'foo');
    httpBackend.flush();
    deferred.resolve();
    scope.$apply();
    expect(location.url).toHaveBeenCalledWith('/');
  });

  it('login should use user info and login function from AuthenticationService', function(){
    spyOn(AuthCtrl.AuthenticationService, 'login').andCallThrough();
    scope.login('foo', 'foo');
    expect(AuthCtrl.AuthenticationService.login).toHaveBeenCalledWith('foo', 'foo');
  });

  it('login should redirect user to tasks view', function(){
    httpBackend.expectGET('views/AuthView.html').respond(200);
    var deferred = q.defer();
    spyOn(AuthCtrl.AuthenticationService, 'login').andReturn(deferred.promise);
    spyOn(location, 'url');
    scope.login('foo', 'foo');
    httpBackend.flush();
    deferred.resolve();
    scope.$apply();
    expect(location.url).toHaveBeenCalledWith('/tasks');
  });

});