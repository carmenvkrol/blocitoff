'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var taskSchema = new mongoose.Schema({ 
        userid: String,
        task: String,
        status: String,
        date: {type: Date, default: Date.now}
});

mongoose.model('Task', taskSchema);