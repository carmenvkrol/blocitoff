'use strict';

var mongoose = require('mongoose'),
  passport = require('passport'),
  User = mongoose.model('User'),
  Task = mongoose.model('Task');

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      res.status(401).redirect('/');
      console.log(401);
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/#/tasks');
    });
  })(req, res, next);
};

exports.logout = function(req, res){
  req.logout();
  res.json({
    success: true
  });
};

exports.index = function (req, res) {
  return User.find(function (err, users){
    if (!err) {
      res.json(users);//jsonp
    } else {
      console.log(err);
    }
  });
};

exports.addUser = function (req, res) {
  var user;

  user = new User ({

      username: req.body.username,
      email: req.body.email,
      password: req.body.password

  });

  user.save(function (err) {

    if (!err) {
      console.log('created');
    } else {
      console.log(err);
    }

  });
  return res.send(user);
};

exports.userlogin = function(req, res) {
  if (!req.user) {
    console.log('user is not logged in');
  }
  res.json(req.user.username);
};

exports.findById = function (req, res) {
  return User.findById(req.params.id, function (err, user){
    if (!err) {
      res.json(user);//jsonp
    } else {
      console.log(err);
    }
  });
};