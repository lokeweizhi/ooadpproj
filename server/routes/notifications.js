var express = require("express");
var notificationsRouter = express.Router();

var notifications = require('../controllers/notifications');

notificationsRouter.get("/notifications", notifications.hasAuthorization, notifications.show);

module.exports = notificationsRouter;
