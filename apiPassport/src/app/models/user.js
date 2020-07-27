'use strict'

// =======================================
// User model using Mongoose
// ========================================

const mongoose = require('mongoose');

const bcrypt = require('bcrypt-nodejs');

const uniqueValidator = require('mongoose-unique-validator');

// define object that use mongoose

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

let userSchema = new Schema({


	local: {

		name: {
        type: String,
        required: [true, "Name is necessary"]
	    },
	    surname: {
	        type: String,
	        required: [true, 'Surname is necessary']
	    },
	    nick: {
	        type: String,
	        required: [true, "Nickname is necessary"],
	        unique: true
	    },
		email: {
			type: String,
        	required: [true, "Email is necessary"],
        	unique: true // Unique email in data base
		},
		password: {
			type: String,
       		required: [true, "Password is necessary"]
       	},
		role: {
	        type: String,
	        default: 'USER_ROLE',
	        enum: rolesValidos
    	},
	    image: {
	        type: String,
	        default: null,
	        required: false
	    }
	},

	facebook: {
		email: String,
		password: String,
		id: String,
		token: String
	},

	twitter: {
		email: String,
		password: String,
		id: String,
		token: String
	},

	google: {
		email: String,
		password: String,
		id: String,
		token: String
	},


});

userSchema.methods.generateHash = function (password) {

	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function (password) {
	console.log('test' ,this.local);
	return bcrypt.compareSync(password, this.local.password);
}

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


// ESPECIFICACIÓN AL ESQUEMA CREADO CON UNIQUEVALIDATOR
userSchema.plugin(uniqueValidator, {message: '{PATH} is unique'});


module.exports = mongoose.model('User', userSchema);
// RolesValidos ES UNA ENUMERACIÓN QUE NOS PERMITE DEFINIR LOS ÚNICOS POSIBLES VALORES QUE TIENE
// UN CAMPO EN UN ESQUEMA, EN NUESTRO CASO NECESITAMOS SÓLO DOS VALORES PARA EL ROL DEL USUARIO 
// QUE SON USER_ROLE Y ADMIN_ROLE
// let rolesValidos = {
//     values: ['ADMIN_ROLE', 'USER_ROLE'],
//     message: '{VALUE} no es un rol válido'
// }

//EL ESQUEMA CREADO CON USUARIOSCHEMA ES BÁSICAMENTE DEFINIR LOS CAMPOS QUE TENDRÁ NUESTRA TABLA
// USUARIOS, ES DECIR, NOMBRE, APELLIDO, EDAD, ETC...

// let usuarioSchema = new Schema({
//     nombre: {
//         type: String,
//         required: [true, "ES OBLIGATORIO EL NOMBRE"]
//     },
//     email: {
//         type: String,
//         required: [true, "ES OBLIGATORIO EL EMAIL"],
//         unique: true // ÚNICO CORREO ELECTRÓNICO EN LA BASE DE DATOS
//     },
//     password: {
//         type: String,
//         required: [true, "ES OBLIGATORIA LA CONTRASEÑA"]
//     },
//     img: {
//         type: String,
//         required: false
//     },
//     role: {
//         type: String,
//         default: "USER_ROLE",
//         enum: rolesValidos
//     },
//     estado: {
//         type: Boolean,
//         default: true
//     },
//     google: {
//         type: Boolean,
//         default: false
//     }

// });

// // QUITAR UN CAMPO DE LA RESPUESTA A LA PETICIÓN, EN ESTE CASO LA CONTRASEÑA
// // EN LA BD SÍ SE CREA LA CONTRASEÑA PORQUE Y LOS DEMÁS VALORES, YA QUE ESTOS SE GUARDAN
// // ANTES DE QUE SE HAGA LA RESPUESTA, LA PASSWORD SÓLO SE ELIMINA EN LA RESPUESTA A LA PETICIÓN.
// usuarioSchema.methods.toJSON = function() {
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;

//     return userObject;
// }

// // ESPECIFICACIÓN AL ESQUEMA CREADO CON UNIQUEVALIDATOR
// usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});
// //EXPORTAMOS EL MODELO PARA SER USADO POR MONGODB

// //EN ESTE CASO EL MODELO ES LLAMADO Usuario, QUE TOMARÁ LAS CARACTERÍSTICAS DE USUARIOSCHEMA
// module.exports = mongoose.model('Usuario', usuarioSchema);