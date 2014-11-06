'use strict';

describe('Service: AuthenticationService', function () {

  // load the service's module
  beforeEach(module('bloc1App'));

  // instantiate service
  var authenticationService;
  beforeEach(inject(function (_AuthenticationService_) {
    authenticationService = _AuthenticationService_;
  }));

  it('publicMembers.isAuthorized should return authorized', function () {
    var result = authenticationService.isAuthorized();
    expect(result).toBe(false);
  });

  it('publicMembers.login should post username and password to /login', function () {
    //$httpBackend.when('POST', '/login')
      //.respond(200, 'Fred');
    //publicMembers.login();

  });

  it('publicMembers.login should set authorized to true after posting to /login', function () {

  });

  it('publicMembers.register should post username, email, and password to /users', function () {


  });

  it('publicMembers.register should set authorized to true after posting to /users', function () {

  });

  it('publicMembers.logout should post to /logout', function () {

  });

  it('publicMembers.logout should set authorized to false after post to /logout', function () {

  });

  it('publicMembers.login should set authorized to false even if doesnt post to /logout', function () {

  });

});