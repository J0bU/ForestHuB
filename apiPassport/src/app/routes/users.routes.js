'use strict'

const { Router } = require('express');
const router = Router();

const  {
	renderSignUpForm,
	renderSigninForm,
	signup,
	signin,
	renderProfile,
	logout
} = require('../controllers/user.controller');

const {isAuthenticated} = require('../helpers/auth');

router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signup);
router.get('/users/signin' , renderSigninForm);
router.post('/users/signin' ,signin);
router.get('/users/profile', isAuthenticated, renderProfile);
router.get('/users/logout', logout);

module.exports = router;


// module.exports =  (app, passport) =>{

// 	// =================== home route ================
// 	app.get('/', (req, res) => {

// 		res.render('index.ejs')

// 	});

// 	// =================== login route ================
// 	app.get('/login', (req, res) => {

// 		 res.render('login', {
// 		 	message: req.flash('loginMessage')
// 		 });
// 	});

// 	// =================== signup route ================
// 	app.get('/signup', (req, res) => {

// 		res.render('signup', {
// 			message: req.flash('signupMessage')
// 		});
// 	});

// 	// =================== profile route ================
// 	app.get('/profile', (req, res) => {

// 		res.render('profile', {
// 			user: req.user
// 		});
// 	});


// 	// =================== login route POST ================
// 	app.post('/loginUser', passport.authenticate('local-login' , {
// 		successRedirect : '/profile', // redirect to the secure profile section
//         failureRedirect : '/', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages

// 		}));

// 	// =================== signup route POST ================

// 	app.post('/registerUser', passport.authenticate('local-signup', {
// 		successRedirect : '/profile', // redirect to the secure profile section
//         failureRedirect : '/', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
// 	}));
	

// 	app.get('/logout', isLoggedIn, (req, res) => {
// 		req.logout();
// 		res.redirect('/');
// 	});

// 	app.get('/anuncios', (req,res) => {
// 		res.render('listing');
// 	});	

// 	app.get('/home', (req,res) => {
// 		res.redirect('/');
// 	});	
// };

// function isLoggedIn(req, res, next) {
// 	if(req.isAuthenticated()) {
// 		return next();
// 	}

// 	return res.redirect('/');
// }