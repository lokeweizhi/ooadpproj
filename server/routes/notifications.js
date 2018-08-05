var express = require("express");
var notificationsRouter = express.Router();

var notifications = require('../controllers/notifications');

notificationsRouter.get("/notifications", notifications.hasAuthorization, notifications.list);
notificationsRouter.delete("/notifications/:notification_id", notifications.hasAuthorization, notifications.delete);

module.exports = notificationsRouter;
