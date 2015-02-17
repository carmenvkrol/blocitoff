'use strict';

angular
  .module('bloc1App')
  .factory('DayLeftService', [

    function(){

      var privateMembers = {};

      privateMembers.convertDay = function(todos){ 

          todos.forEach(function(todo){
            var datems = new Date(todo.date).getTime();
            var daysAway = Date.now() - datems;
            var output;

            for (var i=0; i<8; i++) {
              if (daysAway < (i*86400000)) {
                output = 8-i;
                break;
              }
            }

            todo.date = output;

          });

          return todos;
      };

      return privateMembers;

    }

  ]);