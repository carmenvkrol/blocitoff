'use strict';

angular
  .module('bloc1App')
  .factory('AuthenticationService', [

    '$http',

    function($http){

      var publicMembers = {},
          authorized = false;

      publicMembers.isAuthorized = function(){

        return authorized;

      };

      publicMembers.login = function(username, password){

        var promise;

        promise = $http.post('/login', {
          username: username,
          password: password
        });

        promise.then(function(){
          authorized = true;
        });

        return promise;

      };

      publicMembers.register = function(username, email, password){

        var promise;

        promise = $http.post('/users', {
          username: username,
          email: email,
          password: password
        });

        promise.then(function(){

          authorized = true;

        });

        return promise;


      };

      publicMembers.logout = function(){

        var promise;

        promise = $http.post('/logout');

        promise.then(function(){

          authorized = false;

        }, function(){

          authorized = false;

        });

        return promise;

      };


      return publicMembers;


    }

  ]);