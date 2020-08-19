'use strict'

// ------ Definition model Announcement ForestHuB ------

const { Schema, model } = require('mongoose');

const AnnouncementSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    state: {
        type: Boolean,
        default: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Announcement', AnnouncementSchema);