'use strict';

angular
  .module('bloc1App')
  .factory('DatemsService', [

    function(){

      var privateMembers = {};

      privateMembers.convertms = function(todos){
        
        for (var i=0; i < todos.length; i++) {
          var newdate = new Date(todos[i].date);
          var datems = newdate.getTime();
          todos[i].date = datems;
          console.log(datems);
        }

      };


      return privateMembers;

    }

  ]);