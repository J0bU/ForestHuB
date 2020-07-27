'use strict'

// Manera en como deseo registrarme, en este caso localmente.
const LocalStrategy = require('passport-local').Strategy;

// Se importa el modelo User creado.
const User = require('../models/user');


module.exports =  (passport) =>{

	passport.serializeUser(function(user, done) {
      done(null, user._id);
    });

	passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
    });

	// ============= Signup ================
	passport.use('local-signup', new LocalStrategy({

		usernameField: 'email',
		passwordField: 'password', 
		passReqToCallback: true
	}, function(req, email, password, done) {
     // User.findOne won't fire unless data is sent back
     
    
    process.nextTick(function() {

    // find a user whose email is the same as the forms email
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email -create the user
                var newUser = new User();
                let body = req.body;
                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.name = body.name;
                newUser.local.surname = body.surname;
                newUser.local.nick = body.nick;
                // save the user
                newUser.save(function(err) {
                if (err)
                    throw err;
                    return done(null, newUser);
                });
            }
        });    
       });

    }));

    // =================LOCAL LOGIN ======================================

    passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
    }, function(req, email, password, done) { 
        
        // find a user whose email is the same as the forms email
        User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.'));
            console.log(password); // req.flash is the way to set flashdata using connect-flash;
        if (!user.validatePassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        // all is well, return successful user
        return done(null, user);
       });
    }));

};



