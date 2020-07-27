'use strict'

const express = require('express');

const app = express();

const passport = require('passport'); 

const path = require('path');

app.set('views', path.resolve(__dirname, '../views/')); // route views

app.use(passport.initialize());

app.use(passport.session());

require('./user')(app, passport);

module.exports = app;