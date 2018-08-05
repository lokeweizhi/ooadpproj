var express = require("express");
var profileRouter = express.Router();

var multer = require('multer');
var upload = multer({ dest:'./public/uploads/', limits: {fileSize: 1500000, files:1} });

// Import profile controller
var profileController = require('../controllers/profileController');

// Setup routes for profile
profileRouter.get("/profile",profileController.hasAuthorization, profileController.list)
profileRouter.post('/profile',profileController.hasAuthorization, upload.single('image'), profileController.uploadImage);
profileRouter.get("/profile/:username",profileController.hasAuthorization, profileController.browseProfiles);

// edit reviews in browse profile
profileRouter.get("/editReview/:id", profileController.hasAuthorization, profileController.editRecord); 
profileRouter.post("/editReview/:id", profileController.hasAuthorization,profileController.update);
profileRouter.delete("/profile/:username/:profile_id",profileController.hasAuthorization, profileController.delete);

profileRouter.post("/newReportRequest", profileController.hasAuthorization, profileController.create);

module.exports = profileRouter;
