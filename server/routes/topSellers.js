var express = require("express");
var topSellersRouter = express.Router();

var topSellersController = require('../controllers/topSellersController');

topSellersRouter.get("/topSellers", topSellersController.list);

module.exports = topSellersRouter;