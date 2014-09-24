/*** DEPENDENCIES ***/
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var MONGOHQ_URL="mongodb://carmen.krol@gmail.com:Ickoness618@kahana.mongohq.com:10025/app29663006";


/*** DB ***/

mongoose.connect(process.env.MONGOHQ_URL);

//mongoose.connect('mongodb://localhost/blocitoff');


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
        userid: String,
        task: String,
        status: String,
        date: {type: Date, default: Date.now}
});

var Task = mongoose.model('Task', taskSchema);



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
app.use(session({ secret: "foo"}));
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
        return done(null, false);
      }
      if ( password != password ) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
)); 


//Registration Form Functions

index = function (req, res) {
  return User.find(function (err, users){
    if (!err) {
      res.json(users);//jsonp
    } else {
      console.log(err);
    }
  });
}

findById = function (req, res) {
  return User.findById(req.params.id, function (err, user){
    if (!err) {
      res.json(user);//jsonp
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


toDoIndex = function (req, res) {
  return Task.find(function (err, todos){
    if (!err) {
      res.json(todos); //jsonp
    } else {
      console.log(err);
    }
  });
}

toDoFindById = function (req, res) {
  return Task.findById(req.params.id, function (err, todos){
    if (!err) {
      res.json(todos); //jsonp
    } else {
      console.log(err);
    }
  });
}


addToDo = function (req, res) {
  var todo;
  if (!req.user) {
    console.log('user not logged in');
  }

  todo = new Task ({

      userid:req.user.id,
      task:req.body.task,
      status: "current"

  });

  todo.save(function (err, todo) {

    if (!err) {
    
      res.json(todo); //jsonp
      
      console.log('created');

    } else {
      console.log(err);
    }

  });
}

archiveToDo = function (req, res) {
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
}


/*** ROUTES ***/

//Sign In/Sign Out Routes

/*app.post('/login',
  passport.authenticate('local', { successRedirect: '/#/tasks',
                                   failureRedirect: '/',
                                 })
);*/


app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      res.status(401).redirect('/');
      console.log(401);
      //return res.redirect('/'); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/#/tasks');
    });
  })(req, res, next);
});

/*app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
  function(req, res, next) {
    // issue a remember me cookie if the option was checked
    if (!req.body.remember_me) { return next(); }

    var token = utils.generateToken(64);
    Token.save(token, { userId: req.user.id }, function(err) {
      if (err) { return done(err); }
      res.cookie('remember_me', token, { path: '/#/tasks', httpOnly: true, maxAge: 604800000 }); // 7 days
      return next();
    });
  },
  function(req, res) {
    res.redirect('/#/tasks');
  });*/

app.post('/logout', function(req, res){
  //res.clearCookie('remember_me');
  req.logout();
  res.json({
    success: true
  });
  //res.redirect('/');
});

//Registration Form Routes
app.get('/users', index);
app.get('/userid', function(req, res) {
  if (!req.user) {
    console.log('user is not logged in');
  }
  res.json(req.user.username);//jsonp
});
app.get('/users/:id', findById);
app.post('/users', addUser);


//ToDo routes

app.get('/tasks', toDoIndex);
app.get('/todos', function (req, res) {
  if (!req.user) {
    console.log('user is not logged in');
    res.json([]);//jsonp
  }
  console.log("hello");

  Task.find({'userid': req.user.id}, function (err, todos){

    /*var response = [];

    var i;

    for(i in todos){
      
      if(todos[i].status !== 'archive'){

        response.push(todo[i]);

      }
    
    }*/

    if (!err) {
      res.json(todos);
    } else {
      console.log(err);
    }

  });

});


app.get('/todos/:id', toDoFindById);
app.post('/todos', addToDo);
app.put('/todos', archiveToDo);



/*** LOCAL SERVER ***/
app.listen(1337);
