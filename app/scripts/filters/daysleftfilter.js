'use strict';

/**
 * @ngdoc filter
 * @name bloc1App.filter:daysleftFilter
 * @function
 * @description
 * # daysleftFilter
 * Filter in the bloc1App.
 */
angular.module('bloc1App')
  .filter('daysleftFilter', function () {
    return function (date) {
      var seconds = Date.now();
      var output;
      var daysAway = seconds - date;

      for (var i=0; i<8; i++) {
        if ((daysAway) < (i*86400000)) {
          output = 8-i;
          break;
        }
      }

      return output;
    };
  });
