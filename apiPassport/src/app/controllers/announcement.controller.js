const announcementController = {};

const Announcement = require('../models/announcement');
const Category = require('../models/category');
const { update } = require('../models/announcement');
const { query } = require('express');

// ------------- Render announcement form page ----------- 
announcementController.renderAnnouncementForm = async (req, res) => {
    const categories = await Category.find()
        .sort({ createdAt: 'desc' }).lean()
    return res.render('announcements/new_announcement', { categories });
};


// -------------- Send data from announcement form page to back ---------- 
announcementController.createAnnouncement = (req, res) => {

    const errors = [];

    let { title, description, price, latitude, longitude, category } = req.body;

    if (!title || !description || !latitude || !longitude || !price || !category) {
        errors.push({ text: 'All fields should be fill' });
    }

    if (errors.length > 0) {
        return res.render('announcements/new_announcement',
            { errors, title, description, price, latitude, longitude, category });
    } else {

        // Creating new announcement
        let newAnnouncementDB = new Announcement({
            title: title,
            description: description,
            price: price,
            latitude: latitude,
            longitude: longitude,
            user: req.user._id,
            category: category
        });

        newAnnouncementDB.save((error, newAnnouncement) => {

            if (error) return req.flash('error_message', { error });

            // Send message using flash module (Middleware)
            req.flash('success_message', 'Announcement Added Successfully');
            // it's successfully
            return res.redirect('/announcements');

        });
    }
};

// --------------------- Render all created announcements in a page -------------- 
announcementController.renderAllAnnouncements = async (req, res) => {
    const announcements = await Announcement.find({ state: true })
        .populate('user', 'name')
        .populate('category', 'name description ')
        .sort({ createdAt: 'desc' }).lean()
    res.render('announcements/all_announcements', { announcements });

};

// ------------------ Render user created announcements ----------- 
announcementController.renderAnnouncements = async (req, res) => {
    const announcements = await Announcement.find({ state: true, user: req.user._id })
        .populate('user', 'name')
        .populate('category', 'name description ')
        .sort({ createdAt: 'desc' }).lean()
    res.render('announcements/announcements_user', { announcements });
}

announcementController.renderTestAnouncements = (req, res) => {
    res.render('announcements/anuncio.hbs');
};

module.exports = announcementController;

