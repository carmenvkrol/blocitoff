/*** DEPENDENCIES ***/
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');


/*** DB ***/
mongoose.connect('mongodb://localhost/blocitoff');


/*** MONGOOSE VARIABLES ***/

//User Variable
var userSchema = mongoose.Schema({
      username: String,
      email: String,
      password: String,
      todos: [taskSchema]
});

var User = mongoose.model('User', userSchema);

//ToDo Variable
var taskSchema = new mongoose.Schema({ 
        task: String,
        date: {type: Date, default: Date.now}
});

var Task = mongoose.model('Task', taskSchema);



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

/*app.get('./tasks#/', function(req, res){
  res.sendfile('./app/views/tasks.html');
});*/



/***CONFIGURATIONS***/
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(session({ secret: 'foo'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


/***FUNCTIONS***/

//Passport for Sign In
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    return done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if ( password != password ) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
)); 

//Registration Form Functions

index = function (req, res) {
  console.log('index');
  return User.find(function (err, users){
    if (!err) {
      res.jsonp(users);
    } else {
      console.log(err);
    }
  });
}

findById = function (req, res) {
  return User.findById(req.params.id, function (err, user){
    if (!err) {
      res.jsonp(user);
    } else {
      console.log(err);
    }
  });
}

addUser = function (req, res) {
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
}

//ToDo Functions
toDoIndex = function (req, res) {
  console.log("hello");
  return Task.find(function (err, todos){
    if (!err) {
      res.jsonp(todos);
    } else {
      console.log(err);
    }
  });
}

toDoFindById = function (req, res) {
  return Task.findById(req.params.id, function (err, todos){
    if (!err) {
      res.jsonp(todos);
    } else {
      console.log(err);
    }
  });
}


addToDo = function (req, res) {
  var todo;

  todo = new Task ({

      task:req.body.task,
      date:req.body.date

  });

  todo.save(function (err) {

    if (!err) {
      console.log('created');
    } else {
      console.log(err);
    }

  });
  return res.send(todo);//not sure if will send to correct user document
}


/*** ROUTES ***/

//Sign In Routes

app.post('/login',
  passport.authenticate('local', { successRedirect: '/#/tasks',
                                   failureRedirect: '/',
                                 })
);

/*
app.post('/login', function(req, res) {
  console.log("here now");
  passport.authenticate('local', function (err, user) {
    console.log("got this far with error: " + err);
    res.send("done");
  })(req,res);
});*/

//Registration Form Routes
//app.get('/', index);
app.get('/users', index);
app.get('/users/:id', findById);
app.post('/users', addUser);


//ToDo routes

//not sure if this is going to populate tasks only for that user
app.get('/tasks', toDoIndex);
app.get('/todos', toDoIndex);
app.get('/todos/:id', toDoFindById);

//***app.put for updating data that is more than 7 days old***

app.post('/todos', addToDo);

//app.get('/find', function (req, res) {
  //return ToDo.find(function(err, tasks){
    //if (err) {
      //return console.error(err);
    //}
    //else {
      //return console.log('Not logged in');
    //}  
  //});
//});

//app.get('/new', function(req, res) {
  //var task = new ToDo ({
    //text: 'Feed the cats'
  //});
  //task.save(function(err) {
    //if (err) {
      //return console.error(err);
    //} 
    //else {
      //return res.send(task);
    //}
  //});
//});


/*** LOCAL SERVER ***/
app.listen(1337);
