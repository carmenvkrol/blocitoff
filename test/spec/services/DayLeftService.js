'use strict';

describe('DayLeftService', function () {

  // load the service's module
  beforeEach(module('bloc1App'));

  // instantiate service
  var dayLeftService;
 
  beforeEach(inject(function($injector) {
    dayLeftService = $injector.get('DayLeftService');
  }));

  it('should have convertDay function', function() {
    expect(angular.isFunction(dayLeftService.convertDay)).toBe(true);
  });

  it('convertDay should convert date into days left', function () {
    var todos = [
      {
        date: '2015-02-13T05:57:23.287Z'
      }
    ];
    spyOn(Date, 'now').andReturn(1424142607688);

    var result = dayLeftService.convertDay(todos);
    
    expect(result).toEqual([{date:4}]);
  });

});