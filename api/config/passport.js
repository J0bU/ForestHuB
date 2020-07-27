'use strict'

// Manera en como deseo registrarme, en este caso localmente.
const localStrategy = require('passport-local').Strategy;

// Se importa el modelo User creado.
const User = require('../models/user');


module.exports =  (passport) =>{

	passport.serializeUser((user, done) => {

		done(null, user.id);

	});

	passport.deserializeUser((id, done) => {

		User.findById(id, (error, user) => {
			done(error, user);
		});
	}); 

	// ============= Signup ================
	passport.use('local-signup', new localStrategy({

		usernameField: 'email',
		passwordField: 'password', 
		passReqToCallBack: true
	},
	// function (req, email, password, done) => {
	// 	User.findOne({'local:email': email}, function (error, user) =>{
	// 		if(error) {return done(error) ;}
	// 		if (user) {
	// 			return done(null, false, req.flash('signupMessage', 'The email is already taken.'));
	// 		} else {
	// 			let newUser = new User();
	// 			newUser.local.email = email;
	// 			newUser.local.password = password;
	// 		}
	// 	})
	// }
	function(req, username, password, done) {
                // find a user in Mongo with provided username
                User.findOne({ 'email' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('signupMessage','The email is already taken'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.name = req.param('name');
                        newUser.local.surname = req.param('surname');
                        newUser.local.nick = req.param('nick');


                        // save the user
                        newUser.save(function(err) {

                            if (err){
                                console.log('Error in saving user: '+err);  
                                throw err;  
                            }
                            console.log('User registration succesfull');    
                            return done(null, newUser);
                        });
                    }
                });
        }));


	// ============= Login ================
	passport.use('local-login', new localStrategy({

		usernameField: 'email',
		passwordField: 'password', 
		passReqToCallBack: true
	},
	function(req, username, password, done) {

           
                // find a user in Mongo with provided username
                User.findOne({ 'email' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in signup: '+err);
                        return done(err);
                    }
                    // already exists
                    if (!user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('loginMessage','No user found'));
                    } 

                    if (!user.validatePassword(password)) {
                    	return done(null, false, req.flash('loginMessage', 'Wrong password'));
                    }

                    return done(null, user);

         
        });
	})); 

};





