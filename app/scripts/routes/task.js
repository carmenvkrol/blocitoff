'use strict';

var passport = require('passport');

module.exports = function(app) {

  var tasks = require('../../../app/scripts/expresscontrollers/task');

  app.route('/tasks').get(tasks.toDoIndex);
  app.route('/todos')
      .get(tasks.findToDos)
      .post(tasks.addToDo)
      .put(tasks.archiveToDo);
  app.route('/todos/:id').get(tasks.toDoFindById);


};