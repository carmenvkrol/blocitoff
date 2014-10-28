'use strict';

describe('Service: AuthenticationService', function () {

  // load the service's module
  beforeEach(module('bloc1App'));

  // instantiate service
  var authenticationService;
  beforeEach(inject(function (_AuthenticationService_) {
    authenticationService = _AuthenticationService_;
  }));

  it('publicMembers.login should login user', function () {
    //$httpBackend.when('POST', '/login')
      //.respond(200, 'Fred');
    //publicMembers.login();

  });

});