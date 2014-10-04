'use strict';

var passport = require('passport'),
  User = require('mongoose').model('User'),
  LocalStrategy = require('passport-local').Strategy,
  path = require('path'),
  config = require('../../index');

module.exports = function() {
  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      return done(err, user);
    })
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false);
        }
        if ( password != password ) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )); 

};