'use strict';

describe('AuthenticationService', function () {

  // load the service's module
  beforeEach(module('bloc1App'));

  // instantiate service
  var authenticationService
      $httpBackend;

  beforeEach(inject(function($injector, $httpBackend) {
    authenticationService = $injector.get('AuthenticationService');
    $httpBackend = $httpBackend;
  }));

  it('publicMembers.isAuthorized should return authorized', function () {
    var result = authenticationService.isAuthorized();
    expect(result).toBe(false);
  });

  it('publicMembers.login should post username and password to /login and set authorized to true', function () {
    var sampleUserPostDataResponse = {
        _id: '525cf20451979dea2c000001',
        username: 'foo',
        email: 'foo@foo.com',
        password: 'foo'
      };

    $httpBackend.expectPOST('/login', {
      username: 'foo',
      password: 'foo'
    })
    .response(sampleUserPostDataResponse);

    authenticationService.login('foo', 'foo');
    $httpBackend.flush();

    //$httpBackend.when('POST', '/login')
      //.respond(200, 'Fred');
    //publicMembers.login();

  });


  it('publicMembers.register should post username, email, and password to /users and set authorized to true', function () {


  });



  it('publicMembers.logout should post to /logout and set authorized to false', function () {

  });


});