'use strict'

const passport = require('passport');
// Manera en como deseo registrarme, en este caso localmente.
const LocalStrategy = require('passport-local').Strategy;

// Se importa el modelo User creado.
const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    console.log(email, password, done);
    // March email's user exists
    let userDB = await User.findOne({ email: email });

    if (!userDB) {
        return done(null, false, { message: 'Not user found' });
    } else {
        // Match password's user 
        let match = await userDB.matchPassword(password);
        if (match) {
            return done(null, userDB);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
        done(error, user);
    });
});