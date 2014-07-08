var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

mongoose.connect('mongodb://localhost/blocitoff');

if(process.env.NODE_ENV === 'production'){
  app.get('/*', express.static(__dirname + '/dist'));
}

else{

  app.get('/*', express.static(__dirname + '/.tmp'));
  app.get('/*', express.static(__dirname + '/app'));
  app.get('/*', express.static(__dirname + '/'));

}

var userSchema = mongoose.Schema({
      username: String,
      email: String,
      password: String
});

var User = mongoose.model('User', userSchema);


//var newUser = new User();
//newUser.username = "carmen";
//newUser.password = "foo";

//newUser.save(function(err) {
  //if (err) {
    //console.log(err);
  //} else {
    //return (newUser);
  //}
//});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(session({ secret: 'foo'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

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



var toDoSchema = new mongoose.Schema({ text: String });

var ToDo = mongoose.model('ToDo', toDoSchema);

app.get('/find', function (req, res) {
  return ToDo.find(function(err, tasks){
    if (err) {
      return console.error(err);
    }
    else {
      return console.log('Not logged in');
    }  
  });
});

app.get('/new', function(req, res) {
  var task = new ToDo ({
    text: 'Feed the cats'
  });
  task.save(function(err) {
    if (err) {
      return console.error(err);
    } 
    else {
      return res.send(task);
    }
  });
});

index = function (req, res) {
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

app.get('/', index);
app.get('/users', index);
app.get('/users/:id', findById);
app.post('/users', addUser);

app.post('/login',
  passport.authenticate('local', { successRedirect: '/new',
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

app.listen(1337);
