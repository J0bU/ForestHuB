const categoriesController = {};

const Category = require('../models/category');
const { update } = require('../models/category');
const { query } = require('express');

categoriesController.renderCategoryForm = (req, res) => {
    return res.render('categories/new_category');
};

categoriesController.createNewCategory = (req, res) => {

    errors = [];

    let {name, description } = req.body;

    if(!name || !description ) { 
        errors.push({text: 'All fields should be fill'});
    }
    
    if(errors.length > 0 ) {
        return res.render('announcements/new_announcement', 
        {errors, name, description});
    } else {

        // Creating new category
        let newCategoryDB = new Category({
            name: name, 
            description: description,
            user: req.user._id,
        });

        newCategoryDB.save( (error, newCategory) => {

            if(error) return req.flash('error_message', {error});

            // Send message using flash module (Middleware)
            req.flash('success_message', 'Category Added Successfully');
            // it's successfully
            return res.json({ok:true, caregory: newCategory});

        });

    }
};


module.exports = categoriesController;


