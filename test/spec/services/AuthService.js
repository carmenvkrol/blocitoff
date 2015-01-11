'use strict';

describe('AuthenticationService', function () {

  // load the service's module
  beforeEach(module('bloc1App'));

  // instantiate service
  var authenticationService,
      httpBackend;

  beforeEach(inject(function($injector, $httpBackend) {
    authenticationService = $injector.get('AuthenticationService');
    httpBackend = $httpBackend;
  }));

  it('publicMembers.isAuthorized should return authorized', function () {
    var result = authenticationService.isAuthorized();
    expect(result).toBe(false);
  });

  it('publicMembers.login should post username and password to /login and set authorized to true', function () {


  });


  it('publicMembers.register should post username, email, and password to /users and set authorized to true', function () {


  });



  it('publicMembers.logout should post to /logout and set authorized to false', function () {

  });


});