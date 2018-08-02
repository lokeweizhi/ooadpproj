var express = require("express");
var listingRouter = express.Router();

var auth = require('../controllers/auth');
var offers = require('../controllers/offers');

listingRouter.get("/listing", auth.isLoggedIn, auth.list);
listingRouter.get("/listingedit/:id", auth.isLoggedIn, auth.editRecord);
listingRouter.get("/listing/search/:name", auth.isLoggedIn, auth.searchThru);
listingRouter.post("/listingnew", auth.isLoggedIn, auth.insert);
listingRouter.post("/listingedit/:id", auth.isLoggedIn, auth.update);
listingRouter.delete("/listing/:id", auth.isLoggedIn, auth.delete);
listingRouter.get("/listing/:id", auth.isLoggedIn, auth.listRecord);
listingRouter.post("/listing/:id", auth.isLoggedIn, offers.create);
listingRouter.get("/createlisting", auth.isLoggedIn, auth.dispform);

module.exports = listingRouter;