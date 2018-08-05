var express = require("express");
var offersRouter = express.Router();

var offers = require('../controllers/offers');

offersRouter.get("/offers", offers.hasAuthorization, offers.list);
offersRouter.delete("/offers/:offers_id", offers.hasAuthorization, offers.delete);

module.exports = offersRouter;
