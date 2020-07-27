'use strict'

module.exports =  (app, passport) =>{

	// =================== home route ================
	app.get('/', (req, res) => {

		res.render('index.ejs')

	});

	// =================== login route ================
	app.get('/login', (req, res) => {

		 res.render('login', {
		 	message: req.flash('loginMessage')
		 });
	});

	// =================== signup route ================
	app.get('/signup', (req, res) => {

		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	// =================== profile route ================
	app.get('/profile', (req, res) => {

		res.render('profile', {
			user: req.user
		});
	});


	// =================== login route POST ================
	app.post('/loginUser', passport.authenticate('local-login' , {
		successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages

		}));

	// =================== signup route POST ================

	app.post('/registerUser', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
	}));
	

	app.get('/logout', isLoggedIn, (req, res) => {
		req.logout();
		res.redirect('');
	});
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}

	return res.redirect('/');
}