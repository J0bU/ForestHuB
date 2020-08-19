'use strict'

// ------ Definition model Category ForestHuB ------

const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
   
}, {
    timestamps: true
});

// Name category unique
CategorySchema.plugin(uniqueValidator, {message: '{PATH} should be unique'});

module.exports = model('Category', CategorySchema);