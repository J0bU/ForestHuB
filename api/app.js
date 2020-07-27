'use strict'

/*
	Fichero encargado de llevar toda la configuración de Express,
	es decir, la configuración del servidor y demás parámetros.
*/

//Import config.
require('./config/config');

//Delaración constante express que permitirá trabajar con el servidor local.
const express = require('express');

//Declaración constante body-parser que permitirá trabajar con archivos.json y parsearlos para JS.
const bodyParser = require('body-parser');

// Permitirá utilizar las rutas en el proyecto
const path = require('path');

// Manera en cómo se autenticará
const passport = require('passport');

const flash = require('connect-flash');

const morgan = require('morgan');

const cookieParser = require('cookie-parser');

const session = require('express-session'); 

//Declaración de la constante app que invocará a express.
const app = express();

//Sección para configuraciones
app.set('views', path.resolve(__dirname, '../views/'));
app.set('view engine', 'ejs');

//Sección para cargar middlewares.
//Middleware: método que se ejecuta antes de que llegue a un controlador en cada petición.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //Información lo convertirá en un tipo JSON.
app.use(morgan('dev'));
app.use(cookieParser()); //Se convierten las cookies y se interpretan.
app.use(session({
	secret: 'palabrasecreta',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());    
app.use(flash());



//Sección para cors.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


//Sección para cargar rutas desde index.js que contendrá las demás rutas.
let userRouter = require('./routes/index.js');
app.use('/api', userRouter); //'api/home'
//Por último se trae la creación del Router y finalizará con dos servicios en las rutas
// localhost:ttt/api/home
// localhost:ttt/api/prueba

//Sección para archivos estáticos.
app.use(express.static(path.join(__dirname, '../public/')));


module.exports = app;