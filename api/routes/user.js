'use strict'

const express = require('express');
const {
    registerUser,
    loginUser,
    getUser
} = require('../controllers/user'); //Se traen las funciones creadas en usuarios.


// Constante encargada de la autenticación, es decir, sin autenticación no podrá realizar cambios.
const { ensureAuth } = require('../middlewares/authenticated');

let api = express.Router();

api.post('/registerUser', registerUser); //Se creará un servicio en /registerUser
api.post('/loginUser', loginUser);
api.get('/getUser/:id', ensureAuth, getUser);
// api.get('/getUsers/:page?', ensureAuth, getUsers); //Caracter ?: argumento opcional.
// api.get('/getCounters/:id?', ensureAuth, getCounters);
// api.put('/updateUser/:id', ensureAuth, updateUser);
// api.post('/uploadImage/:id', [ensureAuth, ensureUpload], uploadImage);
// api.get('/getImageUser/:imageFile', ensureAuth, getImageFile);

module.exports = api;