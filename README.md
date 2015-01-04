blocitoff app
=============

Single-page app built with [AngularJS](https://angularjs.org/), [Express](http://expressjs.com/), [Mongoose](http://mongoosejs.com/), and [Node.js](http://nodejs.org/) using the [Yeoman Angular scaffolding](https://github.com/yeoman/generator-angular).

Users can create an account in which they add tasks and delete them when completed.  The tasks will self-destruct after 7 days if not completed. 

Here's the [demo] (https://blocitoff-cvk.herokuapp.com/#/).



Configuration
------------
Configuring this project should be consistent across Mac (local) and Vagrant.  You should already have [Node.js](http://nodejs.org) and [MongoDB](http://www.mongodb.org/) installed before cloning.

Start by cloning the repository
```
$ git clone https://github.com/carmenvkrol/blocitoff.git
```

This app uses [Grunt](http://gruntjs.com/) to run tasks.  Install the Grunt Command Line Interface (`grunt-cli`) locally on your machine.
```
$ npm install -g grunt-cli
```

Once that's complete, install the remaining dependencies, except Bower, by running
```
$ npm install
```

Then install Bower by running:
```
$ bower install
```


Running the Application
------------
Three tabs must be open in the terminal in order to run this application.

In the first tab, run

```
$ mongod
```

In the second tab, run

```
$ npm start
```

In the last tab, run

```
$ grunt serve
```

The application runs on port 1337 (configured in [Gruntfile.js](https://github.com/carmenvkrol/blocitoff/blob/master/gruntfile.js)).  To change the port, modify the number highlighted below
```
...
 connect: {
      options: {
        port: 1337, // change this value to the desired port number
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
...

```


Directory Structure and Grunt
------------
```
blocitoff/
 |__.tmp/
 |__app/ #client-side development and server-side files
 |__bower_components/
 |__dist/ #client-side production files
 |__node_modules/
 |__test/
 Gruntfile.js
 index.js/ #core server-side file

```

Grunt looks for files using a defined pattern so that it knows what to compile and copy and where to put it. To edit the files that Grunt watches, look at the array of files in the watch task in [Gruntfile.js](https://github.com/carmenvkrol/blocitoff/blob/master/gruntfile.js). The default watched files are:

```
watch: {
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },
  js: {
    files: ['<%= yeoman.app %>/scripts/{,*/}*.js', '!<%= yeoman.app %>/scripts/expresscontrollers/*.js', '!<%= yeoman.app %>/scripts/models/*.js', '!<%= yeoman.app %>/scripts/passport.js'],
    tasks: ['newer:jshint:all'],
    options: {
      livereload: true //'<%= connect.options.livereload %>'
    }
  },
  jsTest: {
    files: ['test/spec/{,*/}*.js'],
    tasks: ['newer:jshint:test', 'karma']
  },
  styles: {
    files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
    tasks: ['newer:less', 'autoprefixer']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  recess: {
    files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
    tasks: ['recess:dist']
  },

```


LESS
------------
This app uses the CSS pre-processor [LESS](http://lesscss.org/) in order to facilitate styling with [Bootstrap](http://getbootstrap.com/css/), which is included.  LESS files can be found in the styles folder under the app directory. (See Directory Structure section above to locate these).  In order for these files to be converted into CSS, and modify styling in the views, save LESS files within the styles folder.



Login/Register Feature
------------
The client-side files for user authentication, which are used in the [/] (https://github.com/carmenvkrol/blocitoff/blob/master/app/views/AuthView.html) view, are in the app directory within the public directory.  The server-side functionality is also in the app directory within the expresscontrollers folder.  (See Directory Structure section above to locate these).



Task Feature
------------
The client-side functionality for tasks, which are used in the [/tasks](https://github.com/carmenvkrol/blocitoff/blob/master/app/views/tasks.html) view, can be found in the app directory . The server-side functionality is also in the app directory within the expresscontrollers folder. (See Directory Structure section above to locate these). 



Grunt Plugins
------------
A list of the plugins used by Grunt and what they're used for:

**[Grunt](http://gruntjs.com/getting-started)** - installs grunt, which automates many JavaScript tasks

**[Grunt-Autoprefixer](https://github.com/postcss/autoprefixer)** - parses CSS and adds vendor-prefixed CSS properties

**[Grunt-Concurrent](https://github.com/sindresorhus/grunt-concurrent)** - runs grunt tasks concurrently

**[Grunt-Contrib](https://github.com/gruntjs/grunt-contrib)** - collection of common grunt tasks

**[Grunt-Contrib-Clean](https://github.com/gruntjs/grunt-contrib-clean)** - gcleans files and folders

**[Grunt-Contrib-Concat](https://github.com/gruntjs/grunt-contrib-clean)** - concatenates files for production mode

**[Grunt-Contrib-Connect](https://github.com/gruntjs/grunt-contrib-connect)** - starts a static web server

**[Grunt-Contrib-Copy](https://github.com/gruntjs/grunt-contrib-copy)** - copies files and folders for production mode

**[Grunt-Contrib-CSSmin](https://github.com/gruntjs/grunt-contrib-cssmin)** - minifies CSS files for production

**[Grunt-Contrib-HTMLmin](https://github.com/gruntjs/grunt-contrib-htmlmin)** - minifies HTML files for production

**[Grunt-Contrib-Imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)** - minifies image files for production

**[Grunt-Contrib-JShint](https://github.com/gruntjs/grunt-contrib-jshint)** - detects potential errors and problems in the JavaScript code

**[Grunt-Contrib-Less](https://github.com/gruntjs/grunt-contrib-less)** - compiles LESS files into CSS.  See LESS section below for more details about styles in this application.

**[Grunt-Contrib-Uglify](https://github.com/gruntjs/grunt-contrib-uglify)** - compresses and minifies JavaScript files

**[Grunt-Contrib-Watch](https://github.com/gruntjs/grunt-contrib-watch)** - runs predefined tasks whenever watched files patterns are added, changed, or deleted

**[Grunt-Filerev](https://github.com/yeoman/grunt-filerev)** - static asset revisioning through file content hash

**[Grunt-Google-CDN](https://github.com/btford/grunt-google-cdn)** - replaces refs on the Google CDN

**[Grunt-Karma](https://github.com/karma-runner/grunt-karma)** - for running Karma, a test runner for JavaScript. 

**[Grunt-Newer](https://github.com/tschaub/grunt-newer)** - configures grunt tasks to run with newer files only

**[Grunt-Ngmin](https://github.com/btford/grunt-ngmin)** - pre-minifies Angular code

**[Grunt-Recess](https://github.com/sindresorhus/grunt-recess)** - lint and minify CSS and LESS using RECESS, which keeps style code clean and manageable

**[Grunt-SVGmin](https://github.com/sindresorhus/grunt-svgmin)** - minifies SVG files

**[Grunt-Usemin](https://github.com/yeoman/grunt-usemin)** - replaces references to non-optimized scripts or stylesheets into a set of HTML files

**[Grunt-Wiredep](https://github.com/stephenplusplus/grunt-wiredep)** - injects Bower packages into source code

**[Load-Grunt-Tasks](https://github.com/sindresorhus/load-grunt-tasks)** - loads grunt tasks simulataneously instead of individually

**[Time-Grunt](https://github.com/sindresorhus/time-grunt)** - displays elapsed execution time of grunt tasks



Other Packages - FIX FOR THIS APP
------------
A list of other plugins used in this application and their purpose:

**[Express](http://expressjs.com/)** - web framework for Node.js

**[Express-Session](https://github.com/expressjs/session)** - keeps track of users as they go through the app

**[Body-Parser](https://github.com/expressjs/body-parser)** - middleware that parses body data

**[Bower](http://bower.io/)** - package manager

**[Connect-Flash](https://github.com/jaredhanson/connect-flash)** - stores messages during sessions.  These messages are written to the flash and cleared after being displayed to the user.

**[Connect-Mongo](https://github.com/kcbanner/connect-mongo)** - stores relevant user data from MongoDB during session

**[Cookie-Parser](https://github.com/expressjs/cookie-parser)** - parses cookie header and populates req.cookies with an object keyed by the cookie names

**[JSHint-Stylish](https://github.com/sindresorhus/jshint-stylish)** - stylish reporter for JSHint

**[Karma](https://github.com/karma-runner/karma)** - test runner for JavaScript

**[Karma-Jasmine](https://github.com/karma-runner/karma-jasmine)** - adapter for [Jasmine testing framework](http://jasmine.github.io/) to be used with Karma

**[Karma-PhantomJS-Launcher](https://github.com/karma-runner/karma-phantomjs-launcher)** - launches JavaScript in [PhantomJS](http://phantomjs.org/), which is a headless WebKit scriptable with a JavaScript API

**[Mongoose](http://mongoosejs.com/)** - MongoDB object modeling for Node.js

**[Passport](http://passportjs.org/)** - authenticates users based on the credentials they provide

**[Passport-Local](https://github.com/jaredhanson/passport-local)** - username and password authentication

**[Passport-Local-Mongoose](https://github.com/saintedlama/passport-local-mongoose)** - Mongoose plugin the simplifies building username and password login with Passport



Screenshots
------------
![](https://github.com/carmenvkrol/blocitoff/blob/master/blocitoff-screenshot-homepage.png)

------------

![](https://github.com/carmenvkrol/blocitoff/blob/master/blocitoff-screenshot-taskspage.png)


Notes
-----
App built as part of the [Bloc] (http://www.bloc.io) Front-End Developer program.





