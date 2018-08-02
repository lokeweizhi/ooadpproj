var express = require("express");
var offersRouter = express.Router();

var offers = require('../controllers/offers');

offersRouter.get("/offers", offers.hasAuthorization, offers.list);

module.exports = offersRouter;
