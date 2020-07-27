'use strict';

const express = require('express');
const app = express();


// ================= Libraries ==================

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const path = require('path');

const passport = require('passport'); 

const flash = require('connect-flash');   

const morgan = require('morgan'); 

const cookieParser = require('cookie-parser'); 

const session = require ('express-session');



//  =============== Settings ==================

require('./app/config/passport')(passport); // Passport configuration

require('./app/config/config'); //Global variables!

app.set('view engine', 'ejs'); // set motor engine, in this case 'ejs'.



//  =============== Middlewares ================

app.use(morgan('dev')); // Dev engine request

app.use(cookieParser()); // Use cookies in browser

app.use(session({
	secret: 'foresthub',
	resave: false,
	saveUninitialized: false
})); // Default configuration

app.use(passport.initialize());

app.use(passport.session());

app.use(flash()); 

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

app.use(bodyParser.json()); // parse application/json


// ================= Routes ===================

app.use(require('./app/routes/index')); //use app.use when root file exports app.

// ================= Static files ===============

app.use(express.static(path.resolve(__dirname, './app/public/'))); // Enable public folder

app.listen(process.env.PORT, () => {
    console.log("EscuchandoPuerto", process.env.PORT);
});


// =============== Db connection ===========

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (error, resp) => {
    if (error) throw error;
    else console.log("DB ONLINE");
});