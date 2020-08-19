'use strict'

const { Router } = require('express');
const router = Router();
const { renderAnnouncementForm,
    createAnnouncement,
    renderAllAnnouncements,
    renderAnnouncements,
renderTestAnouncements } = require('../controllers/announcement.controller');

const {isAuthenticated} = require('../helpers/auth');

// Create announcements and get announcements
router.get('/announcements/add', renderAnnouncementForm);

router.post('/announcements/new_announcement', isAuthenticated, createAnnouncement);

// Get all announcements 
router.get('/announcements',  renderAllAnnouncements);

// Get announcement for user
router.get('/announcementsUser', isAuthenticated, renderAnnouncements);

router.get('/announcementTest', renderTestAnouncements);

module.exports = router;