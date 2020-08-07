'use strict'

const indexController = {};

indexController.renderIndex = (req, res) => {
    res.render('index');
};

indexController.renderAnnouncement = (req, res) => {
    res.render('listing');
};

module.exports = indexController;