'use strict'

const {Router} = require('express');
const router = Router();
const {
    renderCategoryForm,
    createNewCategory
} = require('../controllers/category.controller');

// Create categories and get categories
router.get('/categories/add', renderCategoryForm);

router.post('/categories/new_category', createNewCategory);

module.exports = router;