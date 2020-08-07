usersController = {};

const passport = require('passport');

const User = require('../models/user');

usersController.renderSignUpForm = (req, res) => {

    return res.render('users/signup');

};

usersController.signup = async (req, res) => {

    const errors = [];
    
    let { name,
        email,
        password,
        password_confirmation } =  req.body;
        
        email = email.toLowerCase();
        
    if (password != password_confirmation) {
        console.log('Entra password');
        errors.push({ text: 'Passwords do not match' });
    }
    if(!email || !name || !password || !password_confirmation){
       errors.push({text: 'All fields should be fill'});
       console.log('Entra campos');
        //req.flash('error_message', {text: 'All Fields should be Fill'});
    }
    if (password.length < 4) {
        errors.push({ text: 'Passwords must be at least 4 characters' });
        console.log('Entra caracteres');
    }
    if (errors.length > 0) {
        console.log('Entra devolver valores');
        return res.render('users/signup', { errors, name, email });

    } else {

        let emailUser = await User.findOne({ email : email });
        if (emailUser) {
           // req.flash('error_message', {text: 'The email is already in use', name, email});
           req.flash('error_message', 'The email is already in use');
            res.redirect('/users/signup');
        } else {

            let newUser = new User({
                name,
                email,
                password
            });

            newUser.password =  await newUser.encryptPassword(password);

            let newUserDB = await newUser.save((error, newUserDB) => {
                
                if (error) {
                    return req.flash('error_message', { error });
                }

                req.flash('success_message', 'You are registered');
                return res.redirect('/users/signin');
            });


        }
    }

};

usersController.renderSigninForm = (req, res) => {
    return res.render('users/signin');
};

usersController.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin' ,
    successRedirect: '/',
    failureFlash: true
});

usersController.logout = (req, res) => {
    req.logout();
    req.flash('success_message', 'You are logged out now');
    res.redirect('/users/signin');
};

usersController.renderProfile = (req, res ) => { 
    
    let {_id, name, email, password} = req.user;
    return res.render('users/profile', {_id,name, email, password} );
};

module.exports = usersController;