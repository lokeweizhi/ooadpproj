var express = require("express");
var activityRouter = express.Router();

// Import reviews controller
var reviewsController = require('../controllers/reviewsController');

// Setup routes for activity(reviews)
activityRouter.get('/activity', reviewsController.show);
activityRouter.post('/new', reviewsController.hasAuthorization, reviewsController.create);

module.exports = activityRouter;