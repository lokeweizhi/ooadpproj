var express = require("express");
var listingRouter = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
            cb(null, 'public/uploads/itemImage')
    },
    filename: (req, file, cb) => {
      cb(null,  Date.now() + '-' + file.originalname)

    }
});
var upload = multer({storage: storage});
var auth = require('../controllers/auth');
var profile = require('../controllers/auth')
var offers = require('../controllers/offers');

listingRouter.get("/listing", auth.isLoggedIn, auth.list);
listingRouter.get("/listingedit/:id", auth.isLoggedIn, auth.editRecord);
listingRouter.get("/listing/search/:name", auth.isLoggedIn, auth.searchThru);
listingRouter.post("/listingnew", auth.isLoggedIn, upload.single("itemImage"), auth.insert);
listingRouter.post("/listingedit/:id", auth.isLoggedIn, auth.update);
listingRouter.delete("/listing/:id", auth.isLoggedIn, profile.delete);
listingRouter.get("/listing/:id", auth.isLoggedIn, auth.listRecord);
listingRouter.post("/listing/:id", auth.isLoggedIn, offers.create);
listingRouter.get("/createlisting", auth.isLoggedIn, auth.dispform);
listingRouter.get("/listingAdmin", auth.isLoggedIn, auth.listAdmin);
listingRouter.get("/listingAdminedit/:id", auth.isLoggedIn, auth.editRecord);
listingRouter.post("/listingAdminedit/:id", auth.isLoggedIn, auth.update)

//category routing
listingRouter.get("/listing/:category", auth.isLoggedIn, auth.searchCategory);

module.exports = listingRouter;