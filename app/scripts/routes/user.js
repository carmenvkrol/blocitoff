'use strict';

var passport = require('passport');

module.exports = function(app) {

  var users = require('../../../app/scripts/expresscontrollers/user');

  app.route('/login').post(users.login);
  app.route('/logout').post(users.logout);  
  app.route('/users')
      .get(users.index)
      .post(users.addUser);
  app.route('/userid').get(users.userlogin);
  app.route('/users/:id').get(users.findById);

};