var express = require("express");
var offersRouter = express.Router();

var offers = require('../controllers/offers');

offersRouter.get("/", offers.show);

module.exports = offersRouter;
