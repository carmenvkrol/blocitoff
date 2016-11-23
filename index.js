/*** DEPENDENCIES ***/
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

//Passport
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

//User Variable
var users = require('./app/scripts/models/user');
var User = require('mongoose').model('User');

//ToDo Variable
var tasks = require('./app/scripts/models/task');
var Task = require('mongoose').model('Task');

/*** DB ***/
var MONGOHQ_URL="mongodb://"+process.env.MONGOHQ_UN+":"+process.env.MONGOHQ_PW+"@candidate.21.mongolayer.com:11484,candidate.33.mongolayer.com:11614/app29663006";
var MONGOLOCAL_URL="mongodb://localhost/blocitoff"

mongoose.connect(process.env.NODE_ENV === 'production' ? MONGOHQ_URL : MONGOLOCAL_URL);

app.use(session({
    resave: true,
    saveUninitialized: true,
    extended: true,
    secret: "foo",
}));

/***CONFIGURATIONS***/
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


/***PRODUCTION/DEV ROUTES***/
if(process.env.NODE_ENV === 'production'){
  app.get('/*', express.static(__dirname + '/dist'));
}

else{

  app.get('/*', express.static(__dirname + '/.tmp'));
  app.get('/*', express.static(__dirname + '/app'));
  app.get('/*', express.static(__dirname + '/'));

}

app.get('/#/*', function(req, res){
  res.sendfile('./app/index.html');
});


/***ROUTES & FUNCTIONS***/

//Passport
require('./app/scripts/passport')();

//ToDo routes
require('./app/scripts/routes/task')(app);

//User routes
require('./app/scripts/routes/user')(app);



/***Tasks Archive After 7 Days***/

Task.find({}, function (err, todos){
  var seconds = Date.now();
  var week = 604800000; //604800000 = 1 week

  console.log(todos);

  for (i=0; i < todos.length; i++) {
    var date = new Date(todos[i].date);
    var datems = date.getTime();
    if ((datems + week) < seconds) {
      todos[i].status = "archive"
      todos[i].save(function(err) {
        if (err) { return next(err); }
      });
    }
  }
});

Task.find({}, function (err, todos){
  setInterval(function() {
  var seconds = Date.now();
  var week = 604800000; //604800000 = 1 week

  console.log(todos);

  for (i=0; i < todos.length; i++) {
    var date = new Date(todos[i].date);
    var datems = date.getTime();
    if ((datems + week) < seconds) {
      todos[i].status = "archive"
      todos[i].save(function(err) {
        if (err) { return next(err); }
      });
    }
  }
}, 3600000);//3600000 = 1 hour
});



/*** LOCAL SERVER ***/

if(process.env.NODE_ENV !== 'production'){
    app.listen(1337);
} else {
  var port = process.env.PORT || CONFIG.port;
  app.listen(port);
}
