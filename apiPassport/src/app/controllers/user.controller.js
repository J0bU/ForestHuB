usersController = {};

const passport = require('passport');

const User = require('../models/user');
const { query } = require('express');

usersController.renderSignUpForm = (req, res) => {

    return res.render('users/signup');

};

usersController.signup = async (req, res) => {

    const errors = [];
    
    let { name,
        email,
        cellphone,
        password,
        password_confirmation } =  req.body;
        
        email = email.toLowerCase();
        
    if (password != password_confirmation) {
        console.log('Entra password');
        errors.push({ text: 'Passwords do not match' });
    }
    if(!email || !name || !cellphone || !password || !password_confirmation){
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
                cellphone,
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
    
    let {_id, name, email, cellphone, password, image} = req.user;
    return res.render('users/profile', {_id,name, email, password, cellphone, image} );
};

usersController.renderUpdateUser = async (req, res) => {
    let {id} = req.params;
    const user = await User.findById(id).lean();
    res.render('users/update_user', {user});
};

usersController.updateUser =  (req, res) => {

    let {id} = req.params;
    let body = req.body;

    if(req.file === undefined){
        var updateUser = {
            name: body.name,
            cellphone: body.cellphone
        };
    }else {
        var updateUser = {
            name: body.name,
            cellphone: body.cellphone,
            image: "/img/uploads/" + req.file.filename
          };    
        
    }


     User.findByIdAndUpdate(id, updateUser, {new: true, context:query},
        (error, updatedUser) => {
          if (error) return req.flash("error_message", { error });
    
          if (!updatedUser) {
            return req.flash("error_message", "Do not exist this user");
          }
    
          req.flash("success_message", "User updated successfully");
          return res.redirect("/users/profile");
        });
};

module.exports = usersController;