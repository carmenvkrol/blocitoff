'use strict';

var mongoose = require('mongoose'),
  passport = require('passport'),
  User = mongoose.model('User'),
  Task = mongoose.model('Task');


exports.toDoIndex = function (req, res) {
  return Task.find(function (err, todos){
    if (!err) {
      res.json(todos); //jsonp
    } else {
      console.log(err);
    }
  });
};

exports.toDoFindById = function (req, res) {
  return Task.findById(req.params.id, function (err, todos){
    if (!err) {
      res.json(todos); //jsonp
    } else {
      console.log(err);
    }
  });
};

exports.findToDos = function (req, res) {
    if (!req.user) {
      console.log('user is not logged in');
      res.json([]);//jsonp
    }

    Task.find({'userid': req.user.id}, function (err, todos) {
      if (!err) {
        res.json(todos);
      } else {
        console.log(err);
      }
    });
  };


exports.addToDo = function (req, res) {
  var todo;
  if (!req.user) {
    console.log('user not logged in');
  }

  todo = new Task ({

      userid:req.user.id,
      task:req.body.task,
      status: 'current'

  });

  todo.save(function (err, todo) {

    if (!err) {
    
      res.json(todo); //jsonp
      
      console.log('created');

    } else {
      console.log(err);
    }

  });
};

exports.archiveToDo = function (req, res) {
  return Task.findById(req.body._id, function(err, todo){
      //todo.status = 'archive';
      if(err){
        return req.send(err);
      }

      todo.status = 'archive';

      console.log(todo);

      todo.save(function(err) {
        if (err) { return next(err); }
      });
      if (!err) {
        console.log('archived');
        res.json(todo); //jsonp
      } else {
        console.log(err);
      }
  });
};