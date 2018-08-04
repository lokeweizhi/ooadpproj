var express = require("express");
var listingRouter = express.Router();

var multer = require('multer');
var upload = multer({ dest:'./public/uploads/', limits: {fileSize: 1500000, files:1} });

var auth = require('../controllers/auth');
var offers = require('../controllers/offers');

listingRouter.get("/listing", auth.isLoggedIn, auth.list);
listingRouter.get("/listingedit/:id", auth.isLoggedIn, auth.editRecord);
listingRouter.get("/listing/search/:name:price", auth.isLoggedIn, auth.searchThru);
listingRouter.post("/listingnew", auth.isLoggedIn, upload.single("itemImage"), auth.insert);
listingRouter.post("/listingedit/:id", auth.isLoggedIn, auth.update);
listingRouter.delete("/listing/:id", auth.isLoggedIn, auth.delete);
listingRouter.get("/listing/:id", auth.isLoggedIn, auth.listRecord);
listingRouter.post("/listing/:id", auth.isLoggedIn, offers.create);
listingRouter.get("/createlisting", auth.isLoggedIn, auth.dispform);

module.exports = listingRouter;