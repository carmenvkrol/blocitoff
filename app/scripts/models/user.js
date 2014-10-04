'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var userSchema = mongoose.Schema({
      username: String,
      email: String,
      password: String,
      todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
});

mongoose.model('User', userSchema);
