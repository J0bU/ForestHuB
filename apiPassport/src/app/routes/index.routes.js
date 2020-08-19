'use strict'

const {Router} = require('express');
const router = Router();
const {renderAnnouncement, renderIndex} = require('../controllers/index.controllers');


router.get('/', renderIndex);


module.exports = router;