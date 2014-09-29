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

      if ((seconds - date) < (86400000)) {
        output = 7;
      } else if ((seconds - date) < (2*86400000)) {
        output = 6;
      } else if ((seconds - date) < (3*86400000)) {
        output = 5;
      } else if ((seconds - date) < (4*86400000)) {
        output = 4;
      } else if ((seconds - date) < (5*86400000)) {
        output = 3;
      } else if ((seconds - date) < (6*86400000)) {
        output = 2;
      } else if ((seconds - date) < (7*86400000)) {
        output = 1;
      } else if ((seconds - date) < (8*86400000)) {
        output = 0;
      }

      return output;
    };
  });
