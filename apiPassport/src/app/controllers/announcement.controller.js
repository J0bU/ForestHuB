const announcementController = {};

const Announcement = require("../models/announcement");
const Category = require("../models/category");
const path = require("path");
const { unlink } = require("fs-extra");
const { update } = require("../models/announcement");
const { query } = require("express");

// ------------- Render announcement form page -----------
announcementController.renderAnnouncementForm = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: "desc" }).lean();
  return res.render("announcements/new_announcement", { categories });
};

// -------------- Send data from announcement form page to back ----------
announcementController.createAnnouncement = (req, res) => {
  const errors = [];

  let { title, description, price, latitude, longitude, category } = req.body;

  if (
    !title ||
    !description ||
    !latitude ||
    !longitude ||
    !price ||
    !category
  ) {
    errors.push({ text: "All fields should be fill" });
  }

  if (errors.length > 0) {
    return res.render("announcements/new_announcement", {
      errors,
      title,
      description,
      price,
      latitude,
      longitude,
      category,
    });
  } else {
    // Creating new announcement
    let newAnnouncementDB = new Announcement({
      title: title,
      description: description,
      price: price,
      image: "/img/uploads/" + req.file.filename,
      latitude: latitude,
      longitude: longitude,
      user: req.user._id,
      category: category,
    });

    newAnnouncementDB.save((error, newAnnouncement) => {
      if (error) return req.flash("error_message", { error });

      // Send message using flash module (Middleware)
      req.flash("success_message", "Announcement added successfully");
      // it's successfully
      return res.redirect("/announcements");
    });
  }
};

// --------------------- Render all created announcements in a page --------------
announcementController.renderAllAnnouncements = async (req, res) => {
  const announcements = await Announcement.find({ state: true })
    .populate("user", "name")
    .populate("category", "name description ")
    .sort({ createdAt: "desc" })
    .lean();
  res.render("announcements/all_announcements", { announcements });
};

// ------------------ Render user created announcements -----------
announcementController.renderAnnouncements = async (req, res) => {
  const announcements = await Announcement.find({
    state: true,
    user: req.user._id,
  })
    .populate("user", "name")
    .populate("category", "name description ")
    .sort({ createdAt: "desc" })
    .lean();
  res.render("announcements/announcements_user", { announcements });
};

// ------------------ Delete a announcement by id -----------

announcementController.deleteAnnouncement =  (req, res) => {
  let { id } = req.params;

   Announcement.findByIdAndDelete(id, async (error, deletedAnnouncement) => {

    if(error) return req.flash('error_message', {error});

    if(!deletedAnnouncement){
        return req.flash('error_message', 'do not exist this note');
    }

    req.flash('success_message', 'Announcement deleted duccessfully');

    await unlink(path.resolve("./src/app/public" + deletedAnnouncement.image));
    res.redirect("/announcementsUser");

  });
  
};

// ------------------ Form edit announcement -----------
announcementController.renderUpdateAnnouncement = async (req, res) => {
  let { id } = req.params;
  let updateAnnouncement = await Announcement.findById(
    id,
    (error, foundAnnouncement) => {
      if (error) return req.flash("error_message", { error });

      if (!foundAnnouncement) {
        return req.flash("error_message", "do not exist this announcement");
      }

      return foundAnnouncement;
    }
  ).lean();

  if (updateAnnouncement.user._id != req.user.id) {
    req.flash("error_message", "Not authorized");
    return res.redirect("/announcements");
  }

  return res.render("announcements/update_announcement", {
    updateAnnouncement,
  });
};

// ------------------ Edit a announcement by id -----------
announcementController.updateAnnouncement = (req, res) => {
  let { id } = req.params;
  let body = req.body;

  let editAnnouncement = {
    title: body.title,
    description: body.description,
    category: body.category,
    price: body.price,
    latitude: body.latitude,
    longitue: body.longitude,
  };

  Announcement.findByIdAndUpdate(
    id,
    editAnnouncement,
    { new: true, context: query },
    (error, updateAnnouncement) => {
      if (error) return req.flash("error_message", { error });

      if (!updateAnnouncement) {
        return req.flash("error_message", "Do not exist this announcement");
      }

      req.flash("success_message", "Announcement updated successfully");
      return res.redirect("/announcements");
    }
  );
};


// ------------------ View a announcement -----------
announcementController.viewAnnouncement = async (req, res) => {

    const { id } = req.params;
    const announcement = await Announcement.findById(id)
    .populate("user", "name cellphone email image")
    .populate("category", "name description")
    .sort({ createdAt: "desc" }).lean();
    console.log(announcement);
    res.render('announcements/listing_details', {announcement});
};

module.exports = announcementController;
