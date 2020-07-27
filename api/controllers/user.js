'use strict'

/*
  ############ SISTEMA USUARIOS ############
  Controlador encargado de manejar la lógica de usuarios,
*/

//Se declaran las constantes express y app para poder ser usadas en la creación de la ruta.
const express = require('express');
const app = express();
//Librería para cifrar la password
const bcrypt = require('bcrypt');

//Librería que ayudará a decidir los campos a actualizar.
const underscore = require('underscore');

//Librería encargadad de realizar la paginación de mongoose.
const mongoosePagination = require('mongoose-pagination');

//Librería que nos permite trabajar con ficheros.
const fs = require('fs');

//Librería que nos permitirá trabajar con rutas de ficheros.
const path = require('path');

//Libería encargada de realizar el sign del token.
const jwt = require('../services/jwt');

//Se importa el modelo User creado.
const User = require('../models/user');


//---------- Método encargado de mostrar página de inicio ------

function inicioPage(req, res){
  return res.render('index');
}

function loginPage(req, res){
  return res.render('login', {
    message: req.flash('loginMessage')
  });
}

function signupPage(req, res){
  return res.render('signup', {
    message: req.flash('signupMessage')
  });
}


// --------- Método encargado de registrar un nuevo usuario --------
function registerUser(req, res) {

  //Parámetros que viene desde la petición
  let body = req.body;
  const errores = [];

  console.log(body);
  //Validación de parámetros
  if (!(body.name && body.surname && body.nick && body.email &&
          body.password)) {
    // Flash permite envíar mensajes al front.
    //errores.push({texto: 'Todos los campos son necesarios'});

    // return res.status(412).json({
    //     ok: false,
    //     statusCode: 412,
    //     message: "Todos los campos deben ser necesarios"
    // });

    return res.render('signup', {
      ok:false,
      statusCode: 412,
      message: "Todos los campos son necesarios"
    });
  }


  //Instancia modelo User: creación nuevo usuario.
  let user = new User({
    name: body.name,
    surname: body.surname,
    nick: body.nick,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  // Guardar nuevo usuario en la base de datos.
  user.save((error, usuarioDB) => {

    if (error) 
      return res.render('signup', {
        ok: false,
        statusCode: 500,
        error: error 
      })
      //return res.status(500).json({ok: false,statusCode: 500,error: error });
    

    if (usuarioDB) {
      
        return res.render('signup', {
          ok: true,
          statusCode: 200,
          user: usuarioDB
        });
        // return res.status(200).json({
        //   ok: true,
        //   statusCode: 200,
        //   user: usuarioDB
        // });

       
    } else {
      //errores.push({texto: 'No se logró crear el usuario'});

      return res.render('signup', {
        ok: false,
          statusCode: 404,
          message: 'No se logró crear el usuario'
      });
        // return res.status(404).json({
        //   ok: false,
        //   statusCode: 404,
        //   message: 'No se logró crear el usuario'
        // });
      }

  });

};

//------------Método encargado del login------------
function loginUser(req, res) {

  //Se obtienen las credenciales
  let body = req.body;
  console.log(body.email);
  //Validación de parámetros
  if (!(body.email && body.password )) {

    return res.status(412).json({
        ok: false,
        statusCode: 412,
        message: "Todos los campos deben ser necesarios"
    });
  }

  //Se busca en el modelo por email ya que debe ser único.
  User.findOne({ email: body.email }, (error, user) => {

    if (error) {
        return res.status(500).json({
            ok: false,
            statusCode: 500,
            error: error
        });
    }

    //No existe el correo especificado.
    if (!user) {
        return res.status(404).json({
            ok: false,
            statusCode: 404,
            message: "(Usuario) o contraseña incorrectos"
        });
    }

    //No coinciden la password ingresada respecto al usuario encontrado.
    if (!bcrypt.compareSync(body.password, user.password)) {
        return res.status(400).json({
            ok: false,
            statusCode: 400,
            message: "Usuario o (contraseña) incorrectos"
        });
    }

    //Usando tokens para la autenticación: se pasan todos los filtros anteriores.
    return res.json({
        ok: true,
        user: user,
        token: jwt.createToken(user) //Función encargada de disparar el middleware.
    });

    });
};

//---------Método encargado de conseguir los datos de un usuario--------
function getUser(req, res) {

  let id = req.params.id;
  User.findById(id, (error, user) => {

    if (error) {
        return res.status(500).json({
            ok: false,
            statusCode: 500,
            error: error
        });
    }

    //No existe el correo especificado.
    if (!user) {
        return res.status(404).json({
            ok: false,
            statusCode: 404,
            message: "No existe un usuario con el id especificado"
        });
    }

    return res.json({
    	ok:true,
    	statusCode:200,
    	usuario: user
    });
  }); 
};



module.exports = {
  loginPage,
  inicioPage,
  signupPage,
	registerUser,
	loginUser,
	getUser
}