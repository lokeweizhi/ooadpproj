var express = require("express");
var profileRouter = express.Router();

var multer = require('multer');
var upload = multer({ dest:'./public/uploads/', limits: {fileSize: 1500000, files:1} });

// Import profile controller
var profileController = require('../controllers/profileController');

// Setup routes for profile
profileRouter.get("/profile",profileController.hasAuthorization, profileController.list)
profileRouter.post('/profile',profileController.hasAuthorization, upload.single('image'), profileController.uploadImage);
profileRouter.get("/profile/:username", profileController.browseProfiles);
profileRouter.delete("/profile/:profile_id",profileController.hasAuthorization, profileController.delete);

module.exports = profileRouter;
