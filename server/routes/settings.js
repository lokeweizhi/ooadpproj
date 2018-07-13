var express = require("express");
var settingsRouter = express.Router();

// Import settings controller
var settingsController = require('../controllers/settingsController');

settingsRouter.get("/settings", settingsController.hasAuthorization, settingsController.list); 
settingsRouter.post("/settings", settingsController.hasAuthorization, settingsController.update);
settingsRouter.post("/newDeactivationRequest", settingsController.hasAuthorization, settingsController.create);

module.exports = settingsRouter;
