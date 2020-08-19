'use strict'

const indexController = {};
const Announcement = require('../models/announcement');

indexController.renderIndex = async (req, res) => {
    const announcements = await Announcement.find({state:true})
    .populate('user', 'name')
    .populate('category', 'name description ')
    .sort({createdAt: 'desc'}).lean()
    res.render('index', {announcements});
};

module.exports = indexController;