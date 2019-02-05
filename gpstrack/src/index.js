const express = require('express'); // Framework
const exphbs = require('express-handlebars'); // Template engine
const path = require('path');
const methodOverride = require('method-override'); // Extends REST API
const session = require('express-session'); // Authorization
const flash = require('connect-flash'); // Inter-views messaging
const passport = require('passport'); // Authentication

// Initializations
const app = express(); // Express
require('./database'); // MongoDB
require('./config/passport'); //Auntenticación
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
module.exports = io;

//Socket.io
//io.set('origins', 'http://localhost:4000');
//io.on('connection', function(socket){
 // console.log('a user connected to Socket');
  //socket.on('disconnect', function(){
  //console.log('user disconnected');
  //});
//});

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false})); 
app.use(methodOverride('_method')); //Hidden inputs
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(require('./routes'));
app.use(require('./routes/users'));
app.use(require('./routes/maps'));
app.use(require('./routes/points'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
http.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

