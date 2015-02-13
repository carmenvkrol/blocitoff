'use strict';

angular
  .module('bloc1App')
  .factory('DayLeftService', [

    function(){

      var privateMembers = {};

      privateMembers.convertDay = function(todos){

        var daysAway = Date.now() - date;

        todos.forEach(function(todo){
          var datems = new Date(todo.date).getTime();
          todo.date = datems;

          for (var i=0; i<8; i++) {
            if ((daysAway) < (i*86400000)) {
              var output = 8-i;
              break;
            }
          }

          todo.date = output;
        });

      };

      return privateMembers;

    }

  ]);