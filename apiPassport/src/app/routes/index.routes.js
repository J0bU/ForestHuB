'use strict'

const {Router} = require('express');
const router = Router();
const {renderAnnouncement, renderIndex} = require('../controllers/index.controllers');


router.get('/', renderIndex);

router.get('/anuncios',  renderAnnouncement);


module.exports = router;