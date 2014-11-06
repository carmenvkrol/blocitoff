'use strict';

describe('Service: DatemsService', function () {

  // load the service's module
  beforeEach(module('bloc1App'));

  // instantiate service
  var datemsService;
  beforeEach(inject(function (_DatemsService_) {
    datemsService = _DatemsService_;
  }));

  it('privateMembers.convertms should convert date into milliseconds', function () {
    var todos = [
      {
        date: '2014-11-06T01:29:49.201Z'
      }
    ];
    datemsService.convertms(todos);
    expect(todos).toEqual([{date: 1415237389201}]);
  });

});