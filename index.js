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
      todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
});

var User = mongoose.model('User', userSchema);

//ToDo Variable
var taskSchema = new mongoose.Schema({ 
        userid: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        task: String,
        status: String,
        date: {type: Date, default: Date.now}
});

var Task = mongoose.model('Task', taskSchema);

//Task.find({}).populate('_userid').exec();
//User.find({}).populate('todos').exec();

//Task.find({}).remove().exec();
//User.find({}).remove().exec();



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
  })
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

      userid:req.body.userid,
      task:req.body.task,
      status: "current"

  });

  todo.save(function (err, todo) {

    if (!err) {
    
      res.json(todo);//not sure if will send to correct user document
      
      console.log('created');

    } else {
      console.log(err);
    }

  });
}

deleteToDo = function (req, res) {
  return Task.findById( req.params.id, function(err, todo){
    return todo.remove(function(err){
      if (!err) {
        console.log('removed');
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
}


/*** ROUTES ***/

//Sign In/Sign Out Routes

app.post('/login',
  passport.authenticate('local', { successRedirect: '/#/tasks',
                                   failureRedirect: '/',
                                 })
);
app.post('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//Registration Form Routes
//app.get('/', index);
app.get('/users', index);
app.get('/users/:id', findById);
app.post('/users', addUser);


//ToDo routes

//not sure if this is going to populate tasks only for that user
app.get('/tasks', toDoIndex);
//app.get('/todos', toDoIndex);
app.get('/todos', function (req, res) {
  console.log("hello");
  return Task.find(function (err, todos){

    setInterval(function() {
      var seconds = Date.now();
      var week = 86400000;

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
    }, 3600000); //3600000 = 1 hour

    if (!err) {
      res.jsonp(todos);
    } else {
      console.log(err);
    }
  });
  time;
});

app.get('/todos/:id', toDoFindById);

//***app.put for updating data that is more than 7 days old***

app.post('/todos', addToDo);
app.delete('/todos/:id', deleteToDo);

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
