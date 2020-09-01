'use strict'

const { Router } = require('express');
const router = Router();
const { renderAnnouncementForm,
    createAnnouncement,
    renderAllAnnouncements,
    renderAnnouncements, 
    deleteAnnouncement,
    renderUpdateAnnouncement,
updateAnnouncement, 
viewAnnouncement } = require('../controllers/announcement.controller');

const {isAuthenticated} = require('../helpers/auth');

// Create announcements and get announcements
router.get('/announcements/add', isAuthenticated, renderAnnouncementForm);

router.post('/announcements/new_announcement', isAuthenticated, createAnnouncement);

// Get all announcements 
router.get('/announcements',  renderAllAnnouncements);

// Get announcement for user
router.get('/announcementsUser', isAuthenticated, renderAnnouncements);

// Delete announcement by id
router.get('/announcements/delete/:id', isAuthenticated, deleteAnnouncement);

// Edit or update announcement by id
router.get('/announcements/updateAnnouncement/:id', isAuthenticated, renderUpdateAnnouncement );

// Edit announcement by id
router.put('/announcements/updateAnnouncement/:id', isAuthenticated, updateAnnouncement );

// View announcement
router.get('/announcements/view/:id', viewAnnouncement);


module.exports = router;