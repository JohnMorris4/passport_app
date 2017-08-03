var express = require ('express'),
path =require ('path'),
expressValidator = require ('express-validator'),
session = require ('express-session'),
passport = require ('passport'),
LocalStrategy = require ('passport-local'),
bodyParser = require ('body-parser'),
flash = require ('connect-flash');

//Routes Files
var routes = require ('./routes/index');
var users = require ('./routes/users');

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Express Session Middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
//cconnect-flash Middleware
app.use (flash());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Define Routes
app.use('/', routes);
app.use('/users', users);

app.listen(3000);
console.log('Server Started on port 3000');