var express = require("express");
var listingRouter = express.Router();

var auth = require('../controllers/auth');

listingRouter.get("/listing", auth.isLoggedIn, auth.list);
listingRouter.get("/listingedit/:id", auth.isLoggedIn, auth.editRecord);
listingRouter.post("/listingnew", auth.isLoggedIn, auth.insert);
listingRouter.post("/listingedit/:id", auth.isLoggedIn, auth.update);
listingRouter.delete("/listing/:id", auth.isLoggedIn, auth.delete);
listingRouter.get("/listing/:id", auth.isLoggedIn, auth.listRecord);
listingRouter.get("/createlisting", auth.isLoggedIn, auth.dispform);

module.exports = listingRouter;