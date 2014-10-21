'use strict';

describe('Controller: AuthCtrl', function () {

  var scope,
      location,
      q,
      rootScope,
      AuthCtrl;

  // load the controller's module
  beforeEach(module('bloc1App'));

  beforeEach(inject(function($controller, $rootScope, $location, $q) {
    scope = $rootScope.$new();
    q = $q;
    rootScope = $rootScope;
    location = $location;

    AuthCtrl = $controller('AuthCtrl', {
      $scope: scope,
      $location: location
    });


  }));

  it('register should send user info to AuthenticationService', function(){
    spyOn(AuthCtrl.AuthenticationService, 'register').andCallThrough();
    scope.register('foo', 'foo@foo.com', 'foo');
    expect(AuthCtrl.AuthenticationService.register).toHaveBeenCalledWith('foo', 'foo@foo.com', 'foo');
  });

  it('register should redirect user to home page and post message in scope', function(){
    //THIS TEST IS NOT FINISHED
    //spyOn(AuthCtrl.AuthenticationService, 'register').andReturn(promise);
    scope.register('foo', 'foo@foo.com', 'foo');
  });

  it('login should use user info and login function from AuthenticationService', function(){
    spyOn(AuthCtrl.AuthenticationService, 'login').andCallThrough();
    scope.login('foo', 'foo');
    expect(AuthCtrl.AuthenticationService.login).toHaveBeenCalledWith('foo', 'foo');
  });

  it('login should redirect user to tasks view', function(){
    //THIS TEST IS NOT FINISHED, HAVING PROBLEMS
    var deferred = q.defer();
    spyOn(AuthCtrl.AuthenticationService, 'login').andReturn(deferred.promise);
    spyOn(location, 'url');
    scope.login('foo', 'foo');
    deferred.resolve();
    expect(location.url).toHaveBeenCalled();
  });

});