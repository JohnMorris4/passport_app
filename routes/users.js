var express = require('express'),
router = express.Router(),
expressValidator = require('express-validator'),
mongojs = require ('mongojs');

//Create Database
var db = mongojs('passportjs', ['users']);
//Install bcrypt
var bcrypt=require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//Login Page - GET
router.get('/login', function(req, res){
    res.render('login');
});
//Register Page - GET
router.get('/register', function(req, res){
    res.render('register');
});

//REgister Page - POST
router.post('/register', function(req, res){
    //GET Form Data
    var name            =req.body.name;
    var email           =req.body.email;
    var username        =req.body.username;
    var password        =req.body.password;
    var password2       =req.body.password2;

    //Validation
    req.checkBody('name', 'Name field is Required').notEmpty();
    req.checkBody('email', 'Email field is Required').notEmpty();
    req.checkBody('email', 'Please enter a valid Email Address').isEmail();
    req.checkBody('username', 'Username field is Required').notEmpty();
    req.checkBody('password', 'Password field is Required').notEmpty();
    req.checkBody('password2', 'Confirm Password does not match').equals(req.body.password);

    //Check for errors
    var errors = req.validationErrors();
    if(errors){
        console.log('form has errors');
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            username: username,
            password: password,
            password2: password2
        });
    } else {
        console.log('Success');
    }
});
module.exports = router;