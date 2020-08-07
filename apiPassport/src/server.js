'use strict';

// ================= Initializations ==================

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const MethodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//  ----------------------------------------
const app = express();
require('./app/config/passport'); // Passport configuration
require('./app/config/config'); //Global variables!


//  =============== Settings ==================
// app.set('view engine', 'ejs'); // set motor engine, in this case 'ejs'.
app.set('port', process.env.PORT || 4000);
app.set('views', path.resolve(__dirname, './app/views/'));
app.engine('.hbs', exphbs({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), './layouts/' ),
    partialsDir: path.join(app.get('views'), './partials/'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



//  =============== Middlewares ================

app.use(morgan('dev')); // Dev engine request
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(MethodOverride('_method'));
app.use(session({
    secret: 'foresthub',
	resave: false,
	saveUninitialized: false
})); // Default configuration
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

// app.use(cookieParser()); // Use cookies in browser (don't use)

// ================= Gobal variables ===================
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
// ================= Routes ===================

app.use(require('./app/routes/index.routes')); //use app.use when root file exports app.
app.use(require('./app/routes/users.routes')); //use app.use when root file exports app.

// ================= Static files ===============

app.use(express.static(path.resolve(__dirname, './app/public/'))); // Enable public folder


module.exports = app;
